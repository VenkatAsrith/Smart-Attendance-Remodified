const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
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
  credits: {
    type: Number,
    default: 4
  }
});

module.exports = mongoose.model('Subject', subjectSchema);
