import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
// Initialize Prisma to talk to PostgreSQL
const prisma = new PrismaClient(); 
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows your Vercel frontend to bypass security and connect
app.use(express.json()); // Allows the API to understand JSON data

// 1. Health Check Route (To test if the server is online)
app.get('/', (req, res) => {
  res.json({ status: 'online', message: 'Promaroc API is running!' });
});

// 2. Contact Form Route (Receives data from Vercel and saves it)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Save to PostgreSQL using Prisma
    const newMessage = await prisma.contactMessage.create({
      data: { 
        name, 
        email, 
        phone: phone || null, 
        message 
      },
    });
    
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, error: 'Failed to save message' });
  }
});

// 3. Portfolio Route (Fetches projects to display on the Vercel frontend)
app.get('/api/portfolio', async (req, res) => {
  try {
    // Get all projects, newest first
    const projects = await prisma.portfolioProject.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`[server]: Promaroc API is running on port ${PORT}`);
});