import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GlassNavbar } from './components/common/GlassNavbar';
import { Sidebar } from './components/common/Sidebar';

import { Login } from './pages/auth/Login';

import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { FacultyAttendance } from './pages/faculty/FacultyAttendance';
import { ShowAttendance } from './pages/faculty/ShowAttendance';
import { FacultyProfile } from './pages/faculty/FacultyProfile';

import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentAttendance } from './pages/student/StudentAttendance';
import { StudentReports } from './pages/student/StudentReports';
import { StudentProfile } from './pages/student/StudentProfile';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#E5E4E2]">
      <GlassNavbar />
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex gap-6">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <footer className="py-4 text-center text-xs text-[#536878] border-t border-[#536878]/20 font-mono">
        Developed for demonstration purposes only — not fully functional in production.
      </footer>
    </div>
  );
};

const RootRedirect: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return role === 'FACULTY' ? <Navigate to="/faculty/dashboard" replace /> : <Navigate to="/student/dashboard" replace />;
};

export const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Faculty Portal Routes */}
      <Route path="/faculty/dashboard" element={<ProtectedLayout><FacultyDashboard /></ProtectedLayout>} />
      <Route path="/faculty/attendance" element={<ProtectedLayout><FacultyAttendance /></ProtectedLayout>} />
      <Route path="/faculty/show-attendance" element={<ProtectedLayout><ShowAttendance /></ProtectedLayout>} />
      <Route path="/faculty/profile" element={<ProtectedLayout><FacultyProfile /></ProtectedLayout>} />

      {/* Student Portal Routes */}
      <Route path="/student/dashboard" element={<ProtectedLayout><StudentDashboard /></ProtectedLayout>} />
      <Route path="/student/attendance" element={<ProtectedLayout><StudentAttendance /></ProtectedLayout>} />
      <Route path="/student/reports" element={<ProtectedLayout><StudentReports /></ProtectedLayout>} />
      <Route path="/student/profile" element={<ProtectedLayout><StudentProfile /></ProtectedLayout>} />

      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
