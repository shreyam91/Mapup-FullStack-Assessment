const Role = require('../models/Role');

const authorize = (permission) => {
  return async (req, res, next) => {
    const user = req.user; // User object attached by authMiddleware

    try {
      const role = await Role.findById(user.roleId); // Adjust to your schema if needed
      if (!role || !role.permissions.includes(permission)) {
        return res.status(403).json({ message: 'Access denied.' });
      }
      next();
    } catch (error) {
      console.error('Error fetching role:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
};

module.exports = authorize;
