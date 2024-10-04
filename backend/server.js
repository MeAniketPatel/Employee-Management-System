// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const employeeRoutes = require('./routes/employee')
const userRoutes = require('./routes/auth')

// Initialize environment variables
dotenv.config();

// Initialize app and connect to DB
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use('/uploads', express.static('uploads')); // Serve uploaded images
app.use('/api', employeeRoutes); // Employee routes

// Routes
app.use('/api', userRoutes);

// Use error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
