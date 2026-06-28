const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getInvestigation,
  addInvestigationNote,
  updatePriority,
  sendMessage
} = require('../controllers/investigationController');

// All routes require authentication
router.use(protect);

// Investigator routes
router.get('/:complaintId', getInvestigation);
router.post('/:complaintId/notes', authorize('investigator'), addInvestigationNote);
router.put('/:complaintId/priority', authorize('investigator'), updatePriority);
router.post('/:complaintId/communicate', authorize('investigator', 'citizen'), sendMessage);

module.exports = router;
