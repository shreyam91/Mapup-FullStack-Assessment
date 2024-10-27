const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const authorize = require('../middlewares/roleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

// Admin routes
router.post('/admin/data', authMiddleware, authorize('canModifyData'), dataController.addData);
router.get('/admin/users', authMiddleware, authorize('canManageUsers'), dataController.getAllUsers);

// Manager routes
router.get('/manager/data', authMiddleware, authorize('canViewSpecificData'), dataController.getManagerData);

// User routes
router.get('/user/data', authMiddleware, authorize('canViewOwnData'), dataController.getUserData);

// Route to upload weather CSV file
router.post('/upload/weather', authMiddleware, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No weather file uploaded.' });
  }

  const results = [];

  // Parse the weather CSV file
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await dataController.bulkInsertWeatherData(req.file.path);
        
        fs.unlinkSync(req.file.path);

        res.status(201).json({ message: 'Weather data uploaded successfully', data: results });
      } catch (error) {
        console.error('Error saving weather data:', error);
        res.status(400).json({ message: error.message });
      }
    })
    .on('error', (error) => {
      console.error('Error parsing weather CSV:', error);
      res.status(500).json({ message: 'Error processing weather CSV file', error: error.message });
    });
});

// Route to upload general CSV file
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No general file uploaded.' });
  }

  const results = [];

  // Parse the general CSV file
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await dataController.bulkInsertData(results); 

        fs.unlinkSync(req.file.path);

        res.status(201).json({ message: 'Data uploaded successfully', data: results });
      } catch (error) {
        console.error('Error saving data:', error); 
        res.status(500).json({ message: 'Error saving data', error: error.message });
      }
    })
    .on('error', (error) => {
      console.error('Error parsing general CSV:', error);
      res.status(500).json({ message: 'Error processing general CSV file', error: error.message });
    });
});

// Route to fetch all weather data
router.get('/weather', authMiddleware, async (req, res) => {
  try {
    const weatherData = await dataController.getWeatherData(); 
    res.json(weatherData); 
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ message: 'Error fetching weather data', error: error.message });
  }
});

module.exports = router;
