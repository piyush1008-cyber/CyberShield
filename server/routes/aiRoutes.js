const express = require('express');
const rateLimit = require('express-rate-limit');
const { classifyComplaint, scanURL, chatWithAI } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Rate limiter for AI endpoints to prevent abuse and API quota exhaustion
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // 60 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests to AI threat services. Please try again after a few minutes.'
  }
});

// AI Complaint Classification - requires auth & rate limiting
router.post('/classify', protect, aiLimiter, classifyComplaint);

// URL Scanner - public with rate limiting
router.post('/scan-url', aiLimiter, scanURL);

// AI Chatbot - public with rate limiting
router.post('/chat', aiLimiter, chatWithAI);

module.exports = router;
