import React from 'react';

const Logo = ({ 
  width = 280, 
  height = 50, 
  className = "",
  animate = true 
}) => {
  return (
    <svg 
      viewBox="0 0 280 50" 
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
    >
      <defs>
        {/* Premium gradient for icon */}
        <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#FF6B6B", stopOpacity:1}} />
          <stop offset="25%" style={{stopColor:"#4ECDC4", stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:"#45B7D1", stopOpacity:1}} />
          <stop offset="75%" style={{stopColor:"#96CEB4", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#FFEAA7", stopOpacity:1}} />
        </linearGradient>
        
        {/* Text gradient */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor:"#2C3E50", stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:"#34495E", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#45B7D1", stopOpacity:1}} />
        </linearGradient>
        
        {/* Sophisticated shadow */}
        <filter id="premiumShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#45B7D1" floodOpacity="0.2"/>
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.1"/>
        </filter>
        
        {/* Glow effect */}
        <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Icon glow */}
        <filter id="iconGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Modern geometric icon */}
      <g transform="translate(8, 8)">
        {/* Main icon background */}
        <rect x="0" y="0" width="34" height="34" rx="8" fill="url(#premiumGradient)" filter="url(#premiumShadow)"/>
        
        {/* Creative layered design */}
        <g transform="translate(6, 6)">
          {/* Abstract writing/creativity symbol */}
          <path d="M2 18 Q8 12 14 8 Q18 6 22 8 Q20 12 16 16 Q12 20 8 22 Q4 20 2 18 Z" fill="white" opacity="0.9"/>
          <circle cx="18" cy="10" r="3" fill="white" opacity="0.8"/>
          <path d="M6 16 Q10 14 14 12 Q16 14 18 16" stroke="url(#premiumGradient)" strokeWidth="2" fill="none" opacity="0.7"/>
          
          {/* Modern accent dots */}
          <circle cx="4" cy="8" r="1" fill="white" opacity="0.7"/>
          <circle cx="20" cy="20" r="1" fill="white" opacity="0.7"/>
        </g>
        
        {/* Subtle outer glow */}
        <rect x="0" y="0" width="34" height="34" rx="8" fill="none" stroke="url(#premiumGradient)" strokeWidth="1" opacity="0.3" filter="url(#iconGlow)"/>
      </g>
      
      {/* Premium typography */}
      <g transform="translate(55, 0)">
        <text x="0" y="32" fontFamily="'SF Pro Display', 'Helvetica Neue', Arial, sans-serif" fontSize="24" fontWeight="700" fill="url(#textGradient)" filter="url(#textGlow)">
          Blog<tspan fontWeight="400">wana</tspan>
        </text>
        
        {/* Sophisticated underline */}
        <rect x="0" y="37" width="45" height="2" rx="1" fill="url(#premiumGradient)" opacity="0.6">
          {animate && (
            <animate attributeName="width" values="45;55;45" dur="3s" repeatCount="indefinite"/>
          )}
        </rect>
      </g>
      
      {/* Modern decorative elements */}
      <g transform="translate(200, 15)">
        {/* Floating geometric shapes */}
        <circle cx="0" cy="0" r="2" fill="#FF6B6B" opacity="0.6">
          {animate && (
            <animate attributeName="cy" values="0;-3;0" dur="2s" repeatCount="indefinite"/>
          )}
        </circle>
        <rect x="15" y="5" width="4" height="4" rx="1" fill="#4ECDC4" opacity="0.5" transform="rotate(45 17 7)">
          {animate && (
            <animateTransform attributeName="transform" type="rotate" values="45 17 7;90 17 7;45 17 7" dur="3s" repeatCount="indefinite"/>
          )}
        </rect>
        <circle cx="30" cy="10" r="1.5" fill="#45B7D1" opacity="0.7">
          {animate && (
            <animate attributeName="r" values="1.5;2;1.5" dur="2.5s" repeatCount="indefinite"/>
          )}
        </circle>
        
        {/* Modern connecting line */}
        <path d="M-140 5 Q-80 3 -20 5" stroke="url(#premiumGradient)" strokeWidth="1" fill="none" opacity="0.4">
          {animate && (
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite"/>
          )}
        </path>
      </g>
      
      {/* Subtle background accent */}
      <ellipse cx="140" cy="25" rx="100" ry="15" fill="url(#premiumGradient)" opacity="0.05"/>
    </svg>
  );
};

export default Logo;