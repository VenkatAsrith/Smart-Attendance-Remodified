const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Subject = require('../models/Subject');
const Attendance = require('../models/Attendance');
const Notification = require('../models/Notification');

const { rawStudents, facultyMembers, subjectsList } = require('../utils/seedData');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_attendance_enterprise';

async function seed() {
  try {
    console.log('🌱 Connecting to MongoDB for Seeding...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB.');

    console.log('🧹 Clearing old collections...');
    await User.deleteMany({});
    await Student.deleteMany({});
    await Faculty.deleteMany({});
    await Subject.deleteMany({});
    await Attendance.deleteMany({});
    await Notification.deleteMany({});

    console.log('📌 Seeding Subjects...');
    const createdSubjects = await Subject.insertMany(subjectsList);
    console.log(`✅ Created ${createdSubjects.length} subjects.`);

    console.log('📌 Seeding Faculty...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const facultyDocs = [];
    for (const f of facultyMembers) {
      const createdFac = await Faculty.create(f);
      facultyDocs.push(createdFac);

      await User.create({
        email: f.email,
        password: hashedPassword,
        role: 'FACULTY',
        facultyId: f.facultyId,
        profileId: createdFac._id,
        roleRef: 'Faculty'
      });
    }
    console.log(`✅ Created ${facultyDocs.length} faculty profiles & login accounts.`);

    console.log('📌 Seeding 66 CSE 4th Year Students...');
    const studentDocs = [];
    for (let i = 0; i < rawStudents.length; i++) {
      const s = rawStudents[i];
      const photoIndex = (i % 8) + 1;
      const photos = [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80"
      ];

      // Give KONAM VENKAT ASRITH (23SS1A0535) and others realistic attendance distributions
      const attendancePcts = [92, 88, 95, 78, 84, 91, 68, 73, 96, 82, 89, 74];
      const overallPct = attendancePcts[i % attendancePcts.length];

      const studentDoc = await Student.create({
        rollNo: s.rollNo,
        name: s.name,
        department: 'CSE',
        year: '4th Year',
        semester: '7th Sem',
        section: 'A',
        email: `${s.rollNo.toLowerCase()}@college.edu`,
        phone: `+91 ${9848000000 + i}`,
        parentName: `Parent of ${s.name}`,
        parentPhone: `+91 ${9440000000 + i}`,
        bloodGroup: i % 4 === 0 ? 'O+' : i % 4 === 1 ? 'A+' : i % 4 === 2 ? 'B+' : 'AB+',
        address: 'JNTUH Sultanpur Campus Hostel / Hyderabad',
        dob: '2003-04-12',
        photo: photos[i % photos.length],
        gender: s.gender,
        overallAttendancePct: overallPct
      });

      studentDocs.push(studentDoc);

      await User.create({
        email: `${s.rollNo.toLowerCase()}@college.edu`,
        password: hashedPassword,
        role: 'STUDENT',
        rollNo: s.rollNo,
        profileId: studentDoc._id,
        roleRef: 'Student'
      });
    }
    console.log(`✅ Created ${studentDocs.length} student records and login credentials.`);

    console.log('📌 Seeding 30-Day Historical Attendance Records...');
    const now = new Date();
    const attendanceRecordsToInsert = [];

    // Generate past 30 days of data across 6 subjects
    for (let dayOffset = 30; dayOffset >= 1; dayOffset--) {
      const d = new Date(now);
      d.setDate(d.getDate() - dayOffset);
      if (d.getDay() === 0) continue; // Skip Sundays

      const dateStr = d.toISOString().split('T')[0];

      // Insert 2 to 3 class sessions per weekday
      for (let h = 1; h <= 3; h++) {
        const subject = subjectsList[(dayOffset + h) % subjectsList.length];
        const faculty = facultyDocs[h % facultyDocs.length];

        const records = studentDocs.map((st, idx) => {
          let status = 'Present';
          const rand = (idx + dayOffset + h) % 100;
          if (rand > 88) status = 'Absent';
          else if (rand > 83) status = 'Late';
          else if (rand > 80 && idx % 7 === 0) status = 'Medical Leave';

          return {
            studentId: st._id,
            rollNo: st.rollNo,
            name: st.name,
            status,
            remarks: status === 'Medical Leave' ? 'Doctor Approval Attached' : status === 'Late' ? '10 mins delayed' : ''
          };
        });

        attendanceRecordsToInsert.push({
          date: dateStr,
          hour: h,
          department: 'CSE',
          year: '4th Year',
          semester: '7th Sem',
          section: 'A',
          subjectCode: subject.code,
          subjectName: subject.name,
          facultyId: faculty.facultyId,
          facultyName: faculty.name,
          records
        });
      }
    }

    await Attendance.insertMany(attendanceRecordsToInsert);
    console.log(`✅ Inserted ${attendanceRecordsToInsert.length} class attendance sessions.`);

    console.log('📌 Seeding Initial System Notifications...');
    await Notification.create([
      {
        title: '75% Attendance Mandatory Warning',
        message: 'Students falling below 75% attendance in 7th Sem CSE will be flagged for hall ticket detention.',
        type: 'WARNING',
        targetRole: 'STUDENT'
      },
      {
        title: 'Mid-Term Exam Timetable Published',
        message: 'The CSE 4th Year 7th Sem Mid-Term examination schedules are live on the portal.',
        type: 'INFO',
        targetRole: 'ALL'
      },
      {
        title: 'Attendance Reports Ready for Export',
        message: 'Faculty can export PDF and Excel monthly breakdown reports from the Show Attendance module.',
        type: 'SUCCESS',
        targetRole: 'FACULTY'
      }
    ]);
    console.log('✅ Created system notifications.');

    console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
