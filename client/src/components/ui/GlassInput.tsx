import React from 'react';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  label,
  icon,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#C8C8D4]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-[#A78BFA] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`w-full rounded-2xl py-3 text-sm text-white placeholder-white/30 glass-input ${
            icon ? 'pl-11 pr-4' : 'px-4'
          } ${error ? 'border-red-500 focus:border-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
    </div>
  );
};
