import React from 'react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'brand' | 'influencer';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, role: 'brand' | 'influencer') => Promise<User>;
  logout: () => Promise<void>;
}

const defaultContext: AuthContextType = {
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  login: async () => { throw new Error('Not implemented') },
  register: async () => { throw new Error('Not implemented') },
  logout: async () => { throw new Error('Not implemented') }
};

const AuthContext = createContext<AuthContextType>(defaultContext);

// Using an absolute URL for testing if the proxy isn't working
const API_URL = 'http://localhost:5001/api';

// Flag to use mock implementation instead of real API
const USE_MOCK = true;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user data and token
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      console.log('Attempting login with:', { email });
      
      if (USE_MOCK) {
        // Mock implementation for testing
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        
        // Validate email and password
        if (!email.includes('@') || password.length < 6) {
          throw new Error('Invalid email or password');
        }
        
        // Mock user object
        const mockUser: User = {
          id: '123456',
          name: email.split('@')[0],
          email: email,
          role: email.includes('brand') ? 'brand' : 'influencer'
        };
        
        localStorage.setItem('token', 'mock-token-123');
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        return mockUser;
      }
      
      // Real API implementation  
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);
      
      const responseText = await response.text();
      console.log('Login response text:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Failed to login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: 'brand' | 'influencer'): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      console.log('Attempting registration with:', { name, email, role });
      
      if (USE_MOCK) {
        // Mock implementation for testing
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        // Validate input
        if (!name || !email.includes('@') || password.length < 6) {
          throw new Error('Invalid registration data');
        }
        
        // Mock user object
        const mockUser: User = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          name: name,
          email: email,
          role: role
        };
        
        localStorage.setItem('token', 'mock-token-' + Math.random().toString(36).substr(2, 9));
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        console.log('Mock registration successful:', mockUser);
        return mockUser;
      }
      
      // Real API implementation
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      console.log('Registration response status:', response.status);
      
      const responseText = await response.text();
      console.log('Registration response text:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      if (USE_MOCK) {
        // Mock implementation for testing
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
        toast.success('Successfully logged out');
      } else {
        // Real API implementation
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      setError(error instanceof Error ? error.message : 'Logout failed');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setLoading(false);
    }
  };

  const contextValue = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 