const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Subject = require('../models/Subject');
const Notification = require('../models/Notification');

exports.getStudentDashboard = async (req, res) => {
  try {
    const rollNo = req.params.rollNo || req.user.rollNo;

    const student = await Student.findOne({ rollNo: rollNo.toUpperCase() });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }

    // Fetch all attendance records for this student
    const sessions = await Attendance.find({ 'records.rollNo': student.rollNo }).sort({ date: 1 });

    const totalSessions = sessions.length;
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalLate = 0;
    let totalMedical = 0;

    const subjectStats = {};
    const dailyMap = {};

    sessions.forEach(sess => {
      const rec = sess.records.find(r => r.rollNo === student.rollNo);
      if (!rec) return;

      const dateStr = sess.date;
      if (!dailyMap[dateStr]) {
        dailyMap[dateStr] = { date: dateStr, present: 0, total: 0 };
      }
      dailyMap[dateStr].total += 1;

      if (rec.status === 'Present') {
        totalPresent += 1;
        dailyMap[dateStr].present += 1;
      } else if (rec.status === 'Late') {
        totalLate += 1;
        totalPresent += 1;
        dailyMap[dateStr].present += 1;
      } else if (rec.status === 'Absent') {
        totalAbsent += 1;
      } else if (rec.status === 'Medical Leave') {
        totalMedical += 1;
      }

      // Subject stats
      const sub = sess.subjectCode;
      if (!subjectStats[sub]) {
        subjectStats[sub] = {
          code: sub,
          name: sess.subjectName || sub,
          total: 0,
          attended: 0,
          absent: 0
        };
      }
      subjectStats[sub].total += 1;
      if (['Present', 'Late'].includes(rec.status)) {
        subjectStats[sub].attended += 1;
      } else {
        subjectStats[sub].absent += 1;
      }
    });

    const overallPct = totalSessions > 0 ? Math.round((totalPresent / totalSessions) * 100) : 100;

    // Heatmap data array
    const heatmapData = Object.values(dailyMap).map(d => ({
      date: d.date,
      percentage: d.total > 0 ? Math.round((d.present / d.total) * 100) : 0,
      total: d.total,
      present: d.present
    }));

    // Notifications
    const notifications = await Notification.find({
      $or: [{ targetRole: 'ALL' }, { targetRole: 'STUDENT' }, { rollNo: student.rollNo }]
    }).sort({ createdAt: -1 }).limit(10);

    return res.status(200).json({
      success: true,
      student,
      metrics: {
        totalSessions,
        totalPresent,
        totalAbsent,
        totalLate,
        totalMedical,
        overallPct
      },
      subjects: Object.values(subjectStats),
      heatmapData,
      notifications
    });
  } catch (error) {
    console.error('Student Dashboard Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load student dashboard.' });
  }
};

exports.updateStudentProfile = async (req, res) => {
  try {
    const rollNo = req.params.rollNo || req.user.rollNo;
    const { name, phone, parentName, parentPhone, bloodGroup, address, dob, photo } = req.body;

    const student = await Student.findOneAndUpdate(
      { rollNo: rollNo.toUpperCase() },
      { name, phone, parentName, parentPhone, bloodGroup, address, dob, photo },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      student
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
};
