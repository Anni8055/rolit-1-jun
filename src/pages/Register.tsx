import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import CustomEyeIcon from '../components/CustomEyeIcon';

export default function Register() {
  const location = useLocation();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'brand' as 'brand' | 'influencer',
  });
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Set role based on URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam === 'brand' || roleParam === 'influencer') {
      setFormData(prev => ({ ...prev, role: roleParam }));
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear password error when user types in password fields
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setPasswordError('');
    setLoading(true);
    setError('');

    try {
      const user = await register(formData.name, formData.email, formData.password, formData.role);
      console.log('Registration successful:', user);
      
      // Redirect based on user role
      if (user.role === 'brand') {
        navigate('/brand/dashboard');
      } else if (user.role === 'influencer') {
        navigate('/influencer/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={`flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 
      ${theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className={`mt-6 text-center text-3xl font-bold tracking-tight 
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Create a new account
        </h2>
        <p className={`mt-2 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Or{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-300">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`py-8 px-4 shadow sm:rounded-lg sm:px-10 relative overflow-hidden
          ${theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-100'}`}
        >
          {/* Decorative gradient blob in background */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-primary-400/10 to-blue-400/5 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/10 to-pink-400/5 blur-3xl"></div>
          
          {/* Role selection tabs */}
          <div className="mb-6 relative">
            <div className="flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'brand' }))}
                className={`w-1/2 py-2 px-4 text-sm font-medium rounded-l-md transition-all duration-300 
                  ${formData.role === 'brand' 
                    ? theme === 'dark'
                      ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg transform scale-105' 
                      : 'bg-gradient-to-r from-primary-500 to-blue-500 text-white shadow-lg transform scale-105'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                I'm a Brand
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'influencer' }))}
                className={`w-1/2 py-2 px-4 text-sm font-medium rounded-r-md transition-all duration-300
                  ${formData.role === 'influencer' 
                    ? theme === 'dark'
                      ? 'bg-gradient-to-r from-blue-600 to-primary-600 text-white shadow-lg transform scale-105' 
                      : 'bg-gradient-to-r from-blue-500 to-primary-500 text-white shadow-lg transform scale-105'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                I'm an Influencer
              </button>
            </div>
          </div>
          
          <form className="space-y-6 relative" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4 animate-fadeIn">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}
            
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                {formData.role === 'brand' ? 'Company Name' : 'Full Name'}
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field transition-all duration-300 
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-primary-500 focus:ring-primary-500 hover:border-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-primary-500 hover:border-gray-400'}`}
                  placeholder={formData.role === 'brand' ? 'Enter company name' : 'Enter your full name'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field transition-all duration-300 
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-primary-500 focus:ring-primary-500 hover:border-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-primary-500 hover:border-gray-400'}`}
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Password
              </label>
              <div className={`mt-1 relative rounded-md shadow-sm transition-all duration-300 
                ${isPasswordFocused 
                  ? theme === 'dark'
                    ? 'ring-2 ring-primary-500 ring-opacity-50 shadow-[0_0_15px_rgba(79,70,229,0.15)]'
                    : 'ring-2 ring-primary-500 ring-opacity-50 shadow-[0_0_15px_rgba(79,70,229,0.1)]'
                  : ''}`}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  className={`input-field pr-10 transition-all duration-300 
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-primary-500 focus:ring-primary-500 hover:border-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-primary-500 hover:border-gray-400'}`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center justify-center transition-all duration-300
                    transform ${isPasswordFocused ? 'scale-110' : ''} hover:scale-110 active:scale-95`}
                >
                  <span className="absolute w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full -z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  <CustomEyeIcon 
                    isOpen={showPassword} 
                    isDarkTheme={theme === 'dark'} 
                    className="h-6 w-6" 
                  />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Confirm password
              </label>
              <div className={`mt-1 relative rounded-md shadow-sm transition-all duration-300 
                ${isConfirmPasswordFocused 
                  ? theme === 'dark'
                    ? 'ring-2 ring-primary-500 ring-opacity-50 shadow-[0_0_15px_rgba(79,70,229,0.15)]'
                    : 'ring-2 ring-primary-500 ring-opacity-50 shadow-[0_0_15px_rgba(79,70,229,0.1)]'
                  : ''}`}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setIsConfirmPasswordFocused(true)}
                  onBlur={() => setIsConfirmPasswordFocused(false)}
                  className={`input-field pr-10 transition-all duration-300 
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-primary-500 focus:ring-primary-500 hover:border-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-primary-500 hover:border-gray-400'}`}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center justify-center transition-all duration-300
                    transform ${isConfirmPasswordFocused ? 'scale-110' : ''} hover:scale-110 active:scale-95`}
                >
                  <span className="absolute w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full -z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  <CustomEyeIcon 
                    isOpen={showConfirmPassword} 
                    isDarkTheme={theme === 'dark'} 
                    className="h-6 w-6" 
                  />
                </button>
              </div>
              {passwordError && (
                <p className="mt-2 text-sm text-red-600 animate-pulse">{passwordError}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-md shadow-md text-sm font-medium text-white
                  ${formData.role === 'brand'
                    ? 'bg-gradient-to-r from-primary-600 via-primary-500 to-blue-600 hover:from-primary-700 hover:via-primary-600 hover:to-blue-700'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-500 to-primary-600 hover:from-blue-700 hover:via-indigo-600 hover:to-primary-700'}
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                  transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg 
                  active:translate-y-0 active:shadow-md disabled:opacity-70 disabled:cursor-not-allowed
                  relative overflow-hidden group`}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                <span className="relative">
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    `Sign up as ${formData.role === 'brand' ? 'a Brand' : 'an Influencer'}`
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 