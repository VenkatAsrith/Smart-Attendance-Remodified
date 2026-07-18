import React from 'react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  sublabel?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 180,
  strokeWidth = 14,
  sublabel = 'Overall Attendance'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isLow = percentage < 75;
  const strokeColor = isLow ? '#EF4444' : '#22C55E';
  const glowColor = isLow ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)';

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90 drop-shadow-lg">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 12px ${glowColor})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-4xl font-extrabold tracking-tight ${isLow ? 'text-rose-400' : 'text-emerald-400'}`}
        >
          {percentage}%
        </motion.span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C8C8D4] mt-1">
          {sublabel}
        </span>
      </div>
    </div>
  );
};
