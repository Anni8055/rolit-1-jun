import React from 'react';
import { motion } from 'framer-motion';
import { CardSpotlight } from './ui/card-spotlight';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  delay?: number;
}

export default function TestimonialCard({ quote, author, role, avatar, delay = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <CardSpotlight
        className="min-h-[300px] p-6"
        radius={250}
        color="#1e293b"
      >
        {/* Quote symbol */}
        <svg
          className="h-8 w-8 text-blue-300 mb-2 relative z-20"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        
        <p className="text-white font-medium relative z-20">{quote}</p>
        
        <div className="mt-4 flex items-center relative z-20">
        <img 
          src={avatar} 
          alt={author} 
          className="h-10 w-10 rounded-full mr-3 object-cover" 
        />
        <div>
            <h4 className="text-sm font-semibold text-white">{author}</h4>
            <p className="text-xs text-blue-200/70">{role}</p>
          </div>
        </div>
      </CardSpotlight>
    </motion.div>
  );
} 