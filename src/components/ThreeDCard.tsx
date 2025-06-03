import React, { useRef, ReactNode, MouseEvent } from 'react';

interface CardContainerProps {
  children: ReactNode;
  className?: string;
}

// CardContainer: Handles the 3D tilt effect
export const CardContainer: React.FC<CardContainerProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * -12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    if (card) {
      card.style.transition = 'transform 0.5s ease-out';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      setTimeout(() => {
        if (card) card.style.transition = '';
      }, 500);
    }
  };

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

// CardBody: Main card content area
export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
  <div
    className={`relative bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 ${className}`}
    style={{ transformStyle: 'preserve-3d' }}
  >
    {children}
  </div>
);

interface CardItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  translateZ?: number;
}

// CardItem: For layering content with optional translateZ
export const CardItem: React.FC<CardItemProps> = ({ children, className = '', translateZ = 0, ...props }) => (
  <div
    className={`transition-transform duration-200 ${className}`}
    style={{ 
      transform: `translateZ(${translateZ}px)`, 
      willChange: 'transform',
      transformStyle: 'preserve-3d' 
    }}
    {...props}
  >
    {children}
  </div>
); 