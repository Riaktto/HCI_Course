import React from 'react';

interface UM6PLogoProps {
  variant?: 'full' | 'compact' | 'icon';
  theme?: 'color' | 'charcoal' | 'white';
  className?: string;
}

export const UM6PLogo: React.FC<UM6PLogoProps> = ({
  variant = 'full',
  theme = 'color',
  className = 'h-9',
}) => {
  const orange = theme === 'white' ? '#FFFFFF' : '#D7492A';
  const lightOrange = theme === 'white' ? '#FFFFFF' : '#ED6E47';
  const darkOrange = theme === 'white' ? '#FFFFFF' : '#B83519';
  const textPrimary = theme === 'white' ? '#FFFFFF' : theme === 'charcoal' ? '#2D2D2E' : '#2D2D2E';
  const textSub = theme === 'white' ? 'rgba(255,255,255,0.85)' : '#6E6D70';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* UM6P Authentic Geometric Polygonal Tree / Diamond Emblem */}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full aspect-square flex-shrink-0"
      >
        {/* Central stem / core axis */}
        <polygon points="60,108 55,75 65,75" fill={darkOrange} />
        <polygon points="60,75 56,48 64,48" fill={orange} />
        <polygon points="60,48 57,20 63,20" fill={lightOrange} />

        {/* Top facet */}
        <polygon points="60,8 70,24 60,20 50,24" fill={orange} />

        {/* Upper lateral branch facets */}
        <polygon points="50,24 60,20 57,38 38,32" fill={lightOrange} opacity="0.95" />
        <polygon points="70,24 60,20 63,38 82,32" fill={darkOrange} />
        
        {/* Mid-upper canopy facets */}
        <polygon points="38,32 57,38 56,54 26,46" fill={orange} />
        <polygon points="82,32 63,38 64,54 94,46" fill={lightOrange} />

        {/* Mid canopy facets */}
        <polygon points="26,46 56,54 55,70 18,62" fill={darkOrange} />
        <polygon points="94,46 64,54 65,70 102,62" fill={orange} />

        {/* Lower canopy facets */}
        <polygon points="18,62 55,70 54,86 28,82" fill={orange} />
        <polygon points="102,62 65,70 66,86 92,82" fill={darkOrange} />

        {/* Base foundation facets */}
        <polygon points="28,82 54,86 55,98 40,102" fill={lightOrange} />
        <polygon points="92,82 66,86 65,98 80,102" fill={orange} />
      </svg>

      {/* Wordmark and Typography */}
      {variant !== 'icon' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span
              className="text-2xl lg:text-3xl font-bold tracking-tight font-sans-body"
              style={{ color: textPrimary, letterSpacing: '-0.03em' }}
            >
              UM<span style={{ color: orange }}>6</span>P
            </span>
          </div>

          {variant === 'full' && (
            <span
              className="text-[9px] lg:text-[10px] font-semibold tracking-wider uppercase font-sans-body leading-tight mt-0.5"
              style={{ color: textSub, letterSpacing: '0.08em' }}
            >
              UNIVERSITÉ MOHAMMED VI POLYTECHNIQUE
            </span>
          )}
        </div>
      )}
    </div>
  );
};
