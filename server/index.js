import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import userRoutes from './routes/users.js';
import applicationRoutes from './routes/applications.js';
import analyticsRoutes from './routes/analytics.js';
import textGeneratorRoutes from './routes/textGenerator.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/text-generator', textGeneratorRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Job Portal API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});