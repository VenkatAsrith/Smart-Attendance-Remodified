import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassInput } from '../../components/ui/GlassInput';
import { CircularProgress } from '../../components/ui/CircularProgress';
import { INITIAL_FACULTY } from '../../services/mockData';
import { User, Mail, Phone, Building, Briefcase, Award, CheckCircle, Save, Upload } from 'lucide-react';

export const FacultyProfile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(INITIAL_FACULTY);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
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
      {/* Page Title */}
      <div className="pb-2 border-b border-[#536878]/20">
        <h1 className="text-3xl font-black text-[#E5E4E2] tracking-tight">Faculty Profile & Teaching Portfolio</h1>
        <p className="text-xs text-[#C8C8D4] mt-0.5">
          Official Faculty Credentials, Departmental Designation, and Assigned R22 Subjects.
        </p>
      </div>

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT COLUMN — Avatar, Cloudinary Upload, Completion Gauge & Quick Stats */}
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
              <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-[#536878]/20 text-[#E5E4E2] border border-[#536878]/30 uppercase tracking-wider">
                {profile.facultyId}
              </span>
              <h3 className="text-xl font-extrabold text-[#E5E4E2] mt-2">{profile.name}</h3>
              <p className="text-xs font-semibold text-[#C8C8D4]">{profile.designation} • {profile.department}</p>
              <p className="text-[11px] text-[#C8C8D4]/70 mt-1">{profile.office} • Exp: {profile.experience}</p>
            </div>

            {/* Profile Completion Gauge */}
            <div className="pt-4 border-t border-[#536878]/20 flex flex-col items-center">
              <p className="text-[11px] font-extrabold uppercase text-[#536878] mb-2">Faculty Dossier Status</p>
              <CircularProgress percentage={95} size={130} strokeWidth={10} sublabel="Verified HOD" />
            </div>
          </GlassCard>

          {/* Assigned R22 Subjects Card */}
          <GlassCard className="p-4 space-y-3 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-[#536878]">Assigned R22 Subjects</h4>
            {profile.subjects.map((sub, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#0D0F14] border border-[#536878]/20 text-[#E5E4E2] font-semibold flex items-center justify-between">
                <span>{sub}</span>
                <span className="text-[10px] text-emerald-400 font-bold">Active</span>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* RIGHT COLUMN — Editable Information Glass Form */}
        <GlassCard className="lg:col-span-2">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-lg font-bold text-[#E5E4E2] pb-2 border-b border-[#536878]/20">
              Faculty Profile Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <GlassInput
                label="Full Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                icon={<User className="w-4 h-4 text-[#536878]" />}
              />
              <GlassInput
                label="Designation"
                value={profile.designation}
                onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                icon={<Briefcase className="w-4 h-4 text-[#536878]" />}
              />
              <GlassInput
                label="Email Address"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                icon={<Mail className="w-4 h-4 text-[#536878]" />}
              />
              <GlassInput
                label="Phone Number"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                icon={<Phone className="w-4 h-4 text-[#536878]" />}
              />
              <GlassInput
                label="Office Location"
                value={profile.office}
                onChange={(e) => setProfile({ ...profile, office: e.target.value })}
                icon={<Building className="w-4 h-4 text-[#536878]" />}
              />
              <GlassInput
                label="Teaching Experience"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                icon={<Award className="w-4 h-4 text-[#536878]" />}
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              {saved && (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Profile Updated Successfully!
                </span>
              )}
              <GlassButton type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
                Save Faculty Profile
              </GlassButton>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};
