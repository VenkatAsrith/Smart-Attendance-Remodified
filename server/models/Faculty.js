const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  facultyId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    default: 'Associate Professor'
  },
  department: {
    type: String,
    default: 'Computer Science & Engineering'
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    default: '+91 98490 12345'
  },
  office: {
    type: String,
    default: 'Room 401, CSE Block'
  },
  experience: {
    type: String,
    default: '12 Years'
  },
  photo: {
    type: String,
    default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
  },
  subjects: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);
