import React from 'react';

interface LogoIconProps {
  size?: number;
  className?: string;
}

export default function LogoIcon({ size = 48, className = '' }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-amber-400 select-none ${className}`}
    >
      {/* Dynamic ambient golden glow behind the logo */}
      <defs>
        <radialGradient id="gold-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50%" cy="50%" r="45%" fill="url(#gold-glow)" />

      {/* Stylized building paths matching the golden line-art logo */}
      {/* Left building */}
      <path
        d="M 28 80 L 28 45 L 38 48"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tallest building in the center-left */}
      <path
        d="M 38 80 L 38 38 C 38 32, 42 28, 48 26 L 56 18 L 56 80"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Medium-tall building in the center-right */}
      <path
        d="M 48 80 L 48 58 C 48 54, 50 51, 55 50 L 62 48"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rightmost building */}
      <path
        d="M 55 80 L 55 50 C 55 50, 58 49, 62 48 L 72 45 L 72 80"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Base line for stability */}
      <line
        x1="22"
        y1="80"
        x2="78"
        y2="80"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
