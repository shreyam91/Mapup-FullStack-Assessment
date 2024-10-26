const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user; // Attach the entire user object
      req.userId = decoded.userId; // Attach user ID
      req.userRole = decoded.role; // Attach user role

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
};

module.exports = authMiddleware;
