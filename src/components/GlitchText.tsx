import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-neon-magenta opacity-0 group-hover:opacity-70 group-hover:animate-[glitch_0.2s_infinite] translate-x-[-2px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 text-neon-cyan opacity-0 group-hover:opacity-70 group-hover:animate-[glitch_0.3s_infinite] translate-x-[2px]">
        {text}
      </span>
    </div>
  );
};
