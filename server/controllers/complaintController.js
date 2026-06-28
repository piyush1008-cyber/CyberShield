const Complaint = require('../models/Complaint');
const Notification = require('../models/Notification');
const generateTrackingId = require('../utils/generateTrackingId');

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Private (Citizen)
const createComplaint = async (req, res, next) => {
  try {
    const { title, description, category, incidentDate } = req.body;

    // Generate unique tracking ID
    let trackingId;
    let isUnique = false;
    while (!isUnique) {
      trackingId = generateTrackingId();
      const existing = await Complaint.findOne({ trackingId });
      if (!existing) isUnique = true;
    }

    const complaint = await Complaint.create({
      trackingId,
      citizenId: req.user._id,
      title,
      description,
      category,
      incidentDate
    });

    // Create notification for the citizen
    await Notification.create({
      userId: req.user._id,
      type: 'complaint_submitted',
      title: 'Complaint Submitted',
      message: `Your complaint "${title}" has been submitted successfully. Tracking ID: ${trackingId}`,
      relatedComplaint: complaint._id
    });

    res.status(201).json({
      success: true,
      message: 'Complaint filed successfully',
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all complaints (filtered by role)
// @route   GET /api/complaints
// @access  Private
const getComplaints = async (req, res, next) => {
  try {
    let query = {};
    const { status, category, priority, page = 1, limit = 10 } = req.query;

    // Role-based filtering
    if (req.user.role === 'citizen') {
      query.citizenId = req.user._id;
    } else if (req.user.role === 'investigator') {
      query.assignedTo = req.user._id;
    }
    // Admin sees all complaints

    // Apply filters
    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;

    const total = await Complaint.countDocuments(query);
    const complaints = await Complaint.find(query)
      .populate('citizenId', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: complaints,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get complaint by ID
// @route   GET /api/complaints/:id
// @access  Private
const getComplaintById = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('citizenId', 'name email phone')
      .populate('assignedTo', 'name email');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Citizens can only view their own complaints
    if (req.user.role === 'citizen' && complaint.citizenId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this complaint'
      });
    }

    res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Track complaint by Tracking ID
// @route   GET /api/complaints/track/:trackingId
// @access  Private (Citizen)
const trackComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findOne({
      trackingId: req.params.trackingId,
      citizenId: req.user._id
    }).populate('assignedTo', 'name');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found. Please check your Tracking ID.'
      });
    }

    res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update complaint details
// @route   PUT /api/complaints/:id
// @access  Private (Citizen - own complaint only)
const updateComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Only the citizen who filed it can update
    if (complaint.citizenId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this complaint'
      });
    }

    // Can only update if status is 'Submitted'
    if (complaint.status !== 'Submitted') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update complaint after it has been reviewed'
      });
    }

    const { title, description, additionalInfo } = req.body;
    if (title) complaint.title = title;
    if (description) complaint.description = description;
    if (additionalInfo) complaint.additionalInfo = additionalInfo;

    const updated = await complaint.save();

    res.status(200).json({
      success: true,
      message: 'Complaint updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id/status
// @access  Private (Investigator/Admin)
const updateComplaintStatus = async (req, res, next) => {
  try {
    const { status, rejectionReason } = req.body;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    complaint.status = status;
    if (status === 'Rejected' && rejectionReason) {
      complaint.rejectionReason = rejectionReason;
    }

    await complaint.save();

    // Notify the citizen
    await Notification.create({
      userId: complaint.citizenId,
      type: 'status_update',
      title: 'Complaint Status Updated',
      message: `Your complaint "${complaint.title}" status has been updated to: ${status}`,
      relatedComplaint: complaint._id
    });

    res.status(200).json({
      success: true,
      message: `Complaint status updated to '${status}'`,
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  trackComplaint,
  updateComplaint,
  updateComplaintStatus
};
