import { Router } from 'express';
import Message from '../models/message.js';


const router = Router();
// Create a new message
router.post('/', async (req, res) => {
  try {
    const { firstname, lastname, email, phone, company, message } = req.body;
    
    const newMessage = new Message({
      firstname,
      lastname,
      email,
      phone,
      company,
      message
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

export default router; 