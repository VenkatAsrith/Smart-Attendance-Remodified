const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    default: 'CSE'
  },
  year: {
    type: String,
    default: '4th Year'
  },
  semester: {
    type: String,
    default: '7th Sem'
  },
  section: {
    type: String,
    default: 'A'
  },
  email: {
    type: String,
    lowercase: true
  },
  phone: {
    type: String,
    default: '+91 98765 43210'
  },
  parentName: {
    type: String
  },
  parentPhone: {
    type: String,
    default: '+91 98480 11223'
  },
  bloodGroup: {
    type: String,
    default: 'O+'
  },
  address: {
    type: String,
    default: 'Hyderabad, Telangana, India'
  },
  dob: {
    type: String,
    default: '2003-05-15'
  },
  photo: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
    default: 'M'
  },
  overallAttendancePct: {
    type: Number,
    default: 85.0
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
