import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Import routes
import authRoutes from './routes/auth.js';
import modelRoutes from './routes/models.js';
import dataRoutes from './routes/data.js';
import uploadRoutes from './routes/upload.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/upload', uploadRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
