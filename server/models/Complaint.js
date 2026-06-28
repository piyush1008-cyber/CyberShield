const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    unique: true,
    required: true
  },
  citizenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Complaint title is required'],
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: 5000
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Financial Fraud',
      'Identity Theft',
      'Online Harassment / Cyberbullying',
      'Phishing / Social Engineering',
      'Ransomware / Malware Attack',
      'Data Breach',
      'Online Scam',
      'Other'
    ]
  },
  status: {
    type: String,
    enum: [
      'Submitted',
      'Under Review',
      'Rejected',
      'Assigned',
      'Under Investigation',
      'Resolved',
      'Closed'
    ],
    default: 'Submitted'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  incidentDate: {
    type: Date,
    required: [true, 'Date of incident is required']
  },
  additionalInfo: {
    type: String,
    maxlength: 3000,
    default: null
  },
  rejectionReason: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for optimized queries
complaintSchema.index({ trackingId: 1 });
complaintSchema.index({ citizenId: 1 });
complaintSchema.index({ assignedTo: 1 });
complaintSchema.index({ status: 1 });
complaintSchema.index({ category: 1 });
complaintSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Complaint', complaintSchema);
