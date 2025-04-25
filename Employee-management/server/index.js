// index.js or server.js
import path from 'path';

import express from 'express';
import authRoutes from './routes/auth.js'; // Adjust path if needed
import dotenv from 'dotenv';
import cors from 'cors';
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'

import connectToDatabase from './db/db.js';



dotenv.config();

const app = express();



// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());



connectToDatabase(); 
app.use('/api/auth', authRoutes);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
