import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = false,
  hoverEffect = true,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={hoverEffect ? { y: -3, scale: 1.003 } : undefined}
      onClick={onClick}
      className={`relative rounded-3xl p-6 transition-all duration-300 ${
        glow ? 'bg-[#14171E] shadow-[0_0_35px_rgba(83,104,120,0.3)] border border-[#536878]/50' : 'glass-panel'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Subtle top light line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E5E4E2]/15 to-transparent rounded-t-3xl" />
      {children}
    </motion.div>
  );
};
