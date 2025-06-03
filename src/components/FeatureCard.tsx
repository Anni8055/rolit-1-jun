import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

export default function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      className="relative flex flex-col items-start gap-4 rounded-lg bg-card p-6 shadow-md border border-border/40 hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
} 