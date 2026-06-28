const mongoose = require('mongoose');

const investigationSchema = new mongoose.Schema({
  complaintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint',
    required: true,
    unique: true
  },
  investigatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'On Hold', 'Completed'],
    default: 'Active'
  },
  notes: [{
    content: {
      type: String,
      required: true,
      maxlength: 2000
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  communications: [{
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    senderRole: {
      type: String,
      enum: ['citizen', 'investigator'],
      required: true
    },
    message: {
      type: String,
      required: true,
      maxlength: 2000
    },
    sentAt: {
      type: Date,
      default: Date.now
    }
  }],
  findings: {
    type: String,
    maxlength: 5000,
    default: null
  },
  assignedAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Indexes
investigationSchema.index({ complaintId: 1 });
investigationSchema.index({ investigatorId: 1 });
investigationSchema.index({ status: 1 });

module.exports = mongoose.model('Investigation', investigationSchema);
