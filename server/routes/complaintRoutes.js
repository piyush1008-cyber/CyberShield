const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createComplaint,
  getComplaints,
  getComplaintById,
  trackComplaint,
  updateComplaint,
  updateComplaintStatus
} = require('../controllers/complaintController');

// All routes require authentication
router.use(protect);

// Citizen routes
router.post('/', authorize('citizen'), createComplaint);
router.get('/', getComplaints);
router.get('/:id', getComplaintById);
router.get('/track/:trackingId', authorize('citizen'), trackComplaint);
router.put('/:id', authorize('citizen'), updateComplaint);

// Investigator & Admin routes
router.put('/:id/status', authorize('investigator', 'admin'), updateComplaintStatus);

module.exports = router;
