const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  permissions: {
    type: Object, 
    default: {}, 
  },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
