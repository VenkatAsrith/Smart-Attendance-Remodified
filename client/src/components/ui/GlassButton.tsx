import React from 'react';
import { motion } from 'framer-motion';

interface GlassButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-medium rounded-xl gap-1.5',
    md: 'px-5 py-2.5 text-sm font-semibold rounded-2xl gap-2',
    lg: 'px-7 py-3.5 text-base font-bold rounded-2xl gap-2.5',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#536878] to-[#3B4D5B] text-[#E5E4E2] shadow-[0_0_20px_rgba(83,104,120,0.35)] hover:shadow-[0_0_30px_rgba(83,104,120,0.5)] border border-[#536878]/40',
    secondary: 'bg-[#14171E] hover:bg-[#1A1E27] text-[#E5E4E2] border border-[#536878]/30',
    danger: 'bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] border border-red-500/30',
    success: 'bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white shadow-[0_0_20px_rgba(34,197,94,0.3)] border border-green-500/30',
    ghost: 'bg-transparent hover:bg-white/5 text-[#C8C8D4] hover:text-[#E5E4E2]',
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      disabled={disabled}
      className={`inline-flex items-center justify-center transition-all duration-200 focus:outline-none ${sizeClasses[size]} ${variantClasses[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      {...props}
    >
      {icon && <span className="inline-block">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
