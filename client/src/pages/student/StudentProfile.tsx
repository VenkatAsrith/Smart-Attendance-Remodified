import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassInput } from '../../components/ui/GlassInput';
import { CircularProgress } from '../../components/ui/CircularProgress';
import { INITIAL_STUDENTS } from '../../services/mockData';
import { User, Mail, Phone, MapPin, Calendar, Heart, Shield, CheckCircle, Save, Upload } from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const rollNo = user?.rollNo || '23SS1A0535';

  const defaultStudent = INITIAL_STUDENTS.find((s) => s.rollNo === rollNo) || INITIAL_STUDENTS[0];
  const [profile, setProfile] = useState(defaultStudent);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fields = [profile.name, profile.email, profile.phone, profile.parentName, profile.parentPhone, profile.bloodGroup, profile.address, profile.dob, profile.photo];
  const filledCount = fields.filter(f => f && f.trim() !== '').length;
  const completionPct = Math.round((filledCount / fields.length) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCloudinaryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      setTimeout(() => {
        const fakeUrl = URL.createObjectURL(e.target.files![0]);
        setProfile({ ...profile, photo: fakeUrl });
        setUploading(false);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Title */}
      <div className="pb-2 border-b border-[#536878]/20">
        <h1 className="text-3xl font-black text-[#E5E4E2] tracking-tight">Student Profile Management</h1>
        <p className="text-xs text-[#C8C8D4] mt-0.5">
          JNTUH R22 Academic Identity, Contact Info, and Guardian Verification.
        </p>
      </div>

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <GlassCard glow className="text-center p-6 space-y-4">
            {/* Avatar & Cloudinary Upload */}
            <div className="relative mx-auto h-32 w-32 rounded-3xl overflow-hidden border-2 border-[#536878] shadow-2xl group">
              <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
              <label className="absolute inset-0 bg-[#0A0A0A]/75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-bold text-[#E5E4E2]">
                <Upload className="w-5 h-5 mb-1 text-[#536878]" />
                {uploading ? 'Uploading...' : 'Upload Photo'}
                <input type="file" accept="image/*" onChange={handleCloudinaryUpload} className="hidden" />
              </label>
            </div>

            <div>
              <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-[#536878]/20 text-[#E5E4E2] border border-[#536878]/30">
                {profile.rollNo}
              </span>
              <h3 className="text-xl font-extrabold text-[#E5E4E2] mt-2">{profile.name}</h3>
              <p className="text-xs font-semibold text-[#C8C8D4]">{profile.department} • {profile.year} ({profile.semester})</p>
              <p className="text-[11px] text-[#C8C8D4]/70 mt-1">JNTUH Sultanpur College of Engineering</p>
            </div>

            {/* Profile Completion Ring */}
            <div className="pt-4 border-t border-[#536878]/20 flex flex-col items-center">
              <p className="text-[11px] font-extrabold uppercase text-[#536878] mb-2">Profile Verification Status</p>
              <CircularProgress percentage={completionPct} size={130} strokeWidth={10} sublabel="Profile Complete" />
            </div>
          </GlassCard>

          {/* Quick Academic Summary */}
          <GlassCard className="p-4 space-y-3 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-[#536878]">Academic Status</h4>
            <div className="flex justify-between py-1 border-b border-[#536878]/20">
              <span className="text-[#C8C8D4]">Overall Attendance:</span>
              <strong className={profile.overallAttendancePct < 75 ? 'text-rose-400' : 'text-emerald-400'}>
                {profile.overallAttendancePct}%
              </strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[#536878]/20">
              <span className="text-[#C8C8D4]">Eligibility Status:</span>
              <strong className={profile.overallAttendancePct < 75 ? 'text-rose-400' : 'text-emerald-400'}>
                {profile.overallAttendancePct < 75 ? 'DETENTION RISK' : 'HALL TICKET ELIGIBLE'}
              </strong>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#C8C8D4]">Section & Campus:</span>
              <strong className="text-[#E5E4E2]">Section A • Sultanpur</strong>
            </div>
          </GlassCard>
        </div>

        {/* RIGHT COLUMN — Editable Information Glass Form */}
        <GlassCard className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-bold text-[#E5E4E2] pb-2 border-b border-[#536878]/20">
              Personal & Guardian Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <GlassInput
                label="Full Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                icon={<User className="w-4 h-4 text-[#536878]" />}
              />
              <GlassInput
                label="Email Address"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                icon={<Mail className="w-4 h-4 text-[#536878]" />}
              />
              <GlassInput
                label="Student Contact Number"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                icon={<Phone className="w-4 h-4 text-[#536878]" />}
              />
              <GlassInput
                label="Parent / Guardian Name"
                value={profile.parentName}
                onChange={(e) => setProfile({ ...profile, parentName: e.target.value })}
                icon={<Shield className="w-4 h-4 text-[#536878]" />}
              />
              <GlassInput
                label="Parent Contact Number"
                value={profile.parentPhone}
                onChange={(e) => setProfile({ ...profile, parentPhone: e.target.value })}
                icon={<Phone className="w-4 h-4 text-[#536878]" />}
              />
              <GlassInput
                label="Blood Group"
                value={profile.bloodGroup}
                onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                icon={<Heart className="w-4 h-4 text-[#536878]" />}
              />
              <GlassInput
                label="Date of Birth"
                type="date"
                value={profile.dob}
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                icon={<Calendar className="w-4 h-4 text-[#536878]" />}
              />
              <GlassInput
                label="Residential Address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                icon={<MapPin className="w-4 h-4 text-[#536878]" />}
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              {saved && (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Profile Updated Successfully!
                </span>
              )}
              <GlassButton type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
                Save Profile Changes
              </GlassButton>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};
