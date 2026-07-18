import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, CheckSquare, BarChart3, UserCheck, Calendar, FileText, User, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Sidebar: React.FC = () => {
  const { role } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const facultyNav = [
    { label: 'Dashboard', path: '/faculty/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Mark Attendance', path: '/faculty/attendance', icon: <CheckSquare className="w-5 h-5" /> },
    { label: 'Show Attendance', path: '/faculty/show-attendance', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Faculty Profile', path: '/faculty/profile', icon: <User className="w-5 h-5" /> },
  ];

  const studentNav = [
    { label: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Timetable', path: '/student/attendance', icon: <Calendar className="w-5 h-5" /> },
    { label: 'Reports', path: '/student/reports', icon: <FileText className="w-5 h-5" /> },
    { label: 'My Profile', path: '/student/profile', icon: <User className="w-5 h-5" /> },
  ];

  const navItems = role === 'FACULTY' ? facultyNav : studentNav;

  return (
    <aside className={`shrink-0 hidden md:block transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="sticky top-24 p-3 rounded-3xl glass-panel space-y-3 border border-[#536878]/25 shadow-xl bg-[#14171E]">
        {/* Collapse Toggle */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#536878]/25">
          {!collapsed && (
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E5E4E2]">
              {role === 'FACULTY' ? 'FACULTY PORTAL' : 'STUDENT PORTAL'}
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-xl bg-[#0D0F14] hover:bg-[#1A1E27] text-[#C8C8D4] hover:text-[#E5E4E2] transition-colors cursor-pointer ml-auto border border-[#536878]/20"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Triggers */}
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#536878] to-[#3B4D5B] text-[#E5E4E2] shadow-[0_0_20px_rgba(83,104,120,0.35)] border border-[#536878]/40'
                    : 'text-[#C8C8D4] hover:text-[#E5E4E2] hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="shrink-0">{item.icon}</span>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {isActive && !collapsed && (
                    <motion.span
                      layoutId="sidebarActivePill"
                      className="ml-auto h-2 w-2 rounded-full bg-[#E5E4E2] shadow-[0_0_8px_rgba(229,228,226,0.8)]"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};
