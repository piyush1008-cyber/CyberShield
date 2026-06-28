const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema({
  complaintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint',
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true,
    enum: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain',
      'video/mp4',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
  },
  fileSize: {
    type: Number,
    required: true,
    max: 10 * 1024 * 1024 // 10MB max
  },
  description: {
    type: String,
    maxlength: 500,
    default: null
  }
}, {
  timestamps: true
});

// Index for fetching evidence by complaint
evidenceSchema.index({ complaintId: 1 });

module.exports = mongoose.model('Evidence', evidenceSchema);
