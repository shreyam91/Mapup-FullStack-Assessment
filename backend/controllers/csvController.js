const csv = require('csv-parser'); // Import necessary libraries
const fs = require('fs');
const Data = require('../models/Data');

exports.uploadCSV = async (req, res) => {
  const file = req.file; // Assuming you're using multer for file uploads

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Process CSV file
  const results = [];
  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      // Save processed data to MongoDB
      try {
        await Data.insertMany(results); // Use batch insert for efficiency
        res.status(201).json({ message: 'Data uploaded successfully', count: results.length });
      } catch (error) {
        res.status(500).json({ message: 'Error saving data', error: error.message });
      }
    });
};
