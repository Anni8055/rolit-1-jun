import React from 'react';

interface FloatingIconsProps {
  className?: string;
}

export default function FloatingIcons({ className = '' }: FloatingIconsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* AI Chip Icon */}
      <div className="absolute top-1/4 -left-4 animate-float opacity-20 dark:opacity-10">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 2H15C15.5523 2 16 2.44772 16 3V6H8V3C8 2.44772 8.44772 2 9 2Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 6H16V15C16 15.5523 15.5523 16 15 16H9C8.44772 16 8 15.5523 8 15V6Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 9H6C5.44772 9 5 9.44772 5 10V12C5 12.5523 5.44772 13 6 13H8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 9H18C18.5523 9 19 9.44772 19 10V12C19 12.5523 18.5523 13 18 13H16" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 16V19" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 19H14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 22.5H14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 9.5H14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 12.5H14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Connections Icon */}
      <div className="absolute bottom-1/3 right-10 animate-float opacity-20 dark:opacity-10" style={{ animationDelay: '1s' }}>
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 3C17.5523 3 18 3.44772 18 4V5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H18V8C18 8.55228 17.5523 9 17 9C16.4477 9 16 8.55228 16 8V7H15C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5H16V4C16 3.44772 16.4477 3 17 3Z" fill="currentColor" />
          <path d="M7 13C7.55228 13 8 13.4477 8 14V15H9C9.55228 15 10 15.4477 10 16C10 16.5523 9.55228 17 9 17H8V18C8 18.5523 7.55228 19 7 19C6.44772 19 6 18.5523 6 18V17H5C4.44772 17 4 16.5523 4 16C4 15.4477 4.44772 15 5 15H6V14C6 13.4477 6.44772 13 7 13Z" fill="currentColor" />
          <path d="M12.0627 7.99988C12.4879 8.30683 12.596 8.9202 12.289 9.34547C11.3445 10.7473 10.7696 12.4012 10.6636 14.1313C10.6336 14.6829 10.1731 15.1067 9.62154 15.0767C9.06998 15.0467 8.64627 14.5862 8.67625 14.0347C8.80599 11.8742 9.52388 9.834 10.7161 8.14382C11.023 7.71855 11.6364 7.61043 12.0627 7.99988Z" fill="currentColor" />
          <path d="M14.68 14.1347C14.6506 14.6863 14.1905 15.1106 13.639 15.0813C13.0875 15.0519 12.6631 14.5918 12.6925 14.0403C12.7971 12.2636 13.4097 10.5754 14.3999 9.15325C14.7115 8.73183 15.3261 8.65008 15.7476 8.96171C16.169 9.27333 16.2507 9.88792 15.9391 10.3093C15.1488 11.4581 14.6635 12.7795 14.68 14.1347Z" fill="currentColor" />
        </svg>
      </div>

      {/* Social Media Icon */}
      <div className="absolute top-1/3 right-5 animate-float opacity-20 dark:opacity-10" style={{ animationDelay: '2s' }}>
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M11 13H7C4.79086 13 3 14.7909 3 17V18C3 18.5523 3.44772 19 4 19H14C14.5523 19 15 18.5523 15 18V17C15 14.7909 13.2091 13 11 13Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M15 5H19C19.5523 5 20 5.44772 20 6V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V19" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Chat Icon */}
      <div className="absolute bottom-1/4 left-10 animate-float opacity-20 dark:opacity-10" style={{ animationDelay: '1.5s' }}>
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 9H6C5.44772 9 5 9.44772 5 10C5 10.5523 5.44772 11 6 11H10C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9Z" fill="currentColor"/>
          <path d="M14 13H6C5.44772 13 5 13.4477 5 14C5 14.5523 5.44772 15 6 15H14C14.5523 15 15 14.5523 15 14C15 13.4477 14.5523 13 14 13Z" fill="currentColor"/>
          <path d="M6 5H18C18.5523 5 19 5.44772 19 6C19 6.55228 18.5523 7 18 7H6C5.44772 7 5 6.55228 5 6C5 5.44772 5.44772 5 6 5Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V13C22 15.7614 19.7614 18 17 18H10.5L7.40193 20.5506C6.35755 21.4381 4.76606 21.3694 3.80625 20.3989C3.3174 19.8965 3 19.2245 3 18.5212V13.0886L3.00509 13.0758C2.36077 12.3699 2 11.3963 2 10.3488V7ZM4 7C4 5.34315 5.34315 4 7 4H17C18.6569 4 20 5.34315 20 7V13C20 14.6569 18.6569 16 17 16H10.5H9.85015L9.42307 16.3507L4.99904 19.9971L5 13.2V13.0891C5 13.089 5 13.0889 5 13.0888L5.00039 13.0882C5.00039 12.6486 5.12824 12.221 5.36165 11.8519L5.00039 13.0882C5.00043 13.0881 5.00047 13.0879 5.00052 13.0878C5.00061 13.0875 5.00071 13.0872 5.00081 13.0869C5.36373 11.9161 4 11.7603 4 10.3488V7Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
} 