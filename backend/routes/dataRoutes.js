const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const authorize = require('../middlewares/roleMiddleware');
// Admin routes
router.post('/admin/data', authorize('canModifyData'), dataController.addData);
router.get('/admin/users', authorize('canManageUsers'), dataController.getAllUsers);

// Manager routes
router.get('/manager/data', authorize('canViewSpecificData'), dataController.getManagerData);

// User routes
router.get('/user/data', authorize('canViewOwnData'), dataController.getUserData);

module.exports = router;
