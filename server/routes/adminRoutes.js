const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  assignInvestigator,
  getStats,
  getReports
} = require('../controllers/adminController');

// All admin routes require authentication + admin role
router.use(protect);
router.use(authorize('admin'));

// User management
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Case management
router.put('/complaints/:id/assign', assignInvestigator);

// Analytics & Reports
router.get('/stats', getStats);
router.get('/reports', getReports);

module.exports = router;
