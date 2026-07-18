import React, { useState } from 'react';
import { API_BASE_URL } from '../../services/api';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { StatCard } from '../../components/ui/StatCard';
import { INITIAL_STUDENTS, INITIAL_SUBJECTS } from '../../services/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { FileSpreadsheet, FileText, Filter, Download, Award, AlertTriangle, Users, BookOpen } from 'lucide-react';

export const ShowAttendance: React.FC = () => {
  const [department, setDepartment] = useState('CSE');
  const [year, setYear] = useState('IV Year');
  const [section, setSection] = useState('A');
  const [subjectFilter, setSubjectFilter] = useState('ALL');

  const pieData = [
    { name: 'Present', value: 88, color: '#22C55E' },
    { name: 'Absent', value: 8, color: '#EF4444' },
    { name: 'Late', value: 3, color: '#FACC15' },
    { name: 'Medical', value: 1, color: '#536878' },
  ];

  const subjectData = INITIAL_SUBJECTS.map((sub, i) => ({
    name: sub.code,
    fullName: sub.name,
    attendance: [92, 88, 84, 95, 90, 89, 94, 86][i % 8]
  }));

  const trendData = [
    { date: 'Jul 01', pct: 94 },
    { date: 'Jul 04', pct: 89 },
    { date: 'Jul 07', pct: 91 },
    { date: 'Jul 10', pct: 85 },
    { date: 'Jul 13', pct: 92 },
    { date: 'Jul 16', pct: 88 },
    { date: 'Jul 18', pct: 90 },
  ];

  const handleExportExcel = () => {
    window.open(`${API_BASE_URL}/export/excel?department=${department}&year=${year}&section=${section}`, '_blank');
  };

  const handleExportPDF = () => {
    window.open(`${API_BASE_URL}/export/pdf?department=${department}&year=${year}&section=${section}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header & Export Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#536878]/20">
        <div>
          <h1 className="text-3xl font-black text-[#E5E4E2] tracking-tight">Show Attendance & Analytics</h1>
          <p className="text-xs text-[#C8C8D4] mt-0.5">
            JNTUH R22 CSE IV Year Multi-dimensional analytics, trend charts, and verified PDF/Excel register exports.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <GlassButton onClick={handleExportExcel} variant="secondary" size="md" icon={<FileSpreadsheet className="w-4 h-4 text-emerald-400" />}>
            Export Excel Register
          </GlassButton>
          <GlassButton onClick={handleExportPDF} variant="primary" size="md" icon={<FileText className="w-4 h-4 text-[#E5E4E2]" />}>
            Export PDF Summary
          </GlassButton>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Class Attendance Rate"
          value="88.4%"
          subtitle="JNTUH R22 CSE IV Year A"
          icon={<Award className="w-6 h-6" />}
          trend="+2.4% vs last week"
          trendUp
        />
        <StatCard
          title="Total Students"
          value="66 Enrolled"
          subtitle="Roll: 23SS1A0501 - 566"
          icon={<Users className="w-6 h-6" />}
          trend="100% Active"
          trendUp
        />
        <StatCard
          title="Detention Risks"
          value="2 Students"
          subtitle="Overall Attendance < 75%"
          icon={<AlertTriangle className="w-6 h-6" />}
          trend="Flagged for Warning"
          trendUp={false}
        />
        <StatCard
          title="Total Sessions"
          value="48 Sessions"
          subtitle="Lectures & Labs Conducted"
          icon={<BookOpen className="w-6 h-6" />}
          trend="Verified in DB"
          trendUp
        />
      </div>

      {/* Filter Bar */}
      <GlassCard className="flex flex-wrap items-center gap-4 p-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#536878]" />
          <span className="text-xs font-bold text-[#E5E4E2] uppercase tracking-wider">Filters:</span>
        </div>
        <div>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="rounded-xl bg-[#0D0F14] border border-[#536878]/25 text-xs py-2 px-3 text-[#E5E4E2] focus:outline-none focus:border-[#536878]">
            <option value="CSE" className="bg-[#14171E]">CSE</option>
            <option value="ECE" className="bg-[#14171E]">ECE</option>
          </select>
        </div>
        <div>
          <select value={year} onChange={(e) => setYear(e.target.value)} className="rounded-xl bg-[#0D0F14] border border-[#536878]/25 text-xs py-2 px-3 text-[#E5E4E2] focus:outline-none focus:border-[#536878]">
            <option value="IV Year" className="bg-[#14171E]">IV Year</option>
            <option value="III Year" className="bg-[#14171E]">III Year</option>
          </select>
        </div>
        <div>
          <select value={section} onChange={(e) => setSection(e.target.value)} className="rounded-xl bg-[#0D0F14] border border-[#536878]/25 text-xs py-2 px-3 text-[#E5E4E2] focus:outline-none focus:border-[#536878]">
            <option value="A" className="bg-[#14171E]">Section A</option>
            <option value="B" className="bg-[#14171E]">Section B</option>
          </select>
        </div>
        <div>
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="rounded-xl bg-[#0D0F14] border border-[#536878]/25 text-xs py-2 px-3 text-[#E5E4E2] focus:outline-none focus:border-[#536878]">
            <option value="ALL" className="bg-[#14171E]">All Subjects</option>
            {INITIAL_SUBJECTS.map((s) => (
              <option key={s.code} value={s.code} className="bg-[#14171E]">{s.code} - {s.name}</option>
            ))}
          </select>
        </div>
      </GlassCard>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <GlassCard className="space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#536878]">Attendance Status Ratio</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#14171E', borderColor: '#536878', borderRadius: '16px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2 border-t border-[#536878]/20">
            {pieData.map((p) => (
              <div key={p.name} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-[#C8C8D4]">{p.name}: <strong className="text-[#E5E4E2]">{p.value}%</strong></span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Bar Chart */}
        <GlassCard className="space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#536878]">R22 Subject Comparison</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData}>
                <XAxis dataKey="name" stroke="#C8C8D4" fontSize={9} />
                <YAxis domain={[50, 100]} stroke="#C8C8D4" fontSize={9} />
                <Tooltip contentStyle={{ background: '#14171E', borderColor: '#536878', borderRadius: '16px', color: '#fff' }} />
                <Bar dataKey="attendance" fill="#536878" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Area Chart */}
        <GlassCard className="space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#536878]">Daily Attendance Trend</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorPct" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#536878" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#536878" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#C8C8D4" fontSize={9} />
                <YAxis domain={[70, 100]} stroke="#C8C8D4" fontSize={9} />
                <Tooltip contentStyle={{ background: '#14171E', borderColor: '#536878', borderRadius: '16px', color: '#fff' }} />
                <Area type="monotone" dataKey="pct" stroke="#536878" strokeWidth={3} fillOpacity={1} fill="url(#colorPct)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Student Master Register Table */}
      <GlassCard className="p-0 overflow-hidden border border-[#536878]/25">
        <div className="p-4 border-b border-[#536878]/25 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#E5E4E2]">Student Attendance Master Register</h3>
          <span className="text-xs font-semibold text-[#536878]">Showing 66 Students</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#536878]/25 bg-[#0D0F14] text-[10px] font-extrabold uppercase tracking-wider text-[#536878]">
                <th className="py-3.5 px-6">Roll Number</th>
                <th className="py-3.5 px-6">Student Name</th>
                <th className="py-3.5 px-6">Department</th>
                <th className="py-3.5 px-6">Overall %</th>
                <th className="py-3.5 px-6">Detention Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#536878]/15 font-medium">
              {INITIAL_STUDENTS.map((st) => (
                <tr key={st.rollNo} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-6 font-mono font-bold text-[#536878]">{st.rollNo}</td>
                  <td className="py-3 px-6 font-bold text-[#E5E4E2]">{st.name}</td>
                  <td className="py-3 px-6 text-[#C8C8D4]">{st.department}</td>
                  <td className="py-3 px-6 font-bold text-[#E5E4E2]">{st.overallAttendancePct}%</td>
                  <td className="py-3 px-6">
                    {st.overallAttendancePct < 75 ? (
                      <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        DETENTION RISK
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ELIGIBLE
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
