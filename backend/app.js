require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const initSocket = require('./sockets/socket');
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();
app.use(bodyParser.json()); // For parsing application/json

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.use('/api/auth', authRoutes);
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/data', require('./routes/dataRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app; // Export the app
