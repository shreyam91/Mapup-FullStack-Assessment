const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  max_temperature: { type: Number, required: true },
  precipitation: { type: Number, required: true },
  max_windspeed: { type: Number, required: true },
  max_wind_gusts: { type: Number, required: true },
});

const Weather = mongoose.model('Weather', WeatherSchema);
module.exports = Weather;
