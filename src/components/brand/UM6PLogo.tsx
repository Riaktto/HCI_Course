import React from 'react';

interface UM6PLogoProps {
  variant?: 'full' | 'compact' | 'icon';
  theme?: 'color' | 'charcoal' | 'white';
  className?: string;
}

export const UM6PLogo: React.FC<UM6PLogoProps> = ({
  variant = 'full',
  theme = 'color',
  className = 'h-10',
}) => {
  // Official UM6P Red-Orange from branding
  const orange = theme === 'white' ? '#FFFFFF' : '#E5391C';
  const letterColor = theme === 'white' ? '#E5391C' : '#FFFFFF';
  const textDark = theme === 'white' ? '#FFFFFF' : theme === 'charcoal' ? '#222222' : '#222222';

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Official UM6P 4-Block Square Emblems: [ U ] [ M ] [ 6 ] [ P ] */}
      <svg
        viewBox="0 0 158 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full aspect-[158/36] flex-shrink-0"
      >
        {/* Block 1: U */}
        <rect x="0" y="0" width="36" height="36" rx="3.5" fill={orange} />
        <text
          x="18"
          y="26"
          fill={letterColor}
          fontSize="24"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', Montserrat, sans-serif"
          textAnchor="middle"
          letterSpacing="-0.02em"
        >
          U
        </text>

        {/* Block 2: M */}
        <rect x="40.5" y="0" width="36" height="36" rx="3.5" fill={orange} />
        <text
          x="58.5"
          y="26"
          fill={letterColor}
          fontSize="24"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', Montserrat, sans-serif"
          textAnchor="middle"
          letterSpacing="-0.02em"
        >
          M
        </text>

        {/* Block 3: 6 */}
        <rect x="81" y="0" width="36" height="36" rx="3.5" fill={orange} />
        <text
          x="99"
          y="26.5"
          fill={letterColor}
          fontSize="25"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', Montserrat, sans-serif"
          textAnchor="middle"
        >
          6
        </text>

        {/* Block 4: P */}
        <rect x="121.5" y="0" width="36" height="36" rx="3.5" fill={orange} />
        <text
          x="139.5"
          y="26"
          fill={letterColor}
          fontSize="24"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', Montserrat, sans-serif"
          textAnchor="middle"
          letterSpacing="-0.02em"
        >
          P
        </text>
      </svg>

      {/* Institutional Typography only on full variant */}
      {variant === 'full' && (
        <div
          className="flex flex-col justify-between leading-none h-full py-0.5"
          style={{ color: textDark }}
        >
          <span className="text-[11px] lg:text-[12px] font-bold tracking-wide font-sans-body">
            University
          </span>
          <span className="text-[11px] lg:text-[12px] font-bold tracking-wide font-sans-body">
            Mohammed VI
          </span>
          <span className="text-[11px] lg:text-[12px] font-bold tracking-wide font-sans-body text-[#E5391C]">
            Polytechnic
          </span>
        </div>
      )}
    </div>
  );
};
