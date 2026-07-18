import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { useAuth } from '../../context/AuthContext';
import { FileText, FileSpreadsheet, Download, ShieldCheck } from 'lucide-react';

export const StudentReports: React.FC = () => {
  const { user } = useAuth();
  const rollNo = user?.rollNo || '23SS1A0535';

  const handleDownloadPDF = () => {
    window.open(`/api/export/pdf?rollNo=${rollNo}`, '_blank');
  };

  const handleDownloadExcel = () => {
    window.open(`/api/export/excel?rollNo=${rollNo}`, '_blank');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="pb-4 border-b border-white/10 text-center sm:text-left">
        <h1 className="text-2xl font-black text-white gradient-text">Download Official Attendance Reports</h1>
        <p className="text-xs text-[#C8C8D4] mt-0.5">
          Generate digitally verified attendance transcripts for hall ticket clearance or scholarship applications.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <GlassCard glow className="p-6 text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-[#7C5CFC]/20 text-[#A78BFA] border border-[#7C5CFC]/40 flex items-center justify-center">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Official PDF Transcript</h3>
            <p className="text-xs text-[#C8C8D4] mt-1">Includes subject breakdown, total hours attended, and eligibility stamp.</p>
          </div>
          <GlassButton onClick={handleDownloadPDF} variant="primary" className="w-full" icon={<Download className="w-4 h-4" />}>
            Download PDF Report
          </GlassButton>
        </GlassCard>

        <GlassCard glow className="p-6 text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Excel Register Export</h3>
            <p className="text-xs text-[#C8C8D4] mt-1">Structured spreadsheet format containing day-wise status records.</p>
          </div>
          <GlassButton onClick={handleDownloadExcel} variant="secondary" className="w-full" icon={<Download className="w-4 h-4" />}>
            Download Excel Spreadsheet
          </GlassButton>
        </GlassCard>
      </div>
    </div>
  );
};
