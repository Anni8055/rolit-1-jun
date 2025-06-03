import React from 'react';

interface CustomEyeIconProps {
  isOpen: boolean;
  isDarkTheme: boolean;
  className?: string;
}

const CustomEyeIcon: React.FC<CustomEyeIconProps> = ({ isOpen, isDarkTheme, className = 'h-5 w-5' }) => {
  const baseColor = isDarkTheme ? 'text-gray-300' : 'text-gray-700';
  const activeColor = isDarkTheme ? 'text-primary-400' : 'text-primary-600';
  const color = isOpen ? activeColor : baseColor;

  if (isOpen) {
    // Open eye with rays - visible password
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        className={`${className} ${color} transition-all duration-300`}
        aria-hidden="true"
      >
        {/* Eyelashes/Rays */}
        <path 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          d="M12 4.5V2.5M17.5 6.5L19 5M20.5 12H22.5M19 19L17.5 17.5M12 19.5V21.5M5 19L6.5 17.5M1.5 12H3.5M5 5L6.5 6.5" 
        />
        
        {/* Eye outline */}
        <path 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" 
        />
        
        {/* Iris */}
        <circle 
          cx="12" 
          cy="12" 
          r="4" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
        />
        
        {/* Pupil */}
        <circle 
          cx="12" 
          cy="12" 
          r="2" 
          fill="currentColor" 
        />
      </svg>
    );
  } else {
    // Closed eye - hidden password
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        className={`${className} ${color} transition-all duration-300`}
        aria-hidden="true"
      >
        {/* Closed eye with slash */}
        <path 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          d="M3 3l18 18M10.5 10.677a2 2 0 002.823 2.823" 
        />
        
        <path 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          d="M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6 1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 01-1.078 1.5" 
        />
      </svg>
    );
  }
};

export default CustomEyeIcon; 