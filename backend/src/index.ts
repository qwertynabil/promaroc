import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const app = express();

// Initialize Prisma 7 to talk to PostgreSQL using the Driver Adapter
const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter }); 

const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors()); // Allows your Vercel frontend to bypass security and connect
app.use(express.json()); // Allows the API to understand JSON data

// 1. Health Check Route (To test if the server is online)
app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'online', message: 'Promaroc API is running!' });
});

// 2. Contact Form Route (Receives data from Vercel and saves it)
app.post('/api/contact', async (req: Request, res: Response) => {
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
app.get('/api/portfolio', async (req: Request, res: Response) => {
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