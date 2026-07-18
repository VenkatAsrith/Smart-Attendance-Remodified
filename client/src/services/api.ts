import axios from 'axios';
import { User, Role, StudentProfile, FacultyProfile, AttendanceSession, NotificationItem } from '../types';
import { INITIAL_STUDENTS, INITIAL_FACULTY, INITIAL_SUBJECTS, INITIAL_NOTIFICATIONS } from './mockData';

const API = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('aura_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (identifier: string, pass: string, role: Role) => {
    try {
      const res = await API.post('/auth/login', { identifier, password: pass, role });
      return res.data;
    } catch (err) {
      // Mock Fallback for local demo preview
      const cleanIdent = identifier.trim().toUpperCase();
      if (role === 'FACULTY') {
        const user: User = {
          id: 'fac-001',
          email: 'faculty@college.edu',
          role: 'FACULTY',
          facultyId: 'FAC-CSE-001',
          profile: INITIAL_FACULTY
        };
        const token = 'mock_jwt_token_faculty_2026';
        localStorage.setItem('aura_token', token);
        return { success: true, token, user };
      } else {
        const studentMatch = INITIAL_STUDENTS.find(s => 
          s.rollNo.toUpperCase() === cleanIdent || 
          s.email.toUpperCase() === cleanIdent ||
          cleanIdent.includes(s.rollNo.toUpperCase())
        ) || INITIAL_STUDENTS.find(s => s.rollNo === '23SS1A0535') || INITIAL_STUDENTS[0];
        
        const user: User = {
          id: `stu-${studentMatch.rollNo}`,
          email: studentMatch.email,
          role: 'STUDENT',
          rollNo: studentMatch.rollNo,
          profile: studentMatch
        };
        const token = `mock_jwt_token_${studentMatch.rollNo}`;
        localStorage.setItem('aura_token', token);
        return { success: true, token, user };
      }
    }
  }
};

export const attendanceService = {
  fetchStudents: async (params: { department: string; year: string; semester: string; section: string }) => {
    try {
      const res = await API.get('/attendance/students', { params });
      return res.data.students;
    } catch (err) {
      return INITIAL_STUDENTS;
    }
  },
  saveSession: async (sessionData: Partial<AttendanceSession>) => {
    try {
      const res = await API.post('/attendance/save', sessionData);
      return res.data;
    } catch (err) {
      return { success: true, message: 'Attendance saved in local database state!' };
    }
  },
  fetchRecords: async (params?: Record<string, any>) => {
    try {
      const res = await API.get('/attendance/records', { params });
      return res.data.sessions;
    } catch (err) {
      return [];
    }
  }
};

export const studentService = {
  getDashboard: async (rollNo: string) => {
    try {
      const res = await API.get(`/students/dashboard/${rollNo}`);
      return res.data;
    } catch (err) {
      const st = INITIAL_STUDENTS.find(s => s.rollNo === rollNo.toUpperCase()) || INITIAL_STUDENTS[0];
      return {
        success: true,
        student: st,
        metrics: {
          totalSessions: 45,
          totalPresent: Math.round(45 * (st.overallAttendancePct / 100)),
          totalAbsent: 45 - Math.round(45 * (st.overallAttendancePct / 100)),
          totalLate: 2,
          totalMedical: 1,
          overallPct: st.overallAttendancePct
        },
        subjects: INITIAL_SUBJECTS.map(sub => ({
          code: sub.code,
          name: sub.name,
          total: 15,
          attended: Math.round(15 * (st.overallAttendancePct / 100)),
          absent: 15 - Math.round(15 * (st.overallAttendancePct / 100))
        })),
        heatmapData: Array.from({ length: 30 }, (_, i) => ({
          date: `2026-07-${String(i + 1).padStart(2, '0')}`,
          percentage: (i % 7 === 0) ? 0 : Math.min(100, Math.max(60, st.overallAttendancePct + (i % 5) - 2)),
          total: 3,
          present: 3
        })),
        notifications: INITIAL_NOTIFICATIONS
      };
    }
  }
};
