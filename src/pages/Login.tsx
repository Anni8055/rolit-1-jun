import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import CustomEyeIcon from '../components/CustomEyeIcon';
import { toast } from 'react-hot-toast';

export default function Login() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState<'influencer' | 'brand'>('influencer');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        await register(name, email, password, role);
        toast.success(`Successfully registered as ${role}!`);
      } else {
        const user = await login(email, password);
        
        // Redirect based on user role
        if (user.role === 'brand') {
          navigate('/brand/dashboard');
          toast.success('Welcome back, brand!');
        } else if (user.role === 'influencer') {
          navigate('/influencer/dashboard');
          toast.success('Welcome back, influencer!');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Failed to login');
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 
      ${theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'}`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className={`mt-6 text-center text-3xl font-bold tracking-tight 
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {isRegistering ? 'Create your account' : 'Sign in to your account'}
        </h2>
        <p className={`mt-2 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Or{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-300">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`py-8 px-4 shadow sm:rounded-lg sm:px-10 
          ${theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-100'}`}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isRegistering && (
              <>
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`input-field transition-all duration-300 
                        ${theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-primary-500 focus:ring-primary-500 hover:border-gray-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-primary-500 hover:border-gray-400'}`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    Role
                  </label>
                  <div className="mt-1">
                    <select
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value as 'influencer' | 'brand')}
                      className={`input-field transition-all duration-300 
                        ${theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-primary-500 focus:ring-primary-500 hover:border-gray-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-primary-500 hover:border-gray-400'}`}
                    >
                      <option value="influencer">Influencer</option>
                      <option value="brand">Brand</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {error && (
              <div className="rounded-md bg-red-50 p-4 animate-fadeIn">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}
            
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                ${isPasswordFocused ? 'ring-2 ring-primary-500 ring-opacity-50' : ''}`}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  className={`input-field pr-10 transition-all duration-300 
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-primary-500 focus:ring-primary-500 hover:border-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-primary-500 hover:border-gray-400'}`}
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={`h-4 w-4 rounded transition-colors duration-200
                    ${theme === 'dark'
                      ? 'border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500 focus:ring-offset-gray-800'
                      : 'border-gray-300 text-primary-600 focus:ring-primary-500'}`}
                />
                <label htmlFor="remember-me" className={`ml-2 block text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-300">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white
                  bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700
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
                      Signing in...
                    </span>
                  ) : (
                    'Sign in'
                  )}
                </span>
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {isRegistering ? 'Sign in instead' : 'Create an account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 