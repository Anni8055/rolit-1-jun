import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Check if user has previously set theme or use system preference
  const getInitialTheme = (): ThemeType => {
    // Check for stored theme in localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // If no saved theme, use system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<ThemeType>(getInitialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Apply theme class to document when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      // Show transition indicator
      setIsTransitioning(true);
      
      root.classList.add('dark');
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      // Show transition indicator
      setIsTransitioning(true);
      
      root.classList.remove('dark');
      root.classList.remove('dark-theme');
      root.classList.add('light-theme');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Hide transition indicator after transition completes
    const transitionTimeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match this with the CSS transition duration
    
    return () => clearTimeout(transitionTimeout);
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
      {isTransitioning && (
        <div className="fixed inset-0 bg-background bg-opacity-50 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      )}
    </ThemeContext.Provider>
  );
} 