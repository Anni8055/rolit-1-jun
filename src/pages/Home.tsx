import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SparklesIcon, 
  ChatBubbleLeftRightIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  ExclamationTriangleIcon,
  ArrowRightIcon,
  BoltIcon,
  UserGroupIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { TypeAnimation } from 'react-type-animation';
import Lottie from 'lottie-react';
import connectionAnimation from '../assets/connection-animation.json';

import FloatingIcons from '../components/FloatingIcons';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import RotatingText from '../components/RotatingText';
import GetStartedTimeline from '../components/GetStartedTimeline';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { CardContainer, CardBody, CardItem } from '../components/ThreeDCard';
import StackedFeatureSection from '../components/StackedFeatureSection';

export default function Home() {
  const { theme } = useTheme();
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [time, setTime] = useState(new Date());
  const { user } = useAuth();

  // Video and text state
  const [showFirstTagline, setShowFirstTagline] = useState(false);
  const [showSecondTagline, setShowSecondTagline] = useState(false);
  const [showSecondVideo, setShowSecondVideo] = useState(false);
  const [showElevateText, setShowElevateText] = useState(false);
  const firstVideoRef = useRef<HTMLVideoElement | null>(null);
  const secondVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline-active');
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Ensure videos play automatically
    const playVideos = () => {
      if (firstVideoRef.current && !showSecondVideo) {
        firstVideoRef.current.play().catch(err => console.log('Autoplay prevented:', err));
      }
      if (secondVideoRef.current && showSecondVideo) {
        secondVideoRef.current.play().catch(err => console.log('Autoplay prevented:', err));
      }
    };
    
    // Try to play videos immediately
    playVideos();
    
    // Also try on user interaction with the page
    const handleUserInteraction = () => {
      playVideos();
      // Remove event listeners after first interaction
      ['click', 'touchstart', 'keydown'].forEach(event => 
        document.removeEventListener(event, handleUserInteraction)
      );
    };
    
    // Add event listeners for user interaction
    ['click', 'touchstart', 'keydown'].forEach(event => 
      document.addEventListener(event, handleUserInteraction)
    );
    
    // Clean up
    return () => {
      ['click', 'touchstart', 'keydown'].forEach(event => 
        document.removeEventListener(event, handleUserInteraction)
      );
    };
  }, [showSecondVideo]);

  useEffect(() => {
    if (!showSecondVideo) {
      // Show the first tagline after 2 seconds
      const firstTaglineTimer = setTimeout(() => {
        setShowFirstTagline(true);
      }, 2000);

      // Show the second tagline 1.5 seconds after the first one
      const secondTaglineTimer = setTimeout(() => {
        setShowSecondTagline(true);
      }, 2000 + 1500);

      // Preload the second video
      if (secondVideoRef.current) {
        secondVideoRef.current.load();
      }

      return () => {
        clearTimeout(firstTaglineTimer);
        clearTimeout(secondTaglineTimer);
      };
    }
  }, [showSecondVideo]);

  // Handler for when the first video ends
  const handleFirstVideoEnd = () => {
    setShowSecondVideo(true);
    setShowFirstTagline(false);
    setShowSecondTagline(false);
    setShowElevateText(false);
    setTimeout(() => setShowElevateText(true), 100);
    if (secondVideoRef.current) {
      secondVideoRef.current.play();
    }
  };

  // Handler for when the second video ends (loop back to start)
  const handleSecondVideoEnd = () => {
    setShowSecondVideo(false);
    setShowElevateText(false);
    setTimeout(() => {
      setShowFirstTagline(false);
      setShowSecondTagline(false);
      // Restart the tagline timers
      setTimeout(() => setShowFirstTagline(true), 2000);
      setTimeout(() => setShowSecondTagline(true), 2000 + 1500);
      // Restart the first video
      if (firstVideoRef.current) {
        firstVideoRef.current.currentTime = 0;
        firstVideoRef.current.play();
      }
    }, 100);
  };

  // Features list for the key features section
  const features = [
    {
      title: 'AI-Powered Matching',
      description: 'Our advanced AI algorithm connects brands with the perfect influencers based on audience demographics, engagement, and brand alignment.',
      icon: <SparklesIcon className="h-6 w-6" />,
    },
    {
      title: 'Direct DM Communication',
      description: 'Communicate seamlessly with brands and influencers through our secure, integrated messaging system.',
      icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
    },
    {
      title: 'Secure Escrow Payments',
      description: 'Our escrow payment system ensures funds are only released when both parties are satisfied with campaign deliverables.',
      icon: <ShieldCheckIcon className="h-6 w-6" />,
    },
    {
      title: 'Real-time Analytics',
      description: 'Track campaign performance metrics in real-time with comprehensive dashboards and customizable reports.',
      icon: <ChartBarIcon className="h-6 w-6" />,
    },
    {
      title: 'Fraud Detection',
      description: 'Advanced AI technology detects fake followers and engagement, ensuring authentic partnerships.',
      icon: <ExclamationTriangleIcon className="h-6 w-6" />,
    },
  ];

  // Stacked feature cards data
  const stackedFeatures = [
    {
      title: "AI-Powered Matching",
      description: "Connect with the perfect partners using our advanced AI algorithm that matches brands and influencers based on audience demographics, content style, and campaign goals.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      color: "#1e293b",
      textColor: "text-white"
    },
    {
      title: "Direct Communication",
      description: "Seamlessly connect and collaborate with your partners through our integrated messaging system, streamlining the entire campaign process.",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      color: "#0f766e",
      textColor: "text-white"
    },
    {
      title: "Real-time Analytics",
      description: "Track campaign performance with comprehensive dashboards and real-time metrics that help you understand ROI and optimize your marketing strategy.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      color: "#0c4a6e",
      textColor: "text-white"
    },
    {
      title: "Secure Payments & Escrow",
      description: "Our secure payment system with escrow protection ensures that funds are only released when both parties are satisfied with the campaign deliverables.",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      color: "#0f172a",
      textColor: "text-white"
    },
    {
      title: "Fraud Detection",
      description: "Our advanced AI technology identifies fake followers and engagement, ensuring authentic partnerships that deliver real results for your brand.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      color: "#450a0a",
      textColor: "text-white"
    }
  ];

  // Testimonials for the trust section
  const testimonials = [
    {
      quote: "RoLit has transformed how we find influencers. The AI matching is scary accurate, and the direct messaging makes collaboration so much easier.",
      author: "Sarah Johnson",
      role: "Marketing Director at TechBrand",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      quote: "As an influencer, I've tried many platforms, but nothing compares to the quality of brand matches and the security of the escrow payment system.",
      author: "Alex Rivera",
      role: "Lifestyle Influencer, 500K+ Followers",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The fraud detection feature alone is worth it. No more wasting budget on influencers with fake engagement. This platform is a game-changer.",
      author: "David Chen",
      role: "CMO at GreenLife Products",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section with video background */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-900 h-screen flex flex-col justify-center items-center text-center pt-0 mt-0">
        {/* Video Background */}
        <video
          ref={firstVideoRef}
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-200 ${showSecondVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          src="https://res.cloudinary.com/dmughdyc0/video/upload/v1748167767/2867912-uhd_3840_2160_25fps_ujdaeq.mp4"
          autoPlay
          muted
          playsInline
          loop={!showSecondVideo}
          preload="auto"
          onEnded={handleFirstVideoEnd}
          onCanPlayThrough={(e) => e.currentTarget.play().catch(err => console.log('Autoplay prevented:', err))}
        >
          Your browser does not support the video tag.
        </video>
        <video
          ref={secondVideoRef}
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-200 ${showSecondVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          src="https://res.cloudinary.com/dmughdyc0/video/upload/v1748169547/4361066-uhd_3840_2160_25fps_msuhjs.mp4"
          autoPlay={showSecondVideo}
          muted
          playsInline
          loop={showSecondVideo}
          preload="auto"
          tabIndex={-1}
          onEnded={handleSecondVideoEnd}
          onCanPlayThrough={(e) => showSecondVideo && e.currentTarget.play().catch(err => console.log('Autoplay prevented:', err))}
        >
          Your browser does not support the video tag.
        </video>

        {/* Add a fallback poster image in case video doesn't load */}
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://res.cloudinary.com/dmughdyc0/image/upload/v1748167767/video-fallback.jpg')", opacity: 0.1}}></div>

        {/* Add video autoplay script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const videos = document.querySelectorAll('video');
              videos.forEach(video => {
                video.play().catch(error => {
                  console.log("Autoplay was prevented:", error);
                  // Add play button or other fallback if needed
                });
              });
            });
          `
        }} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-white h-full w-full flex flex-col">
          {/* Main text above buttons, changes with video state */}
          <div className="flex-1 flex flex-col justify-center items-center">
            {!showSecondVideo && (
              <>
                {showFirstTagline && (
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.9,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="text-4xl font-bold tracking-tight sm:text-6xl relative"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <span className="inline-block relative">
                      <span className="relative z-10">Create</span>
                      <motion.span 
                        className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg opacity-70"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        style={{ willChange: "width" }}
                      />
                    </span>{' '}
                    <span className="inline-block relative">
                      <span className="relative z-10">Impact</span>
                      <motion.span 
                        className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-70"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.9, duration: 0.7 }}
                        style={{ willChange: "width" }}
                      />
                    </span>{' '}
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3, duration: 0.6 }}
                      className="relative inline-block"
                    >
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Together</span>
                    </motion.span>
                  </motion.h1>
                )}
                {showSecondTagline && (
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.5,
                      type: "spring"
                    }}
                    className="mt-6 text-2xl font-semibold leading-8 relative"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <span className="relative inline-block">
                      <span className="relative">JOIN</span>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white origin-left"
                        style={{ willChange: "transform" }}
                      />
                    </span>{' '}
                    <TypeAnimation
                      sequence={[
                        'RoLiT',
                        1000,
                        'Revolution',
                        1000,
                        'Innovation',
                        1000,
                        'Transformation',
                        1000,
                        'RoLiT',
                      ]}
                      wrapper="span"
                      cursor={true}
                      repeat={Infinity}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500"
                      speed={40}
                    />
                  </motion.h2>
                )}
              </>
            )}
            {showSecondVideo && showElevateText && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl font-bold tracking-tight sm:text-6xl"
                style={{ willChange: "transform, opacity" }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    y: [20, 0]
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut"
                  }}
                  className="flex flex-col md:flex-row items-center justify-center gap-3"
                  style={{ willChange: "transform, opacity" }}
                >
                  <span>Elevate</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500"
                  >
                    influence
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    with
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.4 }}
                    className="relative inline-flex items-center"
                  >
                    <span className="relative z-10">RoL</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.4 }}
                      className="relative z-10 text-blue-400"
                    >
                      i
                    </motion.span>
                    <span className="relative z-10">t</span>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      transition={{ delay: 1.7, duration: 0.5 }}
                      className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 blur-md"
                    />
                  </motion.span>
                </motion.div>
              </motion.h1>
            )}
          </div>

          {/* Sign up / dashboard buttons always visible, absolutely placed at 75% height */}
          <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '75%' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: showSecondVideo ? 1.8 : 1.5, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center"
              style={{ willChange: "transform, opacity" }}
            >
              {user ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    style={{ willChange: "transform" }}
                  >
                    <Link 
                      to={`/${user.role}/dashboard`}
                      className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary-600 to-blue-600 px-7 py-3.5 text-base font-medium text-white shadow-lg group"
                    >
                      <span className="relative z-10">Go to Dashboard</span>
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div
                        className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
                      />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1, y: -5 }}
                    whileTap={{ scale: 0.95, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    style={{ willChange: "transform" }}
                  >
                    <Link 
                      to={`/${user.role}/profile`}
                      className="relative overflow-hidden rounded-lg bg-white dark:bg-slate-800 px-7 py-3.5 text-base font-medium text-gray-800 dark:text-white shadow-lg border border-gray-300 dark:border-slate-700 group"
                    >
                      <span className="relative z-10">View Profile</span>
                      <div
                        className="absolute inset-0 bg-gray-100 dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div
                        className="absolute -inset-1 opacity-0 group-hover:opacity-20 blur-md bg-gradient-to-r from-blue-600 to-purple-600 group-hover:duration-500 duration-1000 transition-all"
                      />
                    </Link>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    style={{ willChange: "transform" }}
                  >
                    <Link 
                      to="/register?role=brand" 
                      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-8 py-4 text-base font-medium text-white shadow-lg group flex items-center justify-center"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl">
                        <div className="absolute -top-1 -right-1 w-16 h-16 bg-white opacity-20 blur-xl rounded-full transform transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:w-20 group-hover:h-20"/>
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-300 opacity-30 blur-2xl rounded-full transform transition-all duration-700 group-hover:w-20 group-hover:opacity-40"/>
                      </div>
                      <span className="relative z-10 font-semibold flex items-center">
                        <span>Sign Up as a Brand</span>
                        <ArrowRightIcon className="w-4 h-4 ml-2 opacity-70 -translate-x-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300 ease-out" />
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/70 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"/>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1, y: -5 }}
                    whileTap={{ scale: 0.95, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    style={{ willChange: "transform" }}
                  >
                    <Link 
                      to="/register?role=influencer" 
                      className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-white/90 dark:bg-white/20 px-8 py-4 text-base font-semibold text-gray-800 dark:text-white shadow-lg border border-white/30 group flex items-center justify-center"
                    >
                      <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 opacity-0 group-hover:opacity-100 transition-all duration-300"/>
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl">
                        <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-300 dark:bg-blue-400 opacity-10 dark:opacity-20 blur-xl rounded-full transform transition-transform duration-700 group-hover:translate-y-1 group-hover:translate-x-1 group-hover:opacity-20 dark:group-hover:opacity-30"/>
                        <div className="absolute -bottom-1 -right-1 w-16 h-16 bg-indigo-400 opacity-10 dark:opacity-20 blur-xl rounded-full transform transition-all duration-700 group-hover:opacity-20 dark:group-hover:opacity-30"/>
                      </div>
                      <span className="relative z-10 flex items-center">
                        <span>Find Campaigns as an Influencer</span>
                        <SparklesIcon className="w-4 h-4 ml-2 opacity-70 -translate-x-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300 ease-out" />
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 to-indigo-400 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"/>
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Benefits Section - moved to be separate from videos */}
      <section className="py-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative"
            >
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
              Everything You Need In One Platform
            </h2>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
                Our comprehensive suite of tools streamlines the entire influencer marketing process from discovery to analytics.
              </p>
            </motion.div>
          </div>
      </section>

      {/* Stacked Feature Cards Section */}
      <section id="features" className="relative">
        <StackedFeatureSection features={stackedFeatures} />
      </section>

      {/* Get Started Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background gradient and animated patterns */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-900/90 dark:to-gray-900/80">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMnYyaC0ydi0yaDJ6bTIgMGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40 dark:opacity-25"></div>
          
          {/* Animated floating elements */}
          <motion.div
            className="absolute h-44 w-44 rounded-full bg-gradient-to-r from-primary-300 to-blue-300 dark:from-primary-600 dark:to-blue-600 opacity-20 dark:opacity-30 blur-3xl"
            style={{ 
              top: '20%', 
              left: '10%',
              willChange: 'transform',
              translateZ: 0
            }}
            animate={{ 
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute h-60 w-60 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-800 dark:to-pink-800 opacity-20 dark:opacity-30 blur-3xl"
            style={{ 
              bottom: '10%', 
              right: '15%',
              willChange: 'transform',
              translateZ: 0
            }}
            animate={{ 
              y: [0, 30, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
              delay: 1
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
            {/* Left Text Content */}
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="inline-block mb-3 px-4 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-full"
              >
                <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                  AI-Powered Influencer Platform
                </span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight leading-tight">
                <span className="block mb-1">Get Started</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400">
                  <TypeAnimation
                    sequence={[
                      'in Minutes',
                      2000,
                      'Effortlessly',
                      2000,
                      'with AI',
                      2000
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </h1>
              
              <motion.p 
                className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                Connect with the perfect partners for your brand or audience through our streamlined platform.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <Link 
                  to="/register" 
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-blue-600 text-white font-medium shadow-lg hover:shadow-primary-500/20 hover:from-primary-500 hover:to-blue-500 transform hover:translate-y-[-2px] transition-all"
                >
                  Get Started Free
                </Link>
                
                <Link
                  to="/about"
                  className="px-8 py-3.5 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700/80 transform hover:translate-y-[-2px] transition-all group flex items-center justify-center"
                >
                  <span>Learn More</span>
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
                    style={{
                      willChange: 'transform',
                      translateZ: 0
                    }}
                  >
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </motion.svg>
                </Link>
              </motion.div>
              
              {/* Success stats */}
              <motion.div
                className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.7 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">5k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Brand Partnerships</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Match Success</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right Animation/Illustration */}
            <motion.div 
              className="lg:w-1/2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="relative w-full max-w-lg">
                {/* Main animation */}
                <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-1 border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <Lottie 
                    animationData={connectionAnimation} 
                    className="w-full h-auto" 
                    loop={true}
                  />
                </div>
                
                {/* Decorative floating elements */}
                <motion.div
                  className="absolute -right-4 -bottom-10 bg-blue-100 dark:bg-blue-900/30 rounded-full h-40 w-40"
                  animate={{ 
                    y: [0, 15, 0], 
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
                <motion.div
                  className="absolute -left-10 top-10 bg-primary-100 dark:bg-primary-900/30 rounded-full h-24 w-24"
                  animate={{ 
                    y: [0, -10, 0], 
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                
                {/* Feature cards */}
                <motion.div
                  className="absolute bottom-20 -right-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-100 dark:border-gray-700 w-44"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                      <SparklesIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900 dark:text-white">AI Matching</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">95% accuracy</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute top-10 -left-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-100 dark:border-gray-700 w-40"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                      <ShieldCheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900 dark:text-white">Secure Payments</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Escrow protected</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works / Get started in minutes section */}
      <GetStartedTimeline isDarkMode={theme === 'dark'} currentUser={user} />

      {/* Testimonials */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-white via-gray-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" id="testimonials">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <p className="text-lg font-semibold leading-8 tracking-tight text-primary-600 dark:text-primary-400">Testimonials</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Trusted by Brands and Influencers</h2>
            </motion.div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.author}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                avatar={testimonial.avatar}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 bg-gradient-to-br from-white via-gray-50 to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center justify-center">
              <ShieldCheckIcon className="h-10 w-10 text-primary-500 mb-2" />
              <h3 className="text-center text-sm font-semibold text-foreground">Secure Payments</h3>
            </div>
            <div className="flex flex-col items-center justify-center">
              <LockClosedIcon className="h-10 w-10 text-primary-500 mb-2" />
              <h3 className="text-center text-sm font-semibold text-foreground">Data Protection</h3>
            </div>
            <div className="flex flex-col items-center justify-center">
              <SparklesIcon className="h-10 w-10 text-primary-500 mb-2" />
              <h3 className="text-center text-sm font-semibold text-foreground">AI-Powered</h3>
            </div>
            <div className="flex flex-col items-center justify-center">
              <UserGroupIcon className="h-10 w-10 text-primary-500 mb-2" />
              <h3 className="text-center text-sm font-semibold text-foreground">Verified Users</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 mt-16">
        <div className="overflow-hidden rounded-2xl mx-6 sm:mx-10 lg:mx-20 my-16">
          <div className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-24 lg:py-32">
            {/* Video Background */}
            <video
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              src="https://res.cloudinary.com/dmughdyc0/video/upload/v1748271958/8043623-uhd_4096_2160_25fps_ihz1du.mp4"
              autoPlay
              loop
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>
            
            {/* Very subtle text shadow overlay for readability */}
            <div className="absolute inset-0 bg-black/10"></div>
            
            <div className="relative mx-auto max-w-2xl text-center z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-md">
                  Join the Future of Influencer Marketing
                </h2>
                <p className="mt-6 text-lg leading-8 text-white drop-shadow-md">
                  Connect with the perfect partners, streamline your campaigns, and maximize your ROI with our AI-powered platform.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link to="/register" className="rounded-lg bg-white/90 hover:bg-white px-6 py-3 text-base font-semibold text-primary-700 shadow-md hover:shadow-lg transform hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white">
                    Get Started For Free
                  </Link>
                  <Link to="/about" className="text-base font-semibold text-white flex items-center drop-shadow-md hover:text-gray-100 hover:translate-x-1 transition-all duration-300 ease-in-out group">
                    Learn more <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:ml-3 transition-all duration-300" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Footer Section */}
      <footer className="relative bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white overflow-hidden py-8">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[5%] top-[20%] h-[200px] w-[200px] rounded-full bg-blue-500/5 blur-3xl"></div>
          <div className="absolute right-[10%] bottom-[20%] h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-3xl"></div>
          <div className="absolute left-[40%] bottom-[10%] h-[250px] w-[250px] rounded-full bg-indigo-500/5 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer grid with logo, links and newsletter */}
          <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Logo and Social Links */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-indigo-300 transition-all duration-300">
                RoLit
              </h3>
              <p className="text-sm text-gray-400">
                Connecting brands with the perfect influencers through AI-powered matching.
              </p>
              <div className="flex space-x-4">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-125 hover:-translate-y-1 transition-transform duration-300 ease-in-out">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 transition-colors transform hover:scale-125 hover:rotate-12 transition-transform duration-300 ease-in-out">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors transform hover:scale-125 hover:-rotate-12 transition-transform duration-300 ease-in-out">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-125 transition-transform duration-300 ease-in-out">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-2 transition-all duration-200 inline-flex items-center"><span className="relative">Marketing</span><span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 group-hover:w-full transition-all duration-300 ease-in-out"></span></a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-2 transition-all duration-200 inline-flex items-center"><span className="relative">Analytics</span><span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 group-hover:w-full transition-all duration-300 ease-in-out"></span></a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-2 transition-all duration-200 inline-flex items-center"><span className="relative">Commerce</span><span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 group-hover:w-full transition-all duration-300 ease-in-out"></span></a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-2 transition-all duration-200 inline-flex items-center"><span className="relative">Insights</span><span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 group-hover:w-full transition-all duration-300 ease-in-out"></span></a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-2 transition-all duration-200 inline-flex items-center group"><span className="relative">Documentation</span><span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 group-hover:w-full transition-all duration-300 ease-in-out"></span></a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-2 transition-all duration-200 inline-flex items-center group"><span className="relative">Guides</span><span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 group-hover:w-full transition-all duration-300 ease-in-out"></span></a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-2 transition-all duration-200 inline-flex items-center group"><span className="relative">API Status</span><span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 group-hover:w-full transition-all duration-300 ease-in-out"></span></a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Stay Updated</h3>
              <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
              <form className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-300"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out text-sm font-medium active:scale-95"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2025 RoLit. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-blue-400 transition-all duration-300 ease-in-out relative after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 after:ease-in-out">Privacy Policy</Link>
                <Link to="/terms-of-service" className="text-sm text-gray-400 hover:text-blue-400 transition-all duration-300 ease-in-out relative after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 after:ease-in-out">Terms of Service</Link>
                <Link to="/cookie-policy" className="text-sm text-gray-400 hover:text-blue-400 transition-all duration-300 ease-in-out relative after:absolute after:bottom-0 after:left-0 after:bg-blue-400 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 after:ease-in-out">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes digitalGlow {
          0% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
          50% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
          100% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
        }

        .animate-digitalGlow {
          animation: digitalGlow 2s infinite;
        }

        html {
          scroll-behavior: smooth;
        }

        section {
          scroll-margin-top: 4rem;
        }
      `}</style>
    </div>
  );
}