const User = require('../models/User');
const Complaint = require('../models/Complaint');
const Investigation = require('../models/Investigation');
const Notification = require('../models/Notification');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
const getAllUsers = async (req, res, next) => {
  try {
    const { role, isActive, page = 1, limit = 10, search } = req.query;
    let query = {};

    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: users,
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

// @desc    Create a new user (investigator/admin)
// @route   POST /api/admin/users
// @access  Private (Admin)
const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    const user = await User.create({ name, email, phone, password, role });

    res.status(201).json({
      success: true,
      message: `${role} account created successfully`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user details
// @route   PUT /api/admin/users/:id
// @access  Private (Admin)
const updateUser = async (req, res, next) => {
  try {
    const { name, email, phone, role, isActive } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete (deactivate) user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Soft delete — deactivate instead of removing
    user.isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User account deactivated'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign investigator to a complaint
// @route   PUT /api/admin/complaints/:id/assign
// @access  Private (Admin)
const assignInvestigator = async (req, res, next) => {
  try {
    const { investigatorId, priority } = req.body;

    // Validate investigator
    const investigator = await User.findById(investigatorId);
    if (!investigator || investigator.role !== 'investigator') {
      return res.status(400).json({
        success: false,
        message: 'Invalid investigator ID'
      });
    }

    // Update complaint
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    complaint.assignedTo = investigatorId;
    complaint.status = 'Assigned';
    if (priority) complaint.priority = priority;
    await complaint.save();

    // Create investigation record
    await Investigation.create({
      complaintId: complaint._id,
      investigatorId,
      status: 'Active'
    });

    // Notify investigator
    await Notification.create({
      userId: investigatorId,
      type: 'complaint_assigned',
      title: 'New Case Assigned',
      message: `You have been assigned a new case: ${complaint.trackingId} — ${complaint.title}`,
      relatedComplaint: complaint._id
    });

    // Notify citizen
    await Notification.create({
      userId: complaint.citizenId,
      type: 'complaint_assigned',
      title: 'Investigator Assigned',
      message: `Your complaint ${complaint.trackingId} has been assigned to an investigator.`,
      relatedComplaint: complaint._id
    });

    res.status(200).json({
      success: true,
      message: 'Investigator assigned successfully',
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get system statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalCitizens,
      totalInvestigators,
      totalComplaints,
      complaintsByStatus,
      complaintsByCategory,
      recentComplaints
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'citizen' }),
      User.countDocuments({ role: 'investigator' }),
      Complaint.countDocuments(),
      Complaint.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Complaint.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]),
      Complaint.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('citizenId', 'name')
    ]);

    res.status(200).json({
      success: true,
      data: {
        users: { total: totalUsers, citizens: totalCitizens, investigators: totalInvestigators },
        complaints: {
          total: totalComplaints,
          byStatus: complaintsByStatus,
          byCategory: complaintsByCategory
        },
        recentComplaints
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate reports
// @route   GET /api/admin/reports
// @access  Private (Admin)
const getReports = async (req, res, next) => {
  try {
    const { startDate, endDate, category, status } = req.query;
    let matchStage = {};

    if (startDate && endDate) {
      matchStage.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    if (category) matchStage.category = category;
    if (status) matchStage.status = status;

    const report = await Complaint.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
            category: '$category'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  assignInvestigator,
  getStats,
  getReports
};
