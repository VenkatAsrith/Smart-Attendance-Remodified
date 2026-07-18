import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassInput } from '../../components/ui/GlassInput';
import { GlassButton } from '../../components/ui/GlassButton';
import { Role } from '../../types';
import { Sparkles, Lock, Mail, UserCheck, KeyRound, Eye, EyeOff, ShieldCheck, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<Role>('FACULTY');
  const [email, setEmail] = useState('faculty@college.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'FACULTY') {
        navigate('/faculty/dashboard', { replace: true });
      } else {
        navigate('/student/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, role, navigate]);

  const handleRoleSwitch = (r: Role) => {
    setSelectedRole(r);
    setErrorMsg('');
    if (r === 'FACULTY') {
      setEmail('faculty@college.edu');
      setPassword('password123');
    } else {
      setEmail('23ss1a0535@college.edu');
      setPassword('password123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const success = await login(email, password, selectedRole);
      if (success) {
        if (selectedRole === 'FACULTY') {
          navigate('/faculty/dashboard', { replace: true });
        } else {
          navigate('/student/dashboard', { replace: true });
        }
      } else {
        setErrorMsg('Invalid credentials. Please verify your email/roll number and password.');
      }
    } catch (err) {
      setErrorMsg('Login service error. Please try demo triggers below.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-[#E5E4E2] flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden font-sans selection:bg-[#536878]/30 selection:text-white">
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#536878]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#536878]/10 rounded-full blur-3xl pointer-events-none" />

      {/* SPLIT SCREEN LAYOUT CONTAINER */}
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-4xl bg-[#14171E] border border-[#536878]/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* LEFT COLUMN: HERO SHOWCASE (5 Cols) */}
        <div className="lg:col-span-5 p-8 lg:p-12 bg-gradient-to-b from-[#1A1E27] via-[#14171E] to-[#0D0F14] border-r border-[#536878]/25 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            {/* Branding Header */}
            <div className="flex items-center gap-3">
              <div>
                <span className="text-2xl font-black tracking-wider text-[#E5E4E2]">Smart Attendance</span>
                <span className="ml-2 px-2.5 py-0.5 text-[9px] font-extrabold rounded-full bg-[#536878]/25 text-[#E5E4E2] border border-[#536878]/40 uppercase tracking-widest">
                  Beta(1.0)
                </span>
              </div>
            </div>

            {/* University Tagline */}
            <div className="space-y-3 pt-4">
              <span className="px-3.5 py-1 rounded-full bg-[#536878]/20 text-[#E5E4E2] text-xs font-bold border border-[#536878]/30 uppercase tracking-wider">
                JNTUH Sultanpur College of Engineering
              </span>
              <h2 className="text-3xl font-black text-[#E5E4E2] tracking-tight leading-tight">
                Attendance Management SaaS
              </h2>
              <p className="text-xs text-[#C8C8D4] leading-relaxed">
                Smart Attendance intelligence platform built for JNTUH R22 CSE 4th Year regulation schedules, hour-by-hour tracking, and verified register exports.
              </p>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="pt-8 border-t border-[#536878]/20 text-[11px] text-[#536878] font-mono">
            Developed for demonstration purposes only — not fully functional in production.
          </div>
        </div>

        {/* RIGHT COLUMN: LOGIN FORM (7 Cols) */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center space-y-6">
          
          {/* Header Title */}
          <div>
            <h3 className="text-2xl font-black text-[#E5E4E2] tracking-tight">Sign in to Portal</h3>
            <p className="text-xs text-[#C8C8D4] mt-1">
              Select your role and enter your institutional credentials to access your portal.
            </p>
          </div>

          {/* ROLE SELECTOR TABS (ROUNDED PILLS) */}
          <div className="p-1.5 rounded-2xl bg-[#0D0F14] border border-[#536878]/30 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleRoleSwitch('FACULTY')}
              className={`py-3 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                selectedRole === 'FACULTY'
                  ? 'bg-gradient-to-r from-[#536878] to-[#3B4D5B] text-[#E5E4E2] shadow-[0_0_20px_rgba(83,104,120,0.4)] border border-[#536878]/50'
                  : 'text-[#C8C8D4] hover:text-[#E5E4E2] hover:bg-white/5'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>FACULTY PORTAL</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSwitch('STUDENT')}
              className={`py-3 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                selectedRole === 'STUDENT'
                  ? 'bg-gradient-to-r from-[#536878] to-[#3B4D5B] text-[#E5E4E2] shadow-[0_0_20px_rgba(83,104,120,0.4)] border border-[#536878]/50'
                  : 'text-[#C8C8D4] hover:text-[#E5E4E2] hover:bg-white/5'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>STUDENT PORTAL</span>
            </button>
          </div>

          {/* ERROR FEEDBACK BANNER */}
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <GlassInput
              label={selectedRole === 'FACULTY' ? 'Faculty Email Address' : 'Student Email / Roll Number Email'}
              type="email"
              placeholder={selectedRole === 'FACULTY' ? 'faculty@college.edu' : '23ss1a0535@college.edu'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4 text-[#536878]" />}
              required
            />

            <div className="relative">
              <GlassInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<KeyRound className="w-4 h-4 text-[#536878]" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-[38px] text-[#536878] hover:text-[#E5E4E2] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs text-[#C8C8D4] pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#536878] bg-[#0D0F14] text-[#536878] focus:ring-0 cursor-pointer"
                />
                <span>Remember session</span>
              </label>
              <a href="#" className="font-semibold text-[#536878] hover:text-[#E5E4E2] transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <GlassButton
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              className="w-full mt-2"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              {loading ? 'Authenticating...' : `Sign in to ${selectedRole === 'FACULTY' ? 'Faculty Portal' : 'Student Portal'}`}
            </GlassButton>
          </form>

          {/* DEMO CREDENTIAL QUICK TRIGGERS */}
          <div className="pt-4 border-t border-[#536878]/20 space-y-2">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#536878]">Quick Demo Logins</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleRoleSwitch('FACULTY')}
                className="flex-1 p-2.5 rounded-xl bg-[#0D0F14] hover:bg-[#1A1E27] border border-[#536878]/25 text-left text-xs transition-all cursor-pointer"
              >
                <p className="font-bold text-[#E5E4E2]">Dr. K. Srinivas Rao (Faculty)</p>
                <p className="text-[10px] text-[#536878] font-mono">faculty@college.edu</p>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch('STUDENT')}
                className="flex-1 p-2.5 rounded-xl bg-[#0D0F14] hover:bg-[#1A1E27] border border-[#536878]/25 text-left text-xs transition-all cursor-pointer"
              >
                <p className="font-bold text-[#E5E4E2]">VENKAT ASRITH (Student)</p>
                <p className="text-[10px] text-[#536878] font-mono">23SS1A0535</p>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
