import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { CircularProgress } from '../../components/ui/CircularProgress';
import { INITIAL_STUDENTS, INITIAL_SUBJECTS, INITIAL_NOTIFICATIONS } from '../../services/mockData';
import { AlertOctagon, BookOpen, Calendar, CheckCircle2, Bell, TrendingUp, ShieldAlert, Award, Clock, ArrowRight, FileSpreadsheet, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const rollNo = user?.rollNo || '23SS1A0535';

  const student = INITIAL_STUDENTS.find((s) => s.rollNo === rollNo) || INITIAL_STUDENTS.find(s => s.rollNo === '23SS1A0535')!;
  const isDetentionRisk = student.overallAttendancePct < 75;

  const todayClasses = [
    { hour: '1st Hour (09:30 AM)', subject: 'Cloud Computing (CS701PC)', room: 'Room 401', status: 'Present', faculty: 'Dr. K. Srinivas Rao' },
    { hour: '2nd Hour (10:30 AM)', subject: 'AI & ML (CS702PC)', room: 'Room 401', status: 'Present', faculty: 'Dr. K. Srinivas Rao' },
    { hour: '3rd Hour (11:30 AM)', subject: 'DevOps & Microservices (CS703PE)', room: 'Room 401', status: 'Upcoming', faculty: 'Mrs. P. Anitha' },
    { hour: '4th Hour (01:30 PM)', subject: 'Full Stack Web Lab (CS711PC)', room: 'Lab 2', status: 'Upcoming', faculty: 'Mr. M. Rajesh' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Showcase */}
      <div className="relative rounded-3xl p-8 bg-gradient-to-r from-[#14171E] via-[#1F2633] to-[#14171E] border border-[#536878]/30 shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#536878]/20 text-[#E5E4E2] text-xs font-bold border border-[#536878]/40 uppercase tracking-wider">
              {student.department} • {student.year} ({student.semester})
            </div>
            <h1 className="text-4xl font-black text-[#E5E4E2] tracking-tight">
              Welcome back, {student.name} 👋
            </h1>
            <p className="text-xs text-[#C8C8D4] font-mono">
              Roll Number: <strong className="text-[#E5E4E2]">{student.rollNo}</strong> • Section A
            </p>
          </div>

          <div className="p-4 rounded-3xl bg-[#0A0A0A] border border-[#536878]/30 flex items-center gap-4 shadow-2xl">
            <CircularProgress percentage={student.overallAttendancePct} size={150} strokeWidth={14} />
          </div>
        </div>
      </div>

      {/* Dedicated Attendance Transcript & Report Export Section */}
      <GlassCard className="p-6 bg-[#14171E] border border-[#536878]/30 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30 uppercase tracking-wider">
              Student Attendance Transcript
            </span>
            <h3 className="text-xl font-black text-[#E5E4E2]">Official Attendance Reports & Excel Download</h3>
            <p className="text-xs text-[#C8C8D4]">
              Download your verified subject-by-subject attendance log for hall ticket clearance or scholarship records.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <GlassButton
              onClick={() => window.open(`/api/export/excel?rollNo=${student.rollNo}`, '_blank')}
              variant="secondary"
              size="md"
              icon={<FileSpreadsheet className="w-4 h-4 text-emerald-400" />}
            >
              Download Excel Log
            </GlassButton>
            <GlassButton
              onClick={() => window.open(`/api/export/pdf?rollNo=${student.rollNo}`, '_blank')}
              variant="primary"
              size="md"
              icon={<Download className="w-4 h-4" />}
            >
              Download PDF Report
            </GlassButton>
          </div>
        </div>
      </GlassCard>

      {/* Detention Warning Banner if < 75% */}
      {isDetentionRisk && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-3xl bg-gradient-to-r from-red-950/60 via-red-900/30 to-red-950/60 border border-red-500/40 shadow-xl flex items-start gap-4"
        >
          <div className="p-3 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/40 shrink-0 mt-0.5">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-red-300">DETENTION RISK WARNING — Mandatory Action</h4>
            <p className="text-xs text-[#E5E4E2] mt-1">
              Your overall attendance is currently at <strong className="text-red-400 font-bold">{student.overallAttendancePct}%</strong>, which is below the mandatory JNTUH R22 requirement of 75%. You must attend the next <strong className="text-white font-bold">6 consecutive hours</strong> to achieve eligibility.
            </p>
          </div>
        </motion.div>
      )}

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule & Attendance Status */}
        <GlassCard className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#536878]/20">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#536878]" />
              <h3 className="text-lg font-bold text-[#E5E4E2]">Today's Lectures & Labs</h3>
            </div>
            <span className="text-xs font-semibold text-[#C8C8D4]">Saturday, July 18, 2026</span>
          </div>

          <div className="space-y-3">
            {todayClasses.map((cls, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-[#0A0A0A] border border-[#536878]/20 hover:border-[#536878]/50 transition-all gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-[#536878]/20 text-[#E5E4E2] font-bold text-xs">
                    {cls.hour.split(' ')[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#E5E4E2]">{cls.subject}</h4>
                    <p className="text-xs text-[#C8C8D4] flex items-center gap-2 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#536878]" />
                      {cls.hour} • {cls.room} • {cls.faculty}
                    </p>
                  </div>
                </div>

                <span className={`px-3.5 py-1 text-xs font-bold rounded-full border ${
                  cls.status === 'Present'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-[#536878]/20 text-[#C8C8D4] border-[#536878]/30'
                }`}>
                  {cls.status}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* 30-Day Attendance Heatmap */}
        <GlassCard className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#536878]/20">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#536878]" />
              <h3 className="text-base font-bold text-[#E5E4E2]">30-Day Heatmap</h3>
            </div>
            <span className="text-xs text-[#C8C8D4]">Last 30 Days</span>
          </div>

          <div className="grid grid-cols-6 gap-2 pt-2">
            {Array.from({ length: 30 }, (_, idx) => {
              const isPresent = idx % 7 !== 2;
              return (
                <div
                  key={idx}
                  title={`Day ${idx + 1}: ${isPresent ? 'Present' : 'Absent'}`}
                  className={`h-9 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all ${
                    isPresent
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  Day {idx + 1}
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* JNTUH R22 CSE Subject Progress Cards */}
      <div>
        <h3 className="text-xl font-black text-[#E5E4E2] mb-4">JNTUH R22 Fourth Year Subject Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {INITIAL_SUBJECTS.map((sub, i) => {
            const pct = [93, 89, 72, 95, 88, 85, 96, 91][i % 8];
            const isSubLow = pct < 75;

            return (
              <GlassCard key={sub.code} glow={isSubLow} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#536878]/20 text-[#E5E4E2] text-[10px] font-extrabold border border-[#536878]/30">
                    {sub.code}
                  </span>
                  <span className={`text-sm font-black ${isSubLow ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {pct}%
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#E5E4E2] leading-tight">{sub.name}</h4>
                
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-[#0A0A0A] overflow-hidden border border-[#536878]/20">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isSubLow ? 'bg-rose-500' : 'bg-[#536878]'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-[#C8C8D4] pt-1 border-t border-[#536878]/20">
                  <span>Attended: <strong className="text-[#E5E4E2]">14/16</strong></span>
                  <span>Credits: <strong className="text-[#E5E4E2]">{sub.credits}</strong></span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};
