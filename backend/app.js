require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const weatherDataQueue = require('./queues/jobQueue'); 
const authRoutes = require('./routes/authRoutes'); 
const dataRoutes = require('./routes/dataRoutes'); 

const app = express();
app.use(cors()); 
app.use(bodyParser.json()); 

// Connection to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use(limiter); 

// Middleware to handle JSON requests
app.use(express.json());

// Initialize multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.use('/api/auth', authRoutes); 
app.use('/api/data', dataRoutes); 

// Route to upload weather CSV file
app.post('/upload/weather', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No weather file uploaded.' });
  }

  const results = [];

  // Parse the weather CSV file
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      // Filter only rows containing weather data, ignoring metadata
      if (row.date && row.max_temperature && row.precipitation && row.max_windspeed && row.max_wind_gusts) {
        results.push({
          date: row.date,
          max_temperature: parseFloat(row.max_temperature),
          precipitation: parseFloat(row.precipitation),
          max_windspeed: parseFloat(row.max_windspeed),
          max_wind_gusts: parseFloat(row.max_wind_gusts),
        });
      }
    })
    .on('end', async () => {
      try {
        // Add a job to the queue with the filtered results
        await weatherDataQueue.add({ data: results });

        // Clean up the uploaded file
        fs.unlinkSync(req.file.path);

        res.status(201).json({ message: 'Weather data job added successfully', data: results });
      } catch (error) {
        console.error('Error adding job to queue:', error);
        res.status(400).json({ message: error.message });
      }
    })
    .on('error', (error) => {
      console.error('Error parsing weather CSV:', error);
      res.status(500).json({ message: 'Error processing weather CSV file', error: error.message });
    });
});

app.get('/', (req, res) => {
  res.send('Welcome to the API!'); 
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(err.status || 500).json({ message: err.message || 'Something broke!' }); 
});

module.exports = app;
