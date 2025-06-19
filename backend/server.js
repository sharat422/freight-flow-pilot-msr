import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);
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

// Message Route
app.post('/api/messages', async (req, res) => {
  if (!db) {
    console.error("Database connection not established");
    return res.status(503).json({ error: "Database not connected" });
  }
try {
    console.log("Received message data:", req.body);
  try {
    // Validation
    if (!req.body.firstname || !req.body.email || !req.body.message) {
       console.log("Validation failed - missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await db.collection('messages').insertOne({
      ...req.body,
      createdAt: new Date()
    });

    console.log("Insert result:", {
      insertedId: result.insertedId,
      acknowledged: result.acknowledged
    });

    res.status(201).json({ 
      success: true,
      message: "Message saved successfully",
      id: result.insertedId
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ 
      error: "Failed to save message",
      details: error.message
    });
  }
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

// Cleanup
process.on('SIGINT', async () => {
  await client.close();
  console.log("MongoDB connection closed");
  process.exit();
});