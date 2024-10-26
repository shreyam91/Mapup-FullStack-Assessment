// jobQueue.js
const Queue = require('bull');
const mongoose = require('mongoose');
const Weather = require('../models/Weather');
require('dotenv').config();

// Create a new Bull queue
const weatherDataQueue = new Queue('weatherData', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// Process jobs in the queue
weatherDataQueue.process(async (job) => {
  console.log('Processing job:', job.data);

  // Implement the logic for saving data to MongoDB
  const results = job.data.results;

  try {
    await Weather.insertMany(results);
    console.log('Weather data saved to MongoDB');
  } catch (error) {
    console.error('Error saving weather data:', error);
    throw new Error(error.message); // Rethrow to mark job as failed
  }
});

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Call the MongoDB connection function
connectToMongoDB();

module.exports = weatherDataQueue;
