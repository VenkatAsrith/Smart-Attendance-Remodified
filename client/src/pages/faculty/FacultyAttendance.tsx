import React, { useState, useEffect } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassInput } from '../../components/ui/GlassInput';
import { GlassModal } from '../../components/ui/GlassModal';
import { StudentProfile, AttendanceStatus } from '../../types';
import { INITIAL_STUDENTS, INITIAL_SUBJECTS, HOUR_SLOTS } from '../../services/mockData';
import { attendanceService } from '../../services/api';
import { CheckCircle2, XCircle, Clock, Search, Filter, Save, RefreshCw, CheckCheck, BookOpen, UserCheck, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FacultyAttendance: React.FC = () => {
  const [department, setDepartment] = useState('CSE');
  const [year, setYear] = useState('IV Year');
  const [semester, setSemester] = useState('Semester I (7th)');
  const [section, setSection] = useState('A');
  const [subjectCode, setSubjectCode] = useState('CS701PC');
  const [facultyName, setFacultyName] = useState('Dr. K. Srinivas Rao');
  const [hourId, setHourId] = useState<number>(3);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const [students, setStudents] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, { status: AttendanceStatus; remarks: string }>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const initialMap: Record<string, { status: AttendanceStatus; remarks: string }> = {};
    INITIAL_STUDENTS.forEach((st) => {
      initialMap[st.rollNo] = { status: 'Present', remarks: '' };
    });
    setAttendanceMap(initialMap);
  }, []);

  const selectedSubject = INITIAL_SUBJECTS.find((s) => s.code === subjectCode) || INITIAL_SUBJECTS[0];
  const selectedHourSlot = HOUR_SLOTS.find((h) => h.id === hourId) || HOUR_SLOTS[2];

  const handleStatusChange = (rollNo: string, newStatus: AttendanceStatus) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [rollNo]: { ...prev[rollNo], status: newStatus }
    }));
  };

  const handleRemarksChange = (rollNo: string, remarks: string) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [rollNo]: { ...prev[rollNo], remarks }
    }));
  };

  const markAll = (status: AttendanceStatus) => {
    const updatedMap = { ...attendanceMap };
    students.forEach((st) => {
      updatedMap[st.rollNo] = { ...updatedMap[st.rollNo], status };
    });
    setAttendanceMap(updatedMap);
  };

  const resetAll = () => {
    markAll('Present');
  };

  const totalCount = students.length;
  const presentCount = Object.values(attendanceMap).filter((r) => r.status === 'Present').length;
  const absentCount = Object.values(attendanceMap).filter((r) => r.status === 'Absent').length;
  const lateCount = Object.values(attendanceMap).filter((r) => r.status === 'Late').length;
  const medicalCount = Object.values(attendanceMap).filter((r) => r.status === 'Medical Leave').length;
  const attendancePct = totalCount > 0 ? Math.round(((presentCount + lateCount) / totalCount) * 100) : 0;

  const filteredStudents = students.filter((st) => {
    const matchesQuery = st.name.toLowerCase().includes(searchQuery.toLowerCase()) || st.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const currentStatus = attendanceMap[st.rollNo]?.status || 'Present';
    const matchesStatus = statusFilter === 'ALL' || currentStatus === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleSave = async () => {
    setSaving(true);
    const recordsPayload = Object.entries(attendanceMap).map(([rollNo, item]) => {
      const student = students.find((s) => s.rollNo === rollNo);
      return {
        rollNo,
        name: student?.name || '',
        status: item.status,
        remarks: item.remarks
      };
    });

    await attendanceService.saveSession({
      date,
      hour: hourId,
      department: 'Computer Science & Engineering',
      year,
      semester,
      section,
      subjectCode,
      subjectName: selectedSubject.name,
      facultyId: 'FAC-CSE-001',
      facultyName,
      records: recordsPayload
    });

    setSaving(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-[#536878]/20">
        <div>
          <h1 className="text-3xl font-black text-[#E5E4E2] tracking-tight">Mark Attendance Board</h1>
          <p className="text-xs text-[#C8C8D4] mt-0.5">
            JNTUH R22 CSE IV Year Attendance Operations & Session Register.
          </p>
        </div>
      </div>

      {/* TOP FILTER SECTION */}
      <GlassCard className="p-5 space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#E5E4E2] flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#536878]" /> Academic Session Controls
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#C8C8D4] mb-1">Department</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full rounded-xl bg-[#0D0F14] border border-[#536878]/25 text-xs py-2 px-2 text-[#E5E4E2] focus:outline-none focus:border-[#536878]">
              <option value="CSE" className="bg-[#14171E]">CSE</option>
              <option value="ECE" className="bg-[#14171E]">ECE</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#C8C8D4] mb-1">Year</label>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full rounded-xl bg-[#0D0F14] border border-[#536878]/25 text-xs py-2 px-2 text-[#E5E4E2] focus:outline-none focus:border-[#536878]">
              <option value="IV Year" className="bg-[#14171E]">IV Year</option>
              <option value="III Year" className="bg-[#14171E]">III Year</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#C8C8D4] mb-1">Semester</label>
            <select value={semester} onChange={(e) => setSemester(e.target.value)} className="w-full rounded-xl bg-[#0D0F14] border border-[#536878]/25 text-xs py-2 px-2 text-[#E5E4E2] focus:outline-none focus:border-[#536878]">
              <option value="Semester I (7th)" className="bg-[#14171E]">Semester I (7th)</option>
              <option value="Semester II (8th)" className="bg-[#14171E]">Semester II (8th)</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#C8C8D4] mb-1">Section</label>
            <select value={section} onChange={(e) => setSection(e.target.value)} className="w-full rounded-xl bg-[#0D0F14] border border-[#536878]/25 text-xs py-2 px-2 text-[#E5E4E2] focus:outline-none focus:border-[#536878]">
              <option value="A" className="bg-[#14171E]">Section A</option>
              <option value="B" className="bg-[#14171E]">Section B</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#C8C8D4] mb-1">Subject & Code</label>
            <select value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} className="w-full rounded-xl bg-[#0D0F14] border border-[#536878]/25 text-xs py-2 px-2 text-[#E5E4E2] focus:outline-none focus:border-[#536878]">
              {INITIAL_SUBJECTS.map((s) => (
                <option key={s.code} value={s.code} className="bg-[#14171E]">
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#C8C8D4] mb-1">Faculty</label>
            <input
              type="text"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
              className="w-full rounded-xl bg-[#0D0F14] border border-[#536878]/25 text-xs py-2 px-2 text-[#E5E4E2] focus:outline-none focus:border-[#536878]"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#C8C8D4] mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl bg-[#0D0F14] border border-[#536878]/25 text-xs py-2 px-2 text-[#E5E4E2] focus:outline-none focus:border-[#536878]"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#C8C8D4] mb-1">Hour Selector</label>
            <select value={hourId} onChange={(e) => setHourId(Number(e.target.value))} className="w-full rounded-xl bg-[#0D0F14] border border-[#536878]/25 text-xs py-2 px-2 text-[#E5E4E2] font-bold focus:outline-none focus:border-[#536878]">
              {HOUR_SLOTS.map((h) => (
                <option key={h.id} value={h.id} className="bg-[#14171E]">
                  {h.id}th Hour ({h.label.split('(')[1]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </GlassCard>

      {/* SESSION METADATA CARD */}
      <GlassCard className="p-6 bg-[#14171E] border border-[#536878]/40 shadow-xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
          <div className="border-r border-[#536878]/20 pr-2">
            <p className="text-[10px] font-extrabold uppercase text-[#536878]">Department</p>
            <p className="text-xs font-bold text-[#E5E4E2] mt-1">Computer Science & Eng.</p>
          </div>
          <div className="border-r border-[#536878]/20 pr-2">
            <p className="text-[10px] font-extrabold uppercase text-[#536878]">Academic Year</p>
            <p className="text-xs font-bold text-[#E5E4E2] mt-1">{year}</p>
          </div>
          <div className="border-r border-[#536878]/20 pr-2">
            <p className="text-[10px] font-extrabold uppercase text-[#536878]">Semester</p>
            <p className="text-xs font-bold text-[#E5E4E2] mt-1">{semester}</p>
          </div>
          <div className="border-r border-[#536878]/20 pr-2">
            <p className="text-[10px] font-extrabold uppercase text-[#536878]">Section</p>
            <p className="text-xs font-bold text-[#E5E4E2] mt-1">Section {section}</p>
          </div>
          <div className="border-r border-[#536878]/20 pr-2">
            <p className="text-[10px] font-extrabold uppercase text-[#536878]">Subject & Code</p>
            <p className="text-xs font-bold text-[#E5E4E2] mt-1">{selectedSubject.name} ({selectedSubject.code})</p>
          </div>
          <div className="border-r border-[#536878]/20 pr-2">
            <p className="text-[10px] font-extrabold uppercase text-[#536878]">Faculty</p>
            <p className="text-xs font-bold text-[#E5E4E2] mt-1">{facultyName}</p>
          </div>
          <div className="border-r border-[#536878]/20 pr-2">
            <p className="text-[10px] font-extrabold uppercase text-[#536878]">Date</p>
            <p className="text-xs font-bold text-[#E5E4E2] mt-1">{date}</p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase text-[#536878]">Selected Hour</p>
            <p className="text-xs font-bold text-emerald-400 mt-1">{selectedHourSlot.label}</p>
          </div>
        </div>
      </GlassCard>

      {/* KPI METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-[#14171E] border border-[#536878]/25 text-center">
          <p className="text-[10px] font-extrabold uppercase text-[#C8C8D4]">Total Enrolled</p>
          <p className="text-2xl font-black text-[#E5E4E2] mt-1">{totalCount}</p>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center">
          <p className="text-[10px] font-extrabold uppercase text-emerald-400">Present 🟢</p>
          <p className="text-2xl font-black text-emerald-400 mt-1">{presentCount}</p>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-center">
          <p className="text-[10px] font-extrabold uppercase text-rose-400">Absent 🔴</p>
          <p className="text-2xl font-black text-rose-400 mt-1">{absentCount}</p>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-center">
          <p className="text-[10px] font-extrabold uppercase text-amber-300">Late 🟡</p>
          <p className="text-2xl font-black text-amber-300 mt-1">{lateCount}</p>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 text-center">
          <p className="text-[10px] font-extrabold uppercase text-indigo-300">Medical 🔵</p>
          <p className="text-2xl font-black text-indigo-300 mt-1">{medicalCount}</p>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-[#536878]/20 border border-[#536878]/40 text-center shadow-[0_0_20px_rgba(83,104,120,0.3)]">
          <p className="text-[10px] font-extrabold uppercase text-[#E5E4E2]">Session Ratio</p>
          <p className="text-2xl font-black text-[#E5E4E2] mt-1">{attendancePct}%</p>
        </motion.div>
      </div>

      {/* TABLE SEARCH & FILTER */}
      <GlassCard className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <GlassInput
            icon={<Search className="w-4 h-4 text-[#536878]" />}
            placeholder="Search student name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-extrabold text-[#536878] uppercase tracking-wider">Filter:</span>
          {['ALL', 'Present', 'Absent', 'Late', 'Medical Leave'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#536878] text-[#E5E4E2] shadow-[0_0_15px_rgba(83,104,120,0.4)]'
                  : 'bg-[#0D0F14] text-[#C8C8D4] hover:text-[#E5E4E2]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* ATTENDANCE TABLE */}
      <GlassCard className="p-0 overflow-hidden border border-[#536878]/25 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#536878]/25 bg-[#0D0F14] text-[11px] font-extrabold uppercase tracking-wider text-[#536878]">
                <th className="py-4 px-6">Photo</th>
                <th className="py-4 px-6">Roll Number</th>
                <th className="py-4 px-6">Student Name</th>
                <th className="py-4 px-6 text-center">Attendance Status Pills</th>
                <th className="py-4 px-6">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#536878]/15 text-sm font-medium">
              {filteredStudents.map((student) => {
                const currentRecord = attendanceMap[student.rollNo] || { status: 'Present', remarks: '' };

                return (
                  <tr key={student.rollNo} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-6">
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="h-10 w-10 rounded-2xl object-cover border border-[#536878]/30 shadow-md"
                      />
                    </td>
                    <td className="py-3.5 px-6 font-mono font-bold text-[#E5E4E2]">{student.rollNo}</td>
                    <td className="py-3.5 px-6 font-bold text-[#E5E4E2]">
                      {student.name}
                      {student.overallAttendancePct < 75 && (
                        <span className="ml-2.5 px-2 py-0.5 text-[9px] font-extrabold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          Risk ({student.overallAttendancePct}%)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.rollNo, 'Present')}
                          className={`px-3 py-1.5 rounded-2xl text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                            currentRecord.status === 'Present'
                              ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.5)] border border-emerald-400/40 scale-105'
                              : 'bg-[#0D0F14] text-[#C8C8D4]/60 hover:text-[#E5E4E2] hover:bg-[#1A1E27]'
                          }`}
                        >
                          🟢 Present
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.rollNo, 'Absent')}
                          className={`px-3 py-1.5 rounded-2xl text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                            currentRecord.status === 'Absent'
                              ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-rose-400/40 scale-105'
                              : 'bg-[#0D0F14] text-[#C8C8D4]/60 hover:text-[#E5E4E2] hover:bg-[#1A1E27]'
                          }`}
                        >
                          🔴 Absent
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.rollNo, 'Late')}
                          className={`px-3 py-1.5 rounded-2xl text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                            currentRecord.status === 'Late'
                              ? 'bg-amber-500 text-white shadow-[0_0_20px_rgba(250,204,21,0.5)] border border-amber-400/40 scale-105'
                              : 'bg-[#0D0F14] text-[#C8C8D4]/60 hover:text-[#E5E4E2] hover:bg-[#1A1E27]'
                          }`}
                        >
                          🟡 Late
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.rollNo, 'Medical Leave')}
                          className={`px-3 py-1.5 rounded-2xl text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                            currentRecord.status === 'Medical Leave'
                              ? 'bg-[#536878] text-white shadow-[0_0_20px_rgba(83,104,120,0.5)] border border-[#536878]/40 scale-105'
                              : 'bg-[#0D0F14] text-[#C8C8D4]/60 hover:text-[#E5E4E2] hover:bg-[#1A1E27]'
                          }`}
                        >
                          🔵 Medical
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      <input
                        type="text"
                        placeholder="Optional remarks..."
                        value={currentRecord.remarks}
                        onChange={(e) => handleRemarksChange(student.rollNo, e.target.value)}
                        className="w-full bg-[#0D0F14] border border-[#536878]/25 rounded-xl px-3 py-1.5 text-xs text-[#E5E4E2] placeholder-[#C8C8D4]/30 focus:outline-none focus:border-[#536878]"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* FLOATING ACTION BAR FOR BULK ACTIONS */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-3 rounded-3xl bg-[#14171E] border border-[#536878]/40 shadow-2xl backdrop-blur-2xl flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2">
            <GlassButton
              type="button"
              onClick={() => markAll('Present')}
              variant="secondary"
              size="sm"
              icon={<CheckCheck className="w-4 h-4 text-emerald-400" />}
            >
              All Present
            </GlassButton>
            <GlassButton
              type="button"
              onClick={() => markAll('Absent')}
              variant="secondary"
              size="sm"
              icon={<XCircle className="w-4 h-4 text-rose-400" />}
            >
              All Absent
            </GlassButton>
            <GlassButton
              type="button"
              onClick={resetAll}
              variant="ghost"
              size="sm"
              icon={<RefreshCw className="w-3.5 h-3.5 text-[#C8C8D4]" />}
            >
              Reset
            </GlassButton>
          </div>

          <GlassButton
            type="button"
            onClick={handleSave}
            disabled={saving}
            variant="primary"
            size="md"
            icon={<Save className="w-4 h-4" />}
          >
            {saving ? 'Recording Session...' : 'Save Attendance Session'}
          </GlassButton>
        </motion.div>
      </div>

      {/* SUCCESS CONFIRMATION MODAL */}
      <GlassModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Attendance Session Saved 🎉"
      >
        <div className="text-center space-y-4 py-4">
          <div className="mx-auto h-20 w-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-2xl">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-[#E5E4E2]">Attendance Saved to Database</h4>
            <p className="text-xs text-[#C8C8D4] mt-1">
              Session for <span className="font-bold text-[#536878]">{selectedSubject.name} ({selectedSubject.code})</span> on <span className="font-bold text-[#E5E4E2]">{date} ({selectedHourSlot.label})</span> is committed to MongoDB.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#0D0F14] border border-[#536878]/25 text-xs flex justify-around">
            <div>
              <p className="text-[#C8C8D4]">Present</p>
              <p className="text-lg font-black text-emerald-400">{presentCount}</p>
            </div>
            <div>
              <p className="text-[#C8C8D4]">Absent</p>
              <p className="text-lg font-black text-rose-400">{absentCount}</p>
            </div>
            <div>
              <p className="text-[#C8C8D4]">Attendance %</p>
              <p className="text-lg font-black text-[#536878]">{attendancePct}%</p>
            </div>
          </div>
          <GlassButton onClick={() => setShowSuccessModal(false)} variant="primary" className="w-full">
            Done & Return to Roster
          </GlassButton>
        </div>
      </GlassModal>
    </div>
  );
};
