const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['WARNING', 'INFO', 'SUCCESS', 'ALERT'],
    default: 'INFO'
  },
  targetRole: {
    type: String,
    enum: ['ALL', 'FACULTY', 'STUDENT'],
    default: 'ALL'
  },
  rollNo: {
    type: String
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
