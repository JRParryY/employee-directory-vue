/**
 * Simple server for Employee Directory API
 */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import employee routes
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 5202;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/employees', employeeRoutes);
app.get('/api', (req, res) => {
  res.json({ message: 'API is running!' });
});

// Static file serving - crucial for SPA
app.use(express.static(path.join(__dirname, 'public')));

const mongoURI = 'mongodb+srv://jparr4:jparr4@cluster1.lqo9sxo.mongodb.net/employee_directory?retryWrites=true&w=majority&appName=Cluster1';

console.log('🔌 Connecting to MongoDB...');

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    console.log('⚠️ Starting server without MongoDB connection. Some features may not work.');
    
    // Start the server anyway so at least the static files work
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without MongoDB)`);
    });
  }); 