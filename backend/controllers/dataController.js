const Weather = require('../models/Weather');
const Data = require('../models/Data');
const User = require('../models/User');

// Validate CSV data for weather
const validateWeatherData = (data) => {
  const errors = [];
  console.log('Input Data:', data);
  data.forEach((item, index) => {
    const { date, max_temperature, precipitation, max_windspeed, max_wind_gusts } = item;
    if (!date) {
      errors.push(`Row ${index + 1}: Invalid or missing date`);
    }
    if (max_temperature === undefined || isNaN(Number(max_temperature))) {
      errors.push(`Row ${index + 1}: Invalid or missing  temperature`);
    }
    if (precipitation === undefined || isNaN(Number(precipitation))) {
      errors.push(`Row ${index + 1}: Invalid or missing precipitation`);
    }
    if (max_windspeed === undefined || isNaN(Number(max_windspeed))) {
      errors.push(`Row ${index + 1}: Invalid or missing max windspeed`);
    }
    if (max_wind_gusts === undefined || isNaN(Number(max_wind_gusts))) {
      errors.push(`Row ${index + 1}: Invalid or missing max wind gusts`);
    }
  });

  return errors;
};

// Bulk insert weather data with validation
exports.bulkInsertWeatherData = async (filePath) => {
  try {
    const weatherData = await parseCSV(filePath); // Parse and filter CSV

    console.log("Filtered Weather Data:", weatherData); // Check structure in console

    const validationErrors = validateWeatherData(weatherData);
    if (validationErrors.length > 0) {
      throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
    }

    await Weather.insertMany(weatherData);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error saving weather data:', error.message);
    throw error;
  }
};


// Middleware for checking roles
const checkRole = (user, roles) => roles.includes(user.role);

// Get data specific to managers with pagination and filtering
exports.getManagerData = async (req, res) => {
  const user = req.user;
  if (!checkRole(user, ['Admin', 'Manager'])) {
    return res.status(403).json({ error: "Access denied." });
  }
  
  const { page = 1, limit = 10, filter } = req.query; // Extract pagination and filter from query params
  const query = { managerId: user._id };

  // Add filtering if needed
  if (filter) {
    query.someField = { $regex: filter, $options: 'i' }; // Example filtering
  }

  try {
    const data = await Data.find(query)
      .limit(limit * 1) // Limit results
      .skip((page - 1) * limit) // Skip results for pagination
      .exec();
    
    const count = await Data.countDocuments(query); // Get total count for pagination

    res.json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get data specific to regular users with pagination
exports.getUserData = async (req, res) => {
  const user = req.user;
  if (!checkRole(user, ['Admin', 'User', 'Manager'])) {
    return res.status(403).json({ error: "Access denied." });
  }

  const { page = 1, limit = 10, filter } = req.query;
  const query = { userId: user._id };

  // Add filtering if needed
  if (filter) {
    query.someField = { $regex: filter, $options: 'i' }; // Example filtering
  }

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

// Add new data (only for Admins)
exports.addData = async (req, res) => {
  const user = req.user;
  if (!checkRole(user, ['Admin'])) {
    return res.status(403).json({ error: "Access denied." });
  }
  
  try {
    const data = await Data.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users (only for Admins)
exports.getAllUsers = async (req, res) => {
  const user = req.user;
  if (!checkRole(user, ['Admin'])) {
    return res.status(403).json({ error: "Access denied." });
  }

  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bulk insert data (for CSV uploads)
exports.bulkInsertData = async (dataArray) => {
  try {
    await Data.insertMany(dataArray);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error; // Rethrow to handle in the route
  }
};

// Update existing data by ID (only for Admins)
exports.updateData = async (req, res) => {
  const user = req.user;
  if (!checkRole(user, ['Admin'])) {
    return res.status(403).json({ error: "Access denied." });
  }

  const { id } = req.params; // Expecting the ID in the route params
  try {
    const updatedData = await Data.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedData) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete data by ID (only for Admins)
exports.deleteData = async (req, res) => {
  const user = req.user;
  if (!checkRole(user, ['Admin'])) {
    return res.status(403).json({ error: "Access denied." });
  }

  const { id } = req.params; // Expecting the ID in the route params
  try {
    const deletedData = await Data.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
