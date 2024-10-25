// /models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // unique: true,
    // trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // trim: true,
    // lowercase: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: 6,
  },
  role: {
    type: String,
    enum: ['Admin', 'Manager', 'User'],
    default: 'User',
  },
}, { timestamps: true }
);

// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
