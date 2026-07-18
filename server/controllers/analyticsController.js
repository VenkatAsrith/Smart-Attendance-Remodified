const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Subject = require('../models/Subject');

exports.getFacultyAnalytics = async (req, res) => {
  try {
    const { department = 'CSE', year = '4th Year', semester = '7th Sem', section = 'A' } = req.query;

    const totalStudents = await Student.countDocuments({ department, year, semester, section });
    const sessions = await Attendance.find({ department, year, semester, section });

    let totalRecordEntries = 0;
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalLate = 0;
    let totalMedical = 0;

    const subjectBreakdown = {};
    const dateTrendMap = {};

    sessions.forEach(sess => {
      const dateStr = sess.date;
      if (!dateTrendMap[dateStr]) {
        dateTrendMap[dateStr] = { date: dateStr, total: 0, present: 0 };
      }

      const sub = sess.subjectCode;
      if (!subjectBreakdown[sub]) {
        subjectBreakdown[sub] = { subject: sub, subjectName: sess.subjectName || sub, present: 0, absent: 0, late: 0, medical: 0, total: 0 };
      }

      sess.records.forEach(rec => {
        totalRecordEntries += 1;
        subjectBreakdown[sub].total += 1;
        dateTrendMap[dateStr].total += 1;

        if (rec.status === 'Present') {
          totalPresent += 1;
          subjectBreakdown[sub].present += 1;
          dateTrendMap[dateStr].present += 1;
        } else if (rec.status === 'Late') {
          totalLate += 1;
          subjectBreakdown[sub].late += 1;
          dateTrendMap[dateStr].present += 1;
        } else if (rec.status === 'Absent') {
          totalAbsent += 1;
          subjectBreakdown[sub].absent += 1;
        } else if (rec.status === 'Medical Leave') {
          totalMedical += 1;
          subjectBreakdown[sub].medical += 1;
        }
      });
    });

    const overallPct = totalRecordEntries > 0 ? Math.round(((totalPresent + totalLate) / totalRecordEntries) * 100) : 0;

    const dailyTrends = Object.values(dateTrendMap)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(d => ({
        date: d.date,
        percentage: d.total > 0 ? Math.round((d.present / d.total) * 100) : 0
      }));

    // Find students at risk (<75% overall attendance)
    const atRiskStudents = await Student.find({
      department,
      year,
      semester,
      section,
      overallAttendancePct: { $lt: 75 }
    }).select('rollNo name overallAttendancePct photo phone');

    return res.status(200).json({
      success: true,
      summary: {
        totalStudents,
        totalSessions: sessions.length,
        overallPct,
        totalPresent,
        totalAbsent,
        totalLate,
        totalMedical,
        atRiskCount: atRiskStudents.length
      },
      subjectBreakdown: Object.values(subjectBreakdown),
      dailyTrends,
      atRiskStudents
    });
  } catch (error) {
    console.error('Analytics Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to compute analytics.' });
  }
};
