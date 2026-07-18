import React from 'react';
import { API_BASE_URL } from '../../services/api';
import { GlassCard } from '../../components/ui/GlassCard';
import { StatCard } from '../../components/ui/StatCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Users, AlertTriangle, Clock, Calendar, ArrowRight, Award, BookOpen, FileSpreadsheet } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export const FacultyDashboard: React.FC = () => {
  const navigate = useNavigate();

  const classData = [
    { hour: '1st Hour', subject: 'Cloud Computing (CS701PC)', room: 'Room 401', status: 'Completed', time: '09:30 AM - 10:30 AM' },
    { hour: '2nd Hour', subject: 'AI & Machine Learning (CS702PC)', room: 'Room 401', status: 'Pending', time: '10:30 AM - 11:30 AM' },
    { hour: '4th Hour', subject: 'Cloud & AI/ML Lab (CS711PC)', room: 'Lab 2', status: 'Scheduled', time: '01:30 PM - 02:30 PM' },
  ];

  const chartData = [
    { subject: 'Cloud Comp', attendance: 92 },
    { subject: 'AI & ML', attendance: 88 },
    { subject: 'DevOps', attendance: 84 },
    { subject: 'Cyber Sec', attendance: 95 },
    { subject: 'Web Dev', attendance: 90 },
    { subject: 'Big Data', attendance: 86 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="relative rounded-3xl p-8 bg-gradient-to-r from-[#14171E] via-[#1F2633] to-[#14171E] border border-[#536878]/30 shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#536878]/20 text-[#E5E4E2] text-xs font-bold border border-[#536878]/40 uppercase tracking-wider">
                Active Session — JNTUH R22 CSE IV Year
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#E5E4E2] tracking-tight">
              Welcome back, Dr. K. Srinivas Rao 👋
            </h1>
            <p className="text-sm text-[#C8C8D4] mt-1 max-w-xl">
              Overview of today's R22 lecture schedule, class attendance statistics, and pending sessions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <GlassButton
              onClick={() => window.open(`${API_BASE_URL}/export/excel?department=CSE&year=IV Year&section=A`, '_blank')}
              variant="secondary"
              size="lg"
              icon={<FileSpreadsheet className="w-5 h-5 text-emerald-400" />}
            >
              Download Class Excel
            </GlassButton>
            <GlassButton
              onClick={() => navigate('/faculty/attendance')}
              variant="primary"
              size="lg"
              icon={<CheckSquare className="w-5 h-5" />}
            >
              Mark Attendance Now
            </GlassButton>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Today's Sessions"
          value="3 Classes"
          subtitle="CSE IV Year Sec A"
          icon={<BookOpen className="w-6 h-6" />}
          trend="1 Remaining"
          trendUp
        />
        <StatCard
          title="Total Students"
          value="66 Enrolled"
          subtitle="Roll: 23SS1A0501 - 566"
          icon={<Users className="w-6 h-6" />}
          trend="100% Verified"
          trendUp
        />
        <StatCard
          title="Class Average"
          value="88.4%"
          subtitle="Monthly Attendance Rate"
          icon={<Award className="w-6 h-6" />}
          trend="+3.2% vs last month"
          trendUp
        />
        <StatCard
          title="Detention Risk"
          value="2 Students"
          subtitle="Attendance < 75%"
          icon={<AlertTriangle className="w-6 h-6" />}
          trend="Action required"
          trendUp={false}
        />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <GlassCard className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#536878]/20">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#536878]" />
              <h3 className="text-lg font-bold text-[#E5E4E2]">Today's Class Schedule</h3>
            </div>
            <span className="text-xs text-[#C8C8D4] font-semibold">Saturday, July 18, 2026</span>
          </div>

          <div className="space-y-3">
            {classData.map((cls, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-[#0A0A0A] border border-[#536878]/20 hover:border-[#536878]/50 transition-all gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-[#536878]/20 text-[#E5E4E2] font-bold text-xs">
                    {cls.hour}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#E5E4E2]">{cls.subject}</h4>
                    <p className="text-xs text-[#C8C8D4] flex items-center gap-2 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#536878]" />
                      {cls.time} • {cls.room}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                    cls.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : cls.status === 'Pending'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-[#536878]/20 text-[#C8C8D4] border-[#536878]/30'
                  }`}>
                    {cls.status}
                  </span>
                  {cls.status === 'Pending' && (
                    <GlassButton
                      size="sm"
                      onClick={() => navigate('/faculty/attendance')}
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Take
                    </GlassButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Quick Subject Breakdown Chart */}
        <GlassCard className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#536878]/20">
            <h3 className="text-lg font-bold text-[#E5E4E2]">Subject Analytics</h3>
            <span className="text-xs text-[#C8C8D4]">Avg %</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="subject" stroke="#C8C8D4" fontSize={10} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#C8C8D4" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#14171E', borderColor: '#536878', borderRadius: '16px', color: '#fff' }}
                />
                <Bar dataKey="attendance" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#536878' : '#8397A7'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
