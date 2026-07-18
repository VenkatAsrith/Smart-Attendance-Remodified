const mongoose = require('mongoose');

const attendanceRecordSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  rollNo: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'Medical Leave'],
    required: true,
    default: 'Present'
  },
  remarks: {
    type: String,
    default: ''
  }
}, { _id: false });

const attendanceSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true // YYYY-MM-DD
  },
  hour: {
    type: Number,
    required: true,
    min: 1,
    max: 7
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
  subjectCode: {
    type: String,
    required: true
  },
  subjectName: {
    type: String
  },
  facultyId: {
    type: String,
    default: 'FAC-CSE-001'
  },
  facultyName: {
    type: String,
    default: 'Dr. K. Srinivas Rao'
  },
  records: [attendanceRecordSchema]
}, { timestamps: true });

attendanceSchema.index({ date: 1, hour: 1, section: 1, subjectCode: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
