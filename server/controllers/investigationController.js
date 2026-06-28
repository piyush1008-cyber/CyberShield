const Investigation = require('../models/Investigation');
const Complaint = require('../models/Complaint');
const Notification = require('../models/Notification');

// @desc    Get investigation details for a complaint
// @route   GET /api/investigations/:complaintId
// @access  Private
const getInvestigation = async (req, res, next) => {
  try {
    const investigation = await Investigation.findOne({ complaintId: req.params.complaintId })
      .populate('investigatorId', 'name email')
      .populate('notes.addedBy', 'name role')
      .populate('communications.senderId', 'name role');

    if (!investigation) {
      return res.status(404).json({
        success: false,
        message: 'Investigation not found for this complaint'
      });
    }

    res.status(200).json({
      success: true,
      data: investigation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add investigation note
// @route   POST /api/investigations/:complaintId/notes
// @access  Private (Investigator)
const addInvestigationNote = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Note content is required'
      });
    }

    const investigation = await Investigation.findOne({ complaintId: req.params.complaintId });

    if (!investigation) {
      return res.status(404).json({
        success: false,
        message: 'Investigation not found'
      });
    }

    // Only the assigned investigator can add notes
    if (investigation.investigatorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the assigned investigator can add notes'
      });
    }

    investigation.notes.push({
      content,
      addedBy: req.user._id,
      addedAt: new Date()
    });

    await investigation.save();

    res.status(201).json({
      success: true,
      message: 'Investigation note added',
      data: investigation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update case priority
// @route   PUT /api/investigations/:complaintId/priority
// @access  Private (Investigator)
const updatePriority = async (req, res, next) => {
  try {
    const { priority } = req.body;

    if (!['Low', 'Medium', 'High', 'Critical'].includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid priority. Must be Low, Medium, High, or Critical'
      });
    }

    const complaint = await Complaint.findById(req.params.complaintId);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    complaint.priority = priority;
    await complaint.save();

    res.status(200).json({
      success: true,
      message: `Priority updated to ${priority}`,
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send message between investigator and citizen
// @route   POST /api/investigations/:complaintId/communicate
// @access  Private (Investigator/Citizen)
const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required'
      });
    }

    const investigation = await Investigation.findOne({ complaintId: req.params.complaintId });

    if (!investigation) {
      return res.status(404).json({
        success: false,
        message: 'Investigation not found'
      });
    }

    investigation.communications.push({
      senderId: req.user._id,
      senderRole: req.user.role,
      message,
      sentAt: new Date()
    });

    await investigation.save();

    // Notify the other party
    const complaint = await Complaint.findById(req.params.complaintId);
    const recipientId = req.user.role === 'investigator'
      ? complaint.citizenId
      : investigation.investigatorId;

    await Notification.create({
      userId: recipientId,
      type: 'new_message',
      title: 'New Message',
      message: `You have a new message regarding case ${complaint.trackingId}`,
      relatedComplaint: complaint._id
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: investigation.communications[investigation.communications.length - 1]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInvestigation,
  addInvestigationNote,
  updatePriority,
  sendMessage
};
