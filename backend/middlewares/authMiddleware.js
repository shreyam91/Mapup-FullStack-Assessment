const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

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

      req.user = user; 
      req.userId = decoded.userId; 
      req.userRole = decoded.role; 

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
};

module.exports = authMiddleware;
