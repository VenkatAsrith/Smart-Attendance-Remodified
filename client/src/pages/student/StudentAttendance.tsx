import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { INITIAL_SUBJECTS } from '../../services/mockData';
import { Calendar, Clock, BookOpen, CheckCircle2 } from 'lucide-react';

export const StudentAttendance: React.FC = () => {
  const timetable = [
    { day: 'Monday', h1: 'Cloud Computing', h2: 'AI & ML', h3: 'DevOps', h4: 'Web Dev' },
    { day: 'Tuesday', h1: 'Cyber Security', h2: 'Big Data', h3: 'Cloud Computing', h4: 'AI & ML' },
    { day: 'Wednesday', h1: 'Web Dev', h2: 'DevOps', h3: 'Cyber Security', h4: 'Big Data' },
    { day: 'Thursday', h1: 'AI & ML', h2: 'Cloud Computing', h3: 'Big Data', h4: 'Cyber Security' },
    { day: 'Friday', h1: 'DevOps', h2: 'Web Dev', h3: 'AI & ML', h4: 'Cloud Computing' },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl font-black text-white gradient-text">Attendance & Weekly Timetable</h1>
        <p className="text-xs text-[#C8C8D4] mt-0.5">
          Detailed hour-by-hour weekly class schedule and attendance breakdown.
        </p>
      </div>

      {/* Timetable Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#A78BFA]" />
            <h3 className="text-base font-bold text-white gradient-text">Official 7th Sem Timetable</h3>
          </div>
          <span className="text-xs text-[#C8C8D4]">CSE Section A</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-[10px] font-extrabold uppercase tracking-wider text-[#A78BFA]">
                <th className="py-3 px-6">Day</th>
                <th className="py-3 px-6">Hour 1 (09:30-10:30)</th>
                <th className="py-3 px-6">Hour 2 (10:30-11:30)</th>
                <th className="py-3 px-6">Hour 3 (11:30-12:30)</th>
                <th className="py-3 px-6">Hour 4 (01:30-02:30)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {timetable.map((row) => (
                <tr key={row.day} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-6 font-bold text-white">{row.day}</td>
                  <td className="py-3 px-6 text-[#A78BFA] font-semibold">{row.h1}</td>
                  <td className="py-3 px-6 text-[#A78BFA] font-semibold">{row.h2}</td>
                  <td className="py-3 px-6 text-[#A78BFA] font-semibold">{row.h3}</td>
                  <td className="py-3 px-6 text-[#A78BFA] font-semibold">{row.h4}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
