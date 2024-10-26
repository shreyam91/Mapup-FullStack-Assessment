const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  date: { type: String, required: true },
  max_temperature: { type: Number, required: true },
  precipitation: { type: Number, required: true },
  max_windspeed: { type: Number, required: true },
  max_wind_gusts: { type: Number, required: true },
});

module.exports = mongoose.model('Weather', weatherSchema);
