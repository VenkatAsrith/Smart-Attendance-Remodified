export type Role = 'FACULTY' | 'STUDENT' | 'ADMIN';

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Medical Leave';

export interface User {
  id: string;
  email: string;
  role: Role;
  rollNo?: string;
  facultyId?: string;
  profile?: StudentProfile | FacultyProfile;
}

export interface StudentProfile {
  _id?: string;
  rollNo: string;
  name: string;
  department: string;
  year: string;
  semester: string;
  section: string;
  email: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  bloodGroup: string;
  address: string;
  dob: string;
  photo: string;
  gender: 'M' | 'F';
  overallAttendancePct: number;
}

export interface FacultyProfile {
  _id?: string;
  facultyId: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  experience: string;
  photo: string;
  subjects: string[];
}

export interface Subject {
  code: string;
  name: string;
  department: string;
  year: string;
  semester: string;
  credits: number;
}

export interface AttendanceRecordItem {
  studentId?: string;
  rollNo: string;
  name?: string;
  status: AttendanceStatus;
  remarks?: string;
}

export interface AttendanceSession {
  _id?: string;
  date: string;
  hour: number;
  department: string;
  year: string;
  semester: string;
  section: string;
  subjectCode: string;
  subjectName?: string;
  facultyId: string;
  facultyName?: string;
  records: AttendanceRecordItem[];
}

export interface NotificationItem {
  _id?: string;
  title: string;
  message: string;
  type: 'WARNING' | 'INFO' | 'SUCCESS' | 'ALERT';
  targetRole: 'ALL' | 'FACULTY' | 'STUDENT';
  read?: boolean;
  createdAt: string;
}
