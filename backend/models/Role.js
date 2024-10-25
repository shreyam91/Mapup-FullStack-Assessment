const mongoose = require('mongoose');

// Define the role schema
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  permissions: {
    type: Object, // Use Object for JSON-like structure
    default: {}, // Optional: Set default to an empty object
  },
});

// Create the model
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
