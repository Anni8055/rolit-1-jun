import React from 'react';
import { motion } from 'framer-motion';
import StackedFeatureCard from './StackedFeatureCard';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FeatureItem {
  title: string;
  description: string;
  image: string;
  color?: string;
  textColor?: string;
}

interface StackedFeatureSectionProps {
  features: FeatureItem[];
}

export default function StackedFeatureSection({ features }: StackedFeatureSectionProps) {
  return (
    <section className="relative">
      {/* Minimal spacing for initial effect */}
      <div className="h-[10vh]"></div>
      
      {/* This creates the space needed for scrolling */}
      <div style={{ height: `${features.length * 90}vh` }} className="relative">
        {/* Display cards in order - higher index cards will be on top due to z-index logic in StackedFeatureCard */}
        {features.map((feature, index) => (
          <StackedFeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            index={index}
            totalCards={features.length}
            color={feature.color}
            textColor={feature.textColor}
          />
        ))}
      </div>
      
      {/* Minimal spacing at the end */}
      <div className="h-[10vh]"></div>
    </section>
  );
} 