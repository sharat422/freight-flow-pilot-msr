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

// Configure environment variables
dotenv.config();

// ES module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a write stream for logging (in append mode)
const accessLogStream = createWriteStream(
  path.join(__dirname, 'access.log'), 
  { flags: 'a' }
);

// Security middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  maxPoolSize: 50,
  retryWrites: true,
  w: 'majority'
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME || "messageDB");
    console.log("Connected to MongoDB");

    // Verify connection
    await db.command({ ping: 1 });
    console.log("Database ping successful");
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log("Existing collections:", collections.map(c => c.name));

    // Create collection if not exists
    if (!collections.some(c => c.name === 'messages')) {
      console.log("Creating messages collection");
      await db.createCollection('messages');
    }
    
    // Create indexes
    await db.collection('messages').createIndex({ email: 1 });
    await db.collection('messages').createIndex({ createdAt: 1 });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
// Create the email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
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

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ 
      error: "Invalid email format" 
    });
  }

  next();
};

// Message Route
app.post('/api/messages', validateMessageInput, async (req, res) => {
  if (!db) {
    console.error("Database connection not established");
    return res.status(503).json({ 
      error: "Service temporarily unavailable",
      message: "Database connection not established"});
  }

  try {
    // Validation
    const { firstname, lastname, email, phone, company, message } = req.body;
    if (!req.body.firstname || !req.body.email || !req.body.message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert message with additional metadata
    const result = await db.collection('messages').insertOne({
      firstname,
      lastname,
      email,
      phone: phone || null,
      company: company || null,
      message,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // ✉️ Send confirmation email to the customer
    try {
    await transporter.sendMail({
      from: `MSR Freight Dispatchers <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thanks for contacting MSR Freight Dispatchers!',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Thank you, ${firstname}!</h2>
          <p>We've received your message:</p>
          <blockquote style="background:#f4f4f4;padding:1em;border-left:4px solid #2563eb;">${message}</blockquote>
          <p>Our dispatch team will get back to you shortly.</p>
          <br>
          <p>Best regards,<br>MSR Freight Dispatchers Team</p>
        </div>
      `
    });
  }catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Don't fail the request just because email failed
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: db ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
});


// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  // Handle server errors
  server.on('error', (error) => {
    console.error('Server error:', error);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(async () => {
      await client.close();
      console.log('Server closed. MongoDB connection closed.');
      process.exit(0);
    });
  });
});

// Cleanup
process.on('SIGINT', async () => {
  await client.close();
  console.log("MongoDB connection closed");
  process.exit();
});