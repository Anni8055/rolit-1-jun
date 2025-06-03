import React, { useEffect, useRef, useState } from 'react';
import { Timeline } from './ui/timeline';
import { 
  SparklesIcon, 
  ChatBubbleLeftRightIcon, 
  UserGroupIcon, 
  LockClosedIcon 
} from '@heroicons/react/24/outline';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

interface GetStartedTimelineProps {
  isDarkMode?: boolean;
  currentUser?: any; // Replace with your user type
}

const GetStartedTimeline: React.FC<GetStartedTimelineProps> = ({ isDarkMode = false, currentUser }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Detect if browser supports backdrop-filter for glass effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Create parallax effect for background elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacitySection = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  
  // Timeline data that corresponds to the steps in the "Get Started in Minutes" section
  const timelineData = [
    {
      title: 'Create Your Profile',
      description: 'Sign up and build your brand or influencer profile with details about your audience, interests, and goals.',
      icon: <UserGroupIcon className="h-5 w-5" />,
      content: (
        <div className="mt-4">
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center">
            <div className="mr-3 text-primary-500 dark:text-primary-400">
              <UserGroupIcon className="h-6 w-6" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              "Creating my profile was so easy and intuitive!"
            </p>
          </div>
          
          {/* Profile preview mockup */}
          <motion.div 
            className="mt-6 relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="bg-gradient-to-r from-primary-500/30 to-blue-500/30 h-24"></div>
            <div className="flex px-6">
              <div className="rounded-full bg-white p-1 shadow-lg -mt-12">
                <div className="rounded-full bg-gradient-to-tr from-primary-500 to-blue-600 w-16 h-16 flex items-center justify-center text-white text-xl font-bold">
                  AJ
                </div>
              </div>
            </div>
            <div className="p-6 pt-3">
              <h4 className="font-bold text-gray-900 dark:text-white">Alex Johnson</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fashion & Lifestyle Influencer</p>
              <div className="flex items-center mt-4 space-x-2">
                <div className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                  <span className="text-xs font-medium text-primary-700 dark:text-primary-300">500K+ Followers</span>
                </div>
                <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Fashion</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      title: 'Connect with AI Matching',
      description: 'Our AI algorithm suggests perfect partnerships based on your specific requirements and audience alignment.',
      icon: <SparklesIcon className="h-5 w-5" />,
      content: (
        <div className="mt-4">
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center">
            <div className="mr-3 text-primary-500 dark:text-primary-400">
              <SparklesIcon className="h-6 w-6" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              "The AI matched me with the perfect brand partners!"
            </p>
          </div>
          
          {/* AI matching visualization */}
          <motion.div 
            className="mt-6 p-6 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              delay: 0.2,
              damping: 15 
            }}
          >
            <h4 className="font-bold mb-3 text-gray-900 dark:text-white">AI Match Score</h4>
            <div className="relative bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "92%" }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.5,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              />
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Brand: SportStyle Co.</p>
              <p className="text-sm font-semibold text-primary-700 dark:text-primary-400">92% Match</p>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <span className="text-xs font-medium text-green-700 dark:text-green-300">Audience Alignment ✓</span>
              </div>
              <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <span className="text-xs font-medium text-green-700 dark:text-green-300">Content Style ✓</span>
              </div>
              <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <span className="text-xs font-medium text-green-700 dark:text-green-300">Engagement Rate ✓</span>
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      title: 'Collaborate Directly',
      description: 'Use our secure messaging system to discuss campaigns, negotiate terms, and finalize agreements.',
      icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />,
      content: (
        <div className="mt-4">
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center">
            <div className="mr-3 text-primary-500 dark:text-primary-400">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              "Communication is seamless and secure."
            </p>
          </div>
          
          {/* Chat preview mockup */}
          <motion.div 
            className="mt-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-blue-600 text-white flex items-center justify-center mr-3 font-bold text-sm">
                SC
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">SportStyle Co.</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Online • Last message 2m ago</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-blue-600 text-white flex items-center justify-center mr-2 flex-shrink-0 font-bold text-sm">
                  SC
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-gray-700 dark:text-gray-300">Hi Alex! We'd love to work with you on our new summer activewear line. Your aesthetic matches our brand perfectly.</p>
                </div>
              </div>
              <div className="flex justify-end mb-4">
                <div className="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-primary-800 dark:text-primary-300">Thanks for reaching out! I'm definitely interested. What's the timeline for the campaign?</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-blue-600 text-white flex items-center justify-center mr-2 flex-shrink-0 font-bold text-sm">
                  SC
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-gray-700 dark:text-gray-300">We're planning to launch in mid-July. Would that work for you?</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      title: 'Secure Payment & Analytics',
      description: 'Execute campaigns with secure escrow payments and track real-time performance metrics.',
      icon: <LockClosedIcon className="h-5 w-5" />,
      content: (
        <div className="mt-4">
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center">
            <div className="mr-3 text-primary-500 dark:text-primary-400">
              <LockClosedIcon className="h-6 w-6" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              "I love how transparent the payment system is."
            </p>
          </div>
          
          {/* Analytics dashboard preview */}
          <motion.div 
            className="mt-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              delay: 0.1,
              stiffness: 300, 
              damping: 15 
            }}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-bold text-gray-900 dark:text-white">Campaign Analytics</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Summer Collection • June 10-24</p>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Impressions</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">156.4K</p>
                <div className="flex items-center mt-1">
                  <div className="text-green-500 text-xs">+24.8%</div>
                  <svg className="w-3 h-3 text-green-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Engagement Rate</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">5.7%</p>
                <div className="flex items-center mt-1">
                  <div className="text-green-500 text-xs">+1.2%</div>
                  <svg className="w-3 h-3 text-green-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Click-throughs</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">3.8K</p>
                <div className="flex items-center mt-1">
                  <div className="text-green-500 text-xs">+32.1%</div>
                  <svg className="w-3 h-3 text-green-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Payment Status</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">Completed</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">$2,850.00</p>
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden py-10 md:py-20"
      id="how-it-works"
    >
      {/* Parallax background elements */}
      <motion.div 
        style={{ y: bgY }} 
        className="absolute inset-0 pointer-events-none"
      >
        {/* Fixed position background gradients and shapes */}
        <div className="absolute -top-40 -left-20 w-96 h-96 bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl opacity-60 dark:opacity-30" />
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 dark:opacity-20" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50 dark:opacity-20" />
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMnYyaC0ydi0yaDJ6bTIgMGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40 dark:opacity-20"></div>
      </motion.div>

      {/* Content area with glass effect header */}
      <div className="relative z-10">
        {/* Sticky header section with glass effect */}
        <motion.div 
          style={{ opacity: opacitySection }}
          className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white inline-flex items-center">
                <SparklesIcon className="h-6 w-6 text-primary-500 mr-2" />
                Get Started in Minutes
              </h2>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 pt-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="inline-block text-lg font-semibold tracking-tight text-primary-600 dark:text-primary-400 px-4 py-1 bg-primary-50 dark:bg-primary-900/30 rounded-full mb-3">How It Works</p>
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            >
              Get Started <span className="text-primary-600 dark:text-primary-400">in Minutes</span>
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Connect with the perfect partners for your brand or audience through our streamlined platform.
            </motion.p>
          </motion.div>
        </div>

        <Timeline data={timelineData} darkMode={isDarkMode} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 mb-16"
        >
          <Link
            to={currentUser ? `/${currentUser.role}/dashboard` : "/register"}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl font-medium hover:from-primary-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg group"
          >
            <span className="font-semibold">Get Started</span>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2 group-hover:ml-3 transition-all duration-300" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              animate={{ x: [0, 3, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut" 
              }}
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStartedTimeline; 