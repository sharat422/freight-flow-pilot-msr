
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import messagesRouter from './routes/messages.js';

// Configure environment variables
dotenv.config();

// ES module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const originalUse = app.use.bind(app);
app.use = (...args) => {
  if (typeof args[0] === 'string') {
    console.log('🔍 app.use path:', args[0]);
  }
  return originalUse(...args);
};

const PORT = process.env.PORT || 5000;

// Create a write stream for logging (in append mode)
const accessLogStream = createWriteStream(
  path.join(__dirname, 'access.log'), 
  { flags: 'a' }
);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}));

app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', { 
  stream: process.env.NODE_ENV === 'production' ? accessLogStream : process.stdout 
}));
app.use('/api/messages', messagesRouter);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 50 : 100, // More restrictive in production
  message: { error: 'Too many requests from this IP, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Stricter rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 submissions per hour
  message: { error: 'Too many contact form submissions, please try again later' }
});

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.CLIENT_URL,
      'http://localhost:3000',
      'http://localhost:8080'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// MongoDB Connection
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI environment variable is required');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority'
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME || "messageDB");
    console.log("Connected to MongoDB");

    await db.command({ ping: 1 });
    console.log("Database ping successful");
    
    const collections = await db.listCollections().toArray();
    console.log("Existing collections:", collections.map(c => c.name));

    if (!collections.some(c => c.name === 'messages')) {
      console.log("Creating messages collection");
      await db.createCollection('messages');
    }
    
    await db.collection('messages').createIndex({ email: 1 });
    await db.collection('messages').createIndex({ createdAt: 1 });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

// Create the email transporter with better error handling
let transporter;
try {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 5
  });

  // Verify transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error('Email transporter verification failed:', error);
    } else {
      console.log('Email transporter ready');
    }
  });
} catch (error) {
  console.error('Failed to create email transporter:', error);
}

// Input validation middleware
const validateMessageInput = (req, res, next) => {
  const { firstname, lastname, email, message } = req.body;
  
  if (!firstname || !lastname || !email || !message) {
    return res.status(400).json({ 
      error: "Missing required fields",
      details: {
        firstname: !firstname ? "First name is required" : undefined,
        lastname: !lastname ? "Last name is required" : undefined,
        email: !email ? "Email is required" : undefined,
        message: !message ? "Message is required" : undefined
      }
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: "Invalid email format" 
    });
  }

  // Sanitize inputs
  req.body.firstname = firstname.trim().substring(0, 50);
  req.body.lastname = lastname.trim().substring(0, 50);
  req.body.email = email.trim().toLowerCase().substring(0, 100);
  req.body.message = message.trim().substring(0, 1000);
  if (req.body.phone) req.body.phone = req.body.phone.trim().substring(0, 20);
  if (req.body.company) req.body.company = req.body.company.trim().substring(0, 100);

  next();
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: db ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Message Route
app.post('/api/messages', contactLimiter, validateMessageInput, async (req, res) => {
  if (!db) {
    console.error("Database connection not established");
    return res.status(503).json({ 
      error: "Service temporarily unavailable",
      message: "Database connection not established"
    });
  }

  try {
    const { firstname, lastname, email, phone, company, message } = req.body;

    // Insert message with additional metadata
    const result = await db.collection('messages').insertOne({
      firstname,
      lastname,
      email,
      phone: phone || null,
      company: company || null,
      message,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Send confirmation email if transporter is available
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `MSR Freight Dispatchers <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Thanks for contacting MSR Freight Dispatchers!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1e40af;">Thank you, ${firstname}!</h2>
              <p>We've received your message:</p>
              <blockquote style="background:#f8fafc;padding:1em;border-left:4px solid #3b82f6;margin:1em 0;">${message}</blockquote>
              <p>Our dispatch team will get back to you within 24 hours.</p>
              <br>
              <p>Best regards,<br><strong>MSR Freight Dispatchers Team</strong></p>
              <hr style="margin: 2em 0; border: none; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 12px; color: #6b7280;">
                MSR Freight Dispatchers<br>
                Phone: +1 (307) 407-5003<br>
                Email: info@msrfreight.com
              </p>
            </div>
          `
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Don't fail the request just because email failed
      }
    }

    res.status(201).json({ 
      success: true,
      message: "Message saved successfully",
      id: result.insertedId
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ 
      error: "Failed to save message",
      message: "An internal server error occurred"
    });
  }
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.originalUrl
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  // Don't leak error details in production
  const errorMessage = process.env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred' 
    : err.message;
    
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: errorMessage,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Start server
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  // Handle server errors
  server.on('error', (error) => {
    console.error('Server error:', error);
  });

  // Graceful shutdown
  const gracefulShutdown = (signal) => {
    console.log(`${signal} received. Shutting down gracefully...`);
    server.close(async () => {
      try {
        await client.close();
        console.log('MongoDB connection closed.');
        process.exit(0);
      } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
      }
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
