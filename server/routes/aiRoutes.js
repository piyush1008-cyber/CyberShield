const express = require('express');
const { classifyComplaint, scanURL, chatWithAI } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// AI Complaint Classification - requires auth
router.post('/classify', protect, classifyComplaint);

// URL Scanner - public
router.post('/scan-url', scanURL);

// AI Chatbot - public
router.post('/chat', chatWithAI);

module.exports = router;
