const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');

exports.exportExcel = async (req, res) => {
  try {
    const { department = 'CSE', year = '4th Year', semester = '7th Sem', section = 'A' } = req.query;

    const students = await Student.find({ department, year, semester, section }).sort({ rollNo: 1 });
    const sessions = await Attendance.find({ department, year, semester, section }).sort({ date: 1, hour: 1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`Attendance_${section}`);

    // Header styling
    worksheet.columns = [
      { header: 'S.No', key: 'sno', width: 8 },
      { header: 'Roll Number', key: 'rollNo', width: 16 },
      { header: 'Student Name', key: 'name', width: 30 },
      { header: 'Department', key: 'dept', width: 12 },
      { header: 'Total Sessions', key: 'total', width: 16 },
      { header: 'Attended', key: 'attended', width: 14 },
      { header: 'Absent', key: 'absent', width: 12 },
      { header: 'Attendance %', key: 'pct', width: 16 },
      { header: 'Status', key: 'status', width: 16 }
    ];

    students.forEach((st, idx) => {
      let total = 0;
      let attended = 0;
      let absent = 0;

      sessions.forEach(sess => {
        const rec = sess.records.find(r => r.rollNo === st.rollNo);
        if (rec) {
          total += 1;
          if (['Present', 'Late'].includes(rec.status)) {
            attended += 1;
          } else {
            absent += 1;
          }
        }
      });

      const pct = total > 0 ? Math.round((attended / total) * 100) : st.overallAttendancePct;
      const status = pct >= 75 ? 'ELIGIBLE' : 'DETENTION RISK';

      worksheet.addRow({
        sno: idx + 1,
        rollNo: st.rollNo,
        name: st.name,
        dept: st.department,
        total,
        attended,
        absent,
        pct: `${pct}%`,
        status
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=Attendance_Report_${department}_${year}_${section}.xlsx`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Excel Export Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate Excel report.' });
  }
};

exports.exportPDF = async (req, res) => {
  try {
    const { department = 'CSE', year = '4th Year', semester = '7th Sem', section = 'A' } = req.query;

    const students = await Student.find({ department, year, semester, section }).sort({ rollNo: 1 });

    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Attendance_Summary_${department}_${section}.pdf`);

    doc.pipe(res);

    // Title
    doc.fontSize(20).fillColor('#7C5CFC').text('JNTUH SULTANPUR — COLLEGE OF ENGINEERING', { align: 'center' });
    doc.fontSize(14).fillColor('#333333').text(`Official Attendance Summary Report — ${department} ${year} (${semester} Sec ${section})`, { align: 'center' });
    doc.moveDown();

    doc.fontSize(10).fillColor('#666666').text(`Generated Date: ${new Date().toLocaleDateString()} | Total Students: ${students.length}`);
    doc.moveDown();

    // Table Headers
    doc.fontSize(10).fillColor('#000000');
    doc.text('Roll No', 40, 150, { width: 100 });
    doc.text('Student Name', 140, 150, { width: 220 });
    doc.text('Dept', 370, 150, { width: 50 });
    doc.text('Attendance %', 430, 150, { width: 80 });
    doc.text('Status', 510, 150, { width: 80 });

    doc.moveTo(40, 165).lineTo(570, 165).strokeColor('#7C5CFC').stroke();

    let y = 175;
    students.forEach((st) => {
      if (y > 780) {
        doc.addPage();
        y = 40;
      }
      doc.fontSize(9).fillColor('#333333');
      doc.text(st.rollNo, 40, y, { width: 100 });
      doc.text(st.name, 140, y, { width: 220 });
      doc.text(st.department, 370, y, { width: 50 });
      doc.text(`${st.overallAttendancePct}%`, 430, y, { width: 80 });

      if (st.overallAttendancePct < 75) {
        doc.fillColor('#EF4444').text('DETENTION RISK', 510, y, { width: 80 });
      } else {
        doc.fillColor('#22C55E').text('ELIGIBLE', 510, y, { width: 80 });
      }
      y += 18;
    });

    doc.end();
  } catch (error) {
    console.error('PDF Export Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate PDF report.' });
  }
};
