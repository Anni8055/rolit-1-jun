import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { motion } from 'framer-motion';
import { WrenchScrewdriverIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-lg p-8 rounded-xl bg-white dark:bg-gray-800 shadow-xl"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30">
          <WrenchScrewdriverIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
        </div>
        
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">We're working on this!</h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Our team is currently developing this page. Thanks for your patience while we make improvements to enhance your experience.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-lg font-medium hover:from-primary-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
} 