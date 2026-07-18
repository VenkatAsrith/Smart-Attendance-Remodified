const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Notification = require('../models/Notification');

// Dynamic Student Fetching for Mark Attendance
exports.getStudentsForAttendance = async (req, res) => {
  try {
    const { department = 'CSE', year = '4th Year', semester = '7th Sem', section = 'A' } = req.query;

    const students = await Student.find({ department, year, semester, section }).sort({ rollNo: 1 });
    return res.status(200).json({
      success: true,
      count: students.length,
      students
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch students roster.' });
  }
};

// Save Attendance Session
exports.saveAttendance = async (req, res) => {
  try {
    const { date, hour, department, year, semester, section, subjectCode, subjectName, facultyId, facultyName, records } = req.body;

    if (!date || !hour || !subjectCode || !records || !records.length) {
      return res.status(400).json({ success: false, message: 'Missing required attendance fields.' });
    }

    // Upsert session
    const existingSession = await Attendance.findOne({ date, hour, section, subjectCode });

    let savedSession;
    if (existingSession) {
      existingSession.records = records;
      existingSession.facultyId = facultyId || existingSession.facultyId;
      existingSession.facultyName = facultyName || existingSession.facultyName;
      savedSession = await existingSession.save();
    } else {
      savedSession = await Attendance.create({
        date,
        hour,
        department: department || 'CSE',
        year: year || '4th Year',
        semester: semester || '7th Sem',
        section: section || 'A',
        subjectCode,
        subjectName: subjectName || subjectCode,
        facultyId: facultyId || 'FAC-CSE-001',
        facultyName: facultyName || 'Dr. K. Srinivas Rao',
        records
      });
    }

    // Update students overall attendance percentage asynchronously
    for (const rec of records) {
      const allStudentRecords = await Attendance.aggregate([
        { $unwind: '$records' },
        { $match: { 'records.rollNo': rec.rollNo } },
        {
          $group: {
            _id: '$records.rollNo',
            total: { $sum: 1 },
            attended: {
              $sum: {
                $cond: [{ $in: ['$records.status', ['Present', 'Late']] }, 1, 0]
              }
            }
          }
        }
      ]);

      if (allStudentRecords && allStudentRecords.length > 0) {
        const stats = allStudentRecords[0];
        const pct = Math.round((stats.attended / stats.total) * 100);
        await Student.updateOne({ rollNo: rec.rollNo }, { overallAttendancePct: pct });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Attendance recorded successfully!',
      session: savedSession
    });
  } catch (error) {
    console.error('Save Attendance Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to record attendance session.' });
  }
};

// Show Attendance with Filtering
exports.getAttendanceRecords = async (req, res) => {
  try {
    const { department, year, semester, section, subjectCode, facultyId, startDate, endDate } = req.query;

    const filter = {};
    if (department) filter.department = department;
    if (year) filter.year = year;
    if (semester) filter.semester = semester;
    if (section) filter.section = section;
    if (subjectCode) filter.subjectCode = subjectCode;
    if (facultyId) filter.facultyId = facultyId;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = startDate;
      if (endDate) filter.date.$lte = endDate;
    }

    const sessions = await Attendance.find(filter).sort({ date: -1, hour: -1 });

    return res.status(200).json({
      success: true,
      count: sessions.length,
      sessions
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch attendance history.' });
  }
};
