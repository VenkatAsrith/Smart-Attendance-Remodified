import React from 'react';
import { GlassCard } from './GlassCard';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendUp
}) => {
  return (
    <GlassCard hoverEffect glow className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-[#C8C8D4]">{title}</p>
        <h3 className="text-3xl font-extrabold text-white tracking-tight gradient-text">{value}</h3>
        {subtitle && <p className="text-xs text-white/60">{subtitle}</p>}
        {trend && (
          <p className={`text-xs font-semibold flex items-center gap-1 ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            <span>{trendUp ? '↑' : '↓'}</span> {trend}
          </p>
        )}
      </div>
      <div className="p-3.5 rounded-2xl bg-[#7C5CFC]/15 text-[#A78BFA] border border-[#7C5CFC]/30 shadow-[0_0_20px_rgba(124,92,252,0.2)]">
        {icon}
      </div>
    </GlassCard>
  );
};
