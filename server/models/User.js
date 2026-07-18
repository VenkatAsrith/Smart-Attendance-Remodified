const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['FACULTY', 'STUDENT', 'ADMIN'],
    default: 'STUDENT'
  },
  rollNo: {
    type: String,
    uppercase: true,
    trim: true
  },
  facultyId: {
    type: String,
    trim: true
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'roleRef'
  },
  roleRef: {
    type: String,
    enum: ['Student', 'Faculty']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
