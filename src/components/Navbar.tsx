import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import {
  UserCircleIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  CodeBracketIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  ServerIcon,
  BookOpenIcon,
  BuildingOffice2Icon,
  PlusIcon
} from '@heroicons/react/24/outline';
import rolitLogo from '../helpme.png';
import { motion, AnimatePresence } from 'framer-motion';

// Define dropdown menu items
const productItems = [
  { name: 'AI Virtual Assistant', description: 'Create smarter marketing', icon: <PuzzlePieceIcon className="h-6 w-6" /> },
  { name: 'Analytics Dashboard', description: 'Track campaign performance', icon: <ServerIcon className="h-6 w-6" /> },
  { name: 'Content Creator', description: 'Automate content generation', icon: <CodeBracketIcon className="h-6 w-6" /> },
  { name: 'Social Media Integration', description: 'Connect all platforms', icon: <ShieldCheckIcon className="h-6 w-6" /> }
];

const resourceItems = [
  { name: 'Documentation', description: 'Platform guides and API docs' },
  { name: 'Tutorials', description: 'Step-by-step walkthroughs' },
  { name: 'Case Studies', description: 'Success stories and examples' },
  { name: 'Webinars', description: 'Live and recorded sessions' }
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
      if (!target.closest('.product-menu-container')) {
        setIsProductMenuOpen(false);
      }
      if (!target.closest('.resources-menu-container')) {
        setIsResourcesMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };
  
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 px-4 sm:px-6 lg:px-8 py-4`}>
        <div className={`max-w-5xl mx-auto rounded-full ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg shadow-gray-200/20 dark:shadow-gray-900/30' : 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm'} px-2 sm:px-4 py-2 transition-all duration-500 flex items-center justify-between border border-gray-100/30 dark:border-gray-700/30`}>
          {/* Logo with animation */}
          <Link to="/" className="flex-shrink-0 flex items-center group">
            <motion.div 
              className="h-8 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src={rolitLogo} 
                alt="Rolit" 
                className="h-full max-w-[100px] object-contain group-hover:brightness-110 transition-all"
              />
            </motion.div>
          </Link>
          
          {/* Desktop Navigation Links - Centered */}
          <div className="hidden md:flex md:items-center md:justify-center md:space-x-6 flex-1 mx-4">
            {/* Product Dropdown */}
            <div className="relative product-menu-container">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProductMenuOpen(!isProductMenuOpen);
                  setIsResourcesMenuOpen(false);
                }}
                className="px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center transition-all"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>Who We Are</span>
                <motion.div
                  animate={{ rotate: isProductMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </motion.div>
              </motion.button>
              
              {isProductMenuOpen && (
                <motion.div 
                  className="absolute left-0 mt-2 w-80 rounded-xl shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="py-1 divide-y divide-gray-100 dark:divide-gray-700">
                    <div className="px-4 py-3">
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">About Us</p>
                      <div className="mt-2 space-y-2">
                        {productItems.map((item, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            <Link
                              to="#"
                              className="group flex items-start p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                            >
                              <div className="flex-shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                                {item.icon}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{item.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Resources Dropdown */}
            <div className="relative resources-menu-container">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsResourcesMenuOpen(!isResourcesMenuOpen);
                  setIsProductMenuOpen(false);
                }}
                className="px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center transition-all"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>What We Do</span>
                <motion.div
                  animate={{ rotate: isResourcesMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </motion.div>
              </motion.button>
              
              {isResourcesMenuOpen && (
                <motion.div 
                  className="absolute left-0 mt-2 w-72 rounded-xl shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="py-1 divide-y divide-gray-100 dark:divide-gray-700">
                    <div className="px-4 py-3">
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Services</p>
                      <div className="mt-2 space-y-2">
                        {resourceItems.map((item, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            <Link
                              to="#"
                              className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-all"
                            >
                              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{item.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/future"
                className="px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all"
              >
                Future of Retail
              </Link>
            </motion.div>
          </div>
          
          {/* Right section: user controls */}
          <div className="flex items-center space-x-1">
            {/* Mobile menu button */}
            <motion.div 
              className="mr-2 flex items-center md:hidden"
              whileTap={{ scale: 0.95 }}
            >
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-all"
                aria-expanded={isMenuOpen}
                whileHover={{ backgroundColor: "rgba(229, 231, 235, 0.5)" }}
              >
                <span className="sr-only">Open main menu</span>
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
            
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-all"
              aria-label="Toggle dark mode"
              whileHover={{ scale: 1.1, backgroundColor: theme === 'dark' ? "rgba(55, 65, 81, 0.5)" : "rgba(243, 244, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SunIcon className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MoonIcon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            {user ? (
              <div className="relative ml-3 user-menu-container">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 overflow-hidden"
                  id="user-menu-button"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Open user menu</span>
                  {user.avatar ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.avatar}
                      alt={user.name}
                    />
                  ) : (
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-blue-600 text-white">
                      <span className="text-sm font-medium leading-none">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </span>
                  )}
                </motion.button>
                
                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <motion.div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden border border-gray-100 dark:border-gray-700"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      
                      <motion.div whileHover={{ x: 3, backgroundColor: "rgba(243, 244, 246, 0.5)" }} transition={{ duration: 0.2 }}>
                        <Link
                          to={`/${user.role}/profile`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          role="menuitem"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserCircleIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                          Your Profile
                        </Link>
                      </motion.div>
                      
                      <motion.div whileHover={{ x: 3, backgroundColor: "rgba(243, 244, 246, 0.5)" }} transition={{ duration: 0.2 }}>
                        <Link
                          to={`/${user.role}/dashboard`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          role="menuitem"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <BuildingOffice2Icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                          Dashboard
                        </Link>
                      </motion.div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700"></div>
                      
                      <motion.div whileHover={{ x: 3, backgroundColor: "rgba(243, 244, 246, 0.5)" }} transition={{ duration: 0.2 }}>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          role="menuitem"
                        >
                          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                          Sign out
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                {/* Get in touch button for guest users */}
                <div className="relative">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUserMenuOpen(!isUserMenuOpen);
                    }}
                    className="hidden md:flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-md"
                    aria-expanded={isUserMenuOpen}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>Get in touch</span>
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-2" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </motion.svg>
                  </motion.button>
                  
                  {/* Auth Dropdown */}
                  {isUserMenuOpen && (
                    <motion.div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden border border-gray-100 dark:border-gray-700"
                      role="menu"
                      aria-orientation="vertical"
                      tabIndex={-1}
                      onClick={(e) => e.stopPropagation()}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="py-1">
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Welcome</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Access your account</p>
                        </div>
                        
                        <motion.div whileHover={{ x: 3, backgroundColor: "rgba(243, 244, 246, 0.5)" }} transition={{ duration: 0.2 }}>
                          <Link
                            to="/login"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            role="menuitem"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                            Sign in
                          </Link>
                        </motion.div>
                        
                        <motion.div whileHover={{ x: 3, backgroundColor: "rgba(243, 244, 246, 0.5)" }} transition={{ duration: 0.2 }}>
                          <Link
                            to="/register"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            role="menuitem"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <UserCircleIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                            Sign up
                          </Link>
                        </motion.div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-700"></div>
                        
                        <motion.div whileHover={{ x: 3, backgroundColor: "rgba(243, 244, 246, 0.5)" }} transition={{ duration: 0.2 }}>
                          <Link
                            to="/contact"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            role="menuitem"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <EnvelopeIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                            Contact us
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden mt-2 rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Who We Are
                </Link>
                
                <Link
                  to="/products"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  What We Do
                </Link>
                
                <Link
                  to="/future"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Future of Retail
                </Link>
                
                {user ? (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 pb-1">
                      <div className="px-3 space-y-1">
                        <Link
                          to={`/${user.role}/dashboard`}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        
                        <Link
                          to={`/${user.role}/profile`}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Your Profile
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 pb-1">
                      <div className="px-3 space-y-1">
                        <Link
                          to="/login"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign in
                        </Link>
                        
                        <Link
                          to="/register"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign up
                        </Link>
                        
                        <Link
                          to="/contact"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Contact us
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
