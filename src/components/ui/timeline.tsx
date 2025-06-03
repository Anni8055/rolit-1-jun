"use client";
import {
  useScroll,
  useTransform,
  motion,
  useInView,
  useMotionValueEvent,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  description: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

export const Timeline = ({ data, darkMode = false }: { data: TimelineEntry[], darkMode?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    // Initialize the itemRefs array with the correct length
    itemRefs.current = itemRefs.current.slice(0, data.length);
    
    // Set up intersection observers for each timeline item
    const observers = itemRefs.current.map((itemRef, index) => {
      if (!itemRef) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.6 }
      );
      
      observer.observe(itemRef);
      return observer;
    });
    
    // Clean up observers
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [data.length, ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  // Create timeline progress indicators
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  
  // Use motion value events to track scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // You can add additional logic here based on scroll progress
  });

  return (
    <div
      className={`w-full ${darkMode ? 'bg-gray-900' : 'bg-white'} font-sans relative overflow-hidden`}
      ref={containerRef}
      id="timeline-container"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div ref={ref} className="relative pb-20">
          {data.map((item, index) => (
            <motion.div
              key={index}
              ref={el => itemRefs.current[index] = el}
              className={`flex flex-col md:flex-row justify-start pt-16 md:pt-28 md:gap-10 relative ${
                index === activeIndex ? 'timeline-active' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              {/* Sticky timeline marker */}
              <motion.div 
                className="sticky flex flex-col md:flex-row z-20 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <motion.div 
                  className={`h-14 absolute left-3 md:left-3 w-14 rounded-full bg-gradient-to-r from-primary-500 to-blue-600 flex items-center justify-center shadow-lg z-10 ${
                    index === activeIndex ? 'ring-4 ring-blue-300 dark:ring-blue-700 ring-opacity-50' : ''
                  }`}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(59, 130, 246, 0.6)" }}
                  animate={index === activeIndex ? {
                    scale: [1, 1.1, 1],
                    boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.8)", "0 0 10px rgba(59, 130, 246, 0.3)"],
                  } : {}}
                  transition={{
                    duration: 0.8,
                    repeat: index === activeIndex ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                >
                  {item.icon ? (
                    <div className="text-white">{item.icon}</div>
                  ) : (
                    <div className="text-white font-bold text-lg">{index + 1}</div>
                  )}
                </motion.div>
                <motion.h3 
                  className={`hidden md:block text-xl md:pl-20 md:text-2xl font-bold ${
                    index === activeIndex 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-800 dark:text-white'
                  }`}
                  animate={index === activeIndex ? {
                    color: darkMode ? ["#f3f4f6", "#818cf8", "#f3f4f6"] : ["#1f2937", "#4f46e5", "#1f2937"],
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: index === activeIndex ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                >
                  {item.title}
                </motion.h3>
              </motion.div>

              {/* Content area with parallax effect */}
              <motion.div 
                className="relative pl-16 md:pl-4 w-full"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.2 + 0.3,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                style={{
                  y: useTransform(
                    scrollYProgress,
                    [index / data.length, (index + 0.8) / data.length],
                    [0, -30]
                  )
                }}
              >
                <h3 className={`md:hidden block text-2xl mb-4 text-left font-bold ${
                  index === activeIndex 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-800 dark:text-white'
                }`}>
                  {item.title}
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300 max-w-2xl">
                  {item.description}
                </p>
                {item.content && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.5,
                      delay: 0.4,
                    }}
                  >
                    {item.content}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
          
          {/* Animated timeline progress bar */}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute left-3 md:left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-200 dark:via-gray-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
          
          {/* Timeline nodes to mark each section */}
          {data.map((_, index) => (
            <motion.div 
              key={`node-${index}`}
              className={`absolute left-3 w-3 h-3 rounded-full bg-white dark:bg-gray-800 border-2 ${
                index <= activeIndex 
                  ? 'border-primary-500' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              style={{
                top: `${(index + 0.15) * (100 / data.length)}%`,
                transform: 'translateX(-25%)',
                boxShadow: index <= activeIndex ? '0 0 10px rgba(99, 102, 241, 0.5)' : 'none',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            />
          ))}
        </div>
      </div>
      
      {/* Add some tailwind utility classes for the timeline active states */}
      <style>
        {`
          .timeline-active .timeline-marker {
            box-shadow: 0 0 20px rgba(79, 70, 229, 0.6);
          }
        `}
      </style>
    </div>
  );
}; 