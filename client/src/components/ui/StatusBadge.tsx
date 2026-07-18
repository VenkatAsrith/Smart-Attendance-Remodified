import React from 'react';
import { AttendanceStatus } from '../../types';

interface StatusBadgeProps {
  status: AttendanceStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const styles = {
    Present: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(34,197,94,0.2)]',
    Absent: 'bg-rose-500/15 text-rose-400 border-rose-500/30 shadow-[0_0_12px_rgba(239,68,68,0.2)]',
    Late: 'bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(250,204,21,0.2)]',
    'Medical Leave': 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30 shadow-[0_0_12px_rgba(124,92,252,0.2)]'
  };

  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs font-semibold' : 'px-3.5 py-1 text-xs font-bold';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md transition-all ${sizeClasses} ${styles[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${
        status === 'Present' ? 'bg-emerald-400' :
        status === 'Absent' ? 'bg-rose-400' :
        status === 'Late' ? 'bg-amber-300' : 'bg-indigo-400'
      }`} />
      {status}
    </span>
  );
};
