const fs = require('fs');
const csv = require('csv-parser');
const Weather = require('../models/Weather'); 
const Data = require('../models/Data'); 
const User = require('../models/User'); 

// Validating CSV data for weather
const validateWeatherData = (data) => {
  const errors = [];
  data.forEach((item, index) => {
    const { date, max_temperature, precipitation, max_windspeed, max_wind_gusts } = item;
    if (!date) errors.push(`Row ${index + 1}: Invalid or missing date`);
    if (max_temperature === undefined || isNaN(Number(max_temperature))) errors.push(`Row ${index + 1}: Invalid or missing temperature`);
    if (precipitation === undefined || isNaN(Number(precipitation))) errors.push(`Row ${index + 1}: Invalid or missing precipitation`);
    if (max_windspeed === undefined || isNaN(Number(max_windspeed))) errors.push(`Row ${index + 1}: Invalid or missing max windspeed`);
    if (max_wind_gusts === undefined || isNaN(Number(max_wind_gusts))) errors.push(`Row ${index + 1}: Invalid or missing max wind gusts`);
  });
  return errors;
};

// Bulk insert weather data
exports.bulkInsertWeatherData = async (filePath) => {
  try {
    const weatherData = []; 
    let isWeatherDataSection = false; 

    // Parse the CSV file directly
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          console.log("Row Data:", row); 

          if (row.date) {
            isWeatherDataSection = true;
          } else if (row.latitude) {
            isWeatherDataSection = false; 
            return; 
          }

          if (isWeatherDataSection) {
            if (row.date && row.max_temperature && row.precipitation && row.max_windspeed && row.max_wind_gusts) {
              weatherData.push({
                date: row.date,
                max_temperature: parseFloat(row.max_temperature),
                precipitation: parseFloat(row.precipitation),
                max_windspeed: parseFloat(row.max_windspeed),
                max_wind_gusts: parseFloat(row.max_wind_gusts),
              });
            }
          }
        })
        .on('end', resolve) 
        .on('error', reject); 
    });

    // Check for empty data
    if (weatherData.length === 0) {
      throw new Error('No valid weather data found in the CSV file.');
    }

    console.log("Filtered Weather Data:", weatherData); 

    // Validate the weather data
    const validationErrors = validateWeatherData(weatherData);
    if (validationErrors.length > 0) {
      throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
    }

    // Insert validated data into MongoDB
    await Weather.insertMany(weatherData);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error saving weather data:', error.message);
    throw error; 
  } finally {
    // Delete the file only if it exists
    if (filePath) {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Error deleting file: ${err}`);
      });
    }
  }
};

// Add Data (Admin route)
exports.addData = async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json({ message: 'Data added successfully', data: newData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users (Admin route)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Manager Data with pagination and filtering
const checkRole = (user, roles) => roles.includes(user.role);

exports.getManagerData = async (req, res) => {
  const user = req.user;
  if (!checkRole(user, ['Admin', 'Manager'])) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  const { page = 1, limit = 10, filter } = req.query;
  const query = { managerId: user._id };

  if (filter) query.someField = { $regex: filter, $options: 'i' };

  try {
    const data = await Data.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Data.countDocuments(query);

    res.json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User Data (User route)
exports.getUserData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = await Data.find({ userId });
    res.status(200).json({ data: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bulk Insert General Data
exports.bulkInsertData = async (data) => {
  try {
    await Data.insertMany(data);
    console.log('General data inserted successfully');
  } catch (error) {
    console.error('Error saving data:', error.message);
    throw error;
  }
};

// Fetch Weather Data
exports.getWeatherData = async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.status(200).json({ data: weatherData });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ message: 'Error fetching weather data', error: error.message });
  }
};