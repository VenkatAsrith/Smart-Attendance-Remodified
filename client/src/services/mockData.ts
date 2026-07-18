import { StudentProfile, FacultyProfile, Subject, AttendanceSession, NotificationItem } from '../types';

const AVATAR_PHOTOS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80"
];

const rawStudentsList = [
  { rollNo: "23SS1A0501", name: "ABDUL AHAD", gender: "M" as const },
  { rollNo: "23SS1A0502", name: "ANURADHA KUMARI JHA", gender: "F" as const },
  { rollNo: "23SS1A0503", name: "ARRAMONI ARAVIND", gender: "M" as const },
  { rollNo: "23SS1A0504", name: "ARUTLA ETTI HARSHINI", gender: "F" as const },
  { rollNo: "23SS1A0505", name: "AZMEERA MANJU", gender: "F" as const },
  { rollNo: "23SS1A0506", name: "BALLARAPU ABHISHA", gender: "F" as const },
  { rollNo: "23SS1A0507", name: "BATANA RAVINDRANATH", gender: "M" as const },
  { rollNo: "23SS1A0508", name: "BEKKANTI VISHWAS", gender: "M" as const },
  { rollNo: "23SS1A0509", name: "BHUTHAM SRIKANTH", gender: "M" as const },
  { rollNo: "23SS1A0510", name: "BOINAPALLI MIDILESH VARDHAN", gender: "M" as const },
  { rollNo: "23SS1A0511", name: "BOLLI HARIKA", gender: "F" as const },
  { rollNo: "23SS1A0512", name: "BYRRAJU NAREN VARMA", gender: "M" as const },
  { rollNo: "23SS1A0513", name: "CHADUVULA MITHIL REDDY", gender: "M" as const },
  { rollNo: "23SS1A0514", name: "DAMMU PRAVEEN KUMAR", gender: "M" as const },
  { rollNo: "23SS1A0515", name: "DARA PRAKSHITH KUMAR", gender: "M" as const },
  { rollNo: "23SS1A0516", name: "DARA SINDHUJA", gender: "F" as const },
  { rollNo: "23SS1A0517", name: "DASARI SAI PRASANNA", gender: "F" as const },
  { rollNo: "23SS1A0518", name: "GANDAMALLA ANJALI", gender: "F" as const },
  { rollNo: "23SS1A0519", name: "GANGAVATH MANEESHA", gender: "F" as const },
  { rollNo: "23SS1A0520", name: "GHANAPURAM DHARANI", gender: "F" as const },
  { rollNo: "23SS1A0521", name: "GOLLA MEENA BHAVANI", gender: "F" as const },
  { rollNo: "23SS1A0522", name: "GOLLA SAI TEJA", gender: "M" as const },
  { rollNo: "23SS1A0523", name: "GOPAGONI RENUKA", gender: "F" as const },
  { rollNo: "23SS1A0524", name: "GUDURU LAXMI NIHAL VARMA", gender: "M" as const },
  { rollNo: "23SS1A0525", name: "GUGULOTH HIMAVARSHINI", gender: "F" as const },
  { rollNo: "23SS1A0526", name: "GURRALA THANSHITHA", gender: "F" as const },
  { rollNo: "23SS1A0527", name: "KAKANI SAI SATHISH", gender: "M" as const },
  { rollNo: "23SS1A0528", name: "KANAKARAJU SUDHA", gender: "F" as const },
  { rollNo: "23SS1A0529", name: "KARNE VISHWANATH", gender: "M" as const },
  { rollNo: "23SS1A0530", name: "KARRI ENOSH", gender: "M" as const },
  { rollNo: "23SS1A0531", name: "KASOJU POOJITHA", gender: "F" as const },
  { rollNo: "23SS1A0532", name: "KODEM AJAY RAGHAVA", gender: "M" as const },
  { rollNo: "23SS1A0533", name: "KOLICHELMA BINDU SRI", gender: "F" as const },
  { rollNo: "23SS1A0534", name: "KOLUVULA ANIL KUMAR", gender: "M" as const },
  { rollNo: "23SS1A0535", name: "KONAM VENKAT ASRITH", gender: "M" as const },
  { rollNo: "23SS1A0536", name: "KONGARI NAKSHITHA", gender: "F" as const },
  { rollNo: "23SS1A0537", name: "KOVAGANI JAYASRAVAN", gender: "M" as const },
  { rollNo: "23SS1A0538", name: "LAGALA VARUN", gender: "M" as const },
  { rollNo: "23SS1A0539", name: "LODE SANKEERTHANA", gender: "F" as const },
  { rollNo: "23SS1A0540", name: "MALOTH SINDHUSHA", gender: "F" as const },
  { rollNo: "23SS1A0541", name: "MARA NIVEDITHA", gender: "F" as const },
  { rollNo: "23SS1A0542", name: "MUDAVATH RAJESH", gender: "M" as const },
  { rollNo: "23SS1A0543", name: "MULA VARSHITH REDDY", gender: "M" as const },
  { rollNo: "23SS1A0544", name: "MUNJAM SAI KIRAN", gender: "M" as const },
  { rollNo: "23SS1A0545", name: "NAKKA BHARATH CHANDRA", gender: "M" as const },
  { rollNo: "23SS1A0546", name: "NIMMANAGOTI RAJARJESHWARI", gender: "F" as const },
  { rollNo: "23SS1A0547", name: "PAGIDIPALA KEERTHI", gender: "F" as const },
  { rollNo: "23SS1A0548", name: "PAMMI KOMALI KAVYA", gender: "F" as const },
  { rollNo: "23SS1A0549", name: "PAWAR AMRUTH", gender: "M" as const },
  { rollNo: "23SS1A0550", name: "PENDELA SUNNY", gender: "M" as const },
  { rollNo: "23SS1A0551", name: "RACHURI ANILKUMAR", gender: "M" as const },
  { rollNo: "23SS1A0552", name: "REKHANDAR SHARATH CHANDRA", gender: "M" as const },
  { rollNo: "23SS1A0553", name: "RENIKUNTA HARINI", gender: "F" as const },
  { rollNo: "23SS1A0554", name: "SARVANI LAXMI PRASANNA", gender: "F" as const },
  { rollNo: "23SS1A0555", name: "SHAIK ABBU SOFIYAN", gender: "M" as const },
  { rollNo: "23SS1A0556", name: "SHAIK AFREEN", gender: "F" as const },
  { rollNo: "23SS1A0557", name: "SILIVERU ABHILASH", gender: "M" as const },
  { rollNo: "23SS1A0558", name: "SUREPALLY UMA MAHESHWARI", gender: "F" as const },
  { rollNo: "23SS1A0559", name: "SURYAWANSHI LOKESH GIRISH", gender: "M" as const },
  { rollNo: "23SS1A0560", name: "THAGULLA HARSHITH SAIKUMAR", gender: "M" as const },
  { rollNo: "23SS1A0561", name: "THANGALLAPALLI RAHITHYA", gender: "F" as const },
  { rollNo: "23SS1A0562", name: "VADATHYA JAIRAM", gender: "M" as const },
  { rollNo: "23SS1A0563", name: "VADLA GOVARDHAN", gender: "M" as const },
  { rollNo: "23SS1A0564", name: "VAISHNAVI GURRAMKONDA", gender: "F" as const },
  { rollNo: "23SS1A0565", name: "VANARASI GOURI", gender: "F" as const },
  { rollNo: "23SS1A0566", name: "VETTI OOHA SRI", gender: "F" as const }
];

export const INITIAL_STUDENTS: StudentProfile[] = rawStudentsList.map((s, idx) => {
  const pcts = [92, 88, 95, 78, 84, 91, 68, 73, 96, 82, 89, 74, 90, 87, 85, 93];
  const overallPct = pcts[idx % pcts.length];

  return {
    rollNo: s.rollNo,
    name: s.name,
    gender: s.gender,
    department: "CSE",
    year: "IV Year",
    semester: "I Sem (7th)",
    section: "A",
    email: `${s.rollNo.toLowerCase()}@college.edu`,
    phone: `+91 ${9848000001 + idx}`,
    parentName: `Parent of ${s.name}`,
    parentPhone: `+91 ${9440000001 + idx}`,
    bloodGroup: idx % 4 === 0 ? "O+" : idx % 4 === 1 ? "A+" : idx % 4 === 2 ? "B+" : "AB+",
    address: "Hostel Block / Hyderabad, Telangana",
    dob: "2003-05-15",
    photo: AVATAR_PHOTOS[idx % AVATAR_PHOTOS.length],
    overallAttendancePct: overallPct
  };
});

export const INITIAL_FACULTY: FacultyProfile = {
  facultyId: "FAC-CSE-001",
  name: "Dr. K. Srinivas Rao",
  designation: "Professor & HOD",
  department: "Computer Science & Engineering",
  email: "faculty@college.edu",
  phone: "+91 98490 12345",
  office: "Room 401, CSE Block",
  experience: "18 Years",
  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  subjects: ["CS701PC — Cloud Computing", "CS702PC — AI & Machine Learning", "CS711PC — Cloud & AI/ML Lab"]
};

export const INITIAL_SUBJECTS: Subject[] = [
  { code: "CS701PC", name: "Cloud Computing", department: "CSE", year: "IV Year", semester: "I Sem (7th)", credits: 4 },
  { code: "CS702PC", name: "Artificial Intelligence & Machine Learning", department: "CSE", year: "IV Year", semester: "I Sem (7th)", credits: 4 },
  { code: "CS703PE", name: "DevOps & Microservices Architecture", department: "CSE", year: "IV Year", semester: "I Sem (7th)", credits: 3 },
  { code: "CS704PE", name: "Cyber Security & Cryptography", department: "CSE", year: "IV Year", semester: "I Sem (7th)", credits: 3 },
  { code: "CS705OE", name: "Full Stack Web Development", department: "CSE", year: "IV Year", semester: "I Sem (7th)", credits: 3 },
  { code: "CS711PC", name: "Cloud Computing & AI/ML Lab", department: "CSE", year: "IV Year", semester: "I Sem (7th)", credits: 2 },
  { code: "CS801PC", name: "Major Project / Dissertation", department: "CSE", year: "IV Year", semester: "II Sem (8th)", credits: 10 },
  { code: "CS802PE", name: "Big Data Analytics & Distributed Systems", department: "CSE", year: "IV Year", semester: "II Sem (8th)", credits: 3 }
];

export const HOUR_SLOTS = [
  { id: 1, label: "1st Hour (09:30 AM - 10:30 AM)" },
  { id: 2, label: "2nd Hour (10:30 AM - 11:30 AM)" },
  { id: 3, label: "3rd Hour (11:30 AM - 12:30 PM)" },
  { id: 4, label: "4th Hour (01:30 PM - 02:30 PM)" },
  { id: 5, label: "5th Hour (02:30 PM - 03:30 PM)" },
  { id: 6, label: "6th Hour (03:30 PM - 04:30 PM)" },
  { id: 7, label: "7th Hour (04:30 PM - 05:30 PM)" },
  { id: 8, label: "8th Hour (05:30 PM - 06:30 PM)" }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    title: '75% Mandatory Minimum Attendance Alert',
    message: 'Students falling below 75% attendance across R22 subjects are flagged for detention risk.',
    type: 'WARNING',
    targetRole: 'STUDENT',
    createdAt: new Date().toISOString()
  },
  {
    title: 'JNTUH R22 CSE IV Year Timetable Live',
    message: 'The Mid-1 examination schedules for 7th Semester CSE are uploaded to the Student Portal.',
    type: 'INFO',
    targetRole: 'ALL',
    createdAt: new Date().toISOString()
  },
  {
    title: 'Show Attendance PDF & Excel Exports Ready',
    message: 'Faculty can export PDF and Master Excel monthly breakdown registers directly from the portal.',
    type: 'SUCCESS',
    targetRole: 'FACULTY',
    createdAt: new Date().toISOString()
  }
];
