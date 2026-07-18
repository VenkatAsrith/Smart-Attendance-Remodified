import React, { useState } from 'react';
import { API_BASE_URL } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { Bell, LogOut, Search, Sparkles, ChevronRight, User as UserIcon, FileSpreadsheet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const GlassNavbar: React.FC = () => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumbText = pathParts
    .map((p) => p.replace('-', ' ').toUpperCase())
    .join(' / ');

  return (
    <header className="sticky top-0 z-40 w-full px-6 py-3.5 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#536878]/25">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Branding & Breadcrumbs */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-xl font-black tracking-wider text-[#E5E4E2]">Smart Attendance</span>
              <span className="ml-2 px-2.5 py-0.5 text-[9px] font-extrabold rounded-full bg-[#536878]/25 text-[#E5E4E2] border border-[#536878]/40 uppercase tracking-widest">
                Beta v1.0
              </span>
            </div>
          </div>

          {/* Breadcrumb Path */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[#C8C8D4] pl-4 border-l border-[#536878]/25">
            <span className="font-semibold text-[#C8C8D4]/70">JNTUH Sultanpur</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#536878]" />
            <span className="font-mono font-bold text-[#E5E4E2]">{breadcrumbText || 'DASHBOARD'}</span>
          </div>
        </div>

        {/* Center Global Search Bar */}
        <div className="flex-1 max-w-sm hidden sm:block">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#536878]" />
            <input
              type="text"
              placeholder="Search students, roll numbers, subjects..."
              className="w-full pl-10 pr-4 py-2 text-xs text-[#E5E4E2] placeholder-[#C8C8D4]/40 rounded-2xl glass-input bg-[#0D0F14] border border-[#536878]/25 focus:border-[#536878]"
            />
          </div>
        </div>

        {/* Right Actions & User Avatar */}
        <div className="flex items-center gap-3">
          {role === 'FACULTY' && (
            <button
              onClick={() => window.open(`${API_BASE_URL}/export/excel?department=CSE&year=IV Year&section=A`, '_blank')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.2)]"
              title="Download Full Master Excel Register"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Download Excel</span>
            </button>
          )}

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-2xl bg-[#14171E] hover:bg-[#1A1E27] text-[#E5E4E2] border border-[#536878]/25 transition-all cursor-pointer"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#536878] animate-ping" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#536878]" />
            </button>

            {/* Notification Dropdown Popover */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 rounded-3xl p-4 glass-panel border border-[#536878]/40 shadow-2xl bg-[#14171E] z-50 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#536878]/25">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5E4E2]">Notifications</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">2 Unread</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
                      <p className="font-bold text-amber-300">75% Attendance Mandatory Notice</p>
                      <p className="text-[#C8C8D4] text-[11px] mt-0.5">Students below 75% overall attendance are flagged for detention risk.</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#536878]/15 border border-[#536878]/30 text-xs">
                      <p className="font-bold text-[#E5E4E2]">JNTUH R22 CSE Timetable Live</p>
                      <p className="text-[#C8C8D4] text-[11px] mt-0.5">IV Year I Sem schedules & lab hours are active.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 pl-2 cursor-pointer focus:outline-none"
            >
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-[#E5E4E2] leading-none">
                  {user?.profile?.name || (role === 'FACULTY' ? 'Dr. K. Srinivas Rao' : 'KONAM VENKAT ASRITH')}
                </p>
                <p className="text-[10px] text-[#536878] font-mono font-bold mt-0.5">
                  {role === 'FACULTY' ? 'Faculty Portal' : `Roll: ${user?.rollNo || '23SS1A0535'}`}
                </p>
              </div>
              <div className="h-10 w-10 rounded-2xl overflow-hidden border border-[#536878]/50 shadow-[0_0_15px_rgba(83,104,120,0.3)]">
                <img
                  src={user?.profile?.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 rounded-3xl p-3 glass-panel border border-[#536878]/40 shadow-2xl bg-[#14171E] z-50 space-y-1 text-xs"
                >
                  <div className="p-3 rounded-2xl bg-[#0D0F14] border border-[#536878]/25 mb-2">
                    <p className="font-bold text-[#E5E4E2] leading-none">{user?.profile?.name || 'User Profile'}</p>
                    <p className="text-[10px] text-[#536878] font-mono mt-1">{user?.email || 'user@college.edu'}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
