import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', path: '/brand/dashboard', icon: 'fas fa-home' },
  { name: 'Campaigns', path: '/brand/campaigns', icon: 'fas fa-bullhorn' },
  { name: 'Influencers', path: '/brand/influencers', icon: 'fas fa-users' },
  { name: 'Analytics', path: '/brand/analytics', icon: 'fas fa-chart-bar' }
];

interface BrandLayoutProps {
  children: React.ReactNode;
}

export default function BrandLayout({ children }: BrandLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src={user?.avatar || 'https://via.placeholder.com/40'}
                alt={user?.name || 'User'}
              />
              <span className="ml-3 text-lg font-medium text-gray-900">{user?.name || 'Brand'}</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === item.path
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <i className={`${item.icon} mr-3 flex-shrink-0 h-6 w-6`}></i>
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex h-16 items-center px-4 border-b border-gray-200">
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src={user?.avatar || 'https://via.placeholder.com/40'}
                alt={user?.name || 'User'}
              />
              <span className="ml-3 text-lg font-medium text-gray-900">{user?.name || 'Brand'}</span>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === item.path
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <i className={`${item.icon} mr-3 flex-shrink-0 h-6 w-6`}></i>
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <main className="py-6">
          {children}
        </main>
      </div>
    </div>
  );
} 