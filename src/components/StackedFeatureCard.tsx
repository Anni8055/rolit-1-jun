import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface StackedFeatureCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
  totalCards: number;
  color?: string;
  textColor?: string;
  isOnTop?: boolean;
}

export default function StackedFeatureCard({
  title,
  description,
  image,
  index,
  totalCards,
  color = '#1e293b',
  textColor = 'text-white',
  isOnTop = false
}: StackedFeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  // Calculate scale based on scroll progress
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.95]
  );

  // Calculate opacity based on scroll progress
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6]
  );

  // Calculate y position based on scroll progress
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [100, 0, 0, -50]
  );

  // Calculate rotation for 3D effect
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [15, 0, 0, 5]
  );

  // IMPORTANT: Higher index cards should appear on TOP of the stack
  // We make z-index directly proportional to index
  const zIndex = index;

  return (
    <motion.div
      ref={cardRef}
      className="h-[85vh] w-full flex items-center justify-center px-4"
      style={{
        position: 'sticky',
        top: 0,
        zIndex,
      }}
    >
      <motion.div
        className="relative mx-auto rounded-2xl overflow-hidden shadow-2xl transition-all duration-500"
        style={{
          scale,
          opacity,
          y,
          rotateX,
          backgroundColor: color,
          transformPerspective: '1000px',
          transformStyle: 'preserve-3d',
          width: '1100px',
          height: '400px',
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.2)' 
            : '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
        }}
        initial={{ opacity: 0.6, y: 100 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/30 to-white/0"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 h-full">
          <div className={`flex flex-col justify-center ${textColor}`}>
            <span className="text-sm font-semibold tracking-wider uppercase mb-3 opacity-80">Feature {index + 1}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">{title}</h2>
            <p className="text-xl opacity-90 leading-relaxed mb-8">{description}</p>
            
            <motion.button 
              className="flex items-center group self-start px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-2 text-lg">Learn More</span>
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>
          <div className="flex items-center justify-center relative">
            {/* Image glow effect */}
            <div className={`absolute inset-0 rounded-lg blur-xl opacity-30 bg-gradient-to-br from-white/40 to-white/5 transition-opacity duration-500 ${isHovered ? 'opacity-60' : 'opacity-30'}`}></div>
            
            <motion.img 
              src={image} 
              alt={title} 
              className="rounded-lg object-cover w-full h-80 shadow-lg relative z-10"
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 