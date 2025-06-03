import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: 'tachometer-alt', label: 'Dashboard' },
    { path: '/campaigns', icon: 'bullhorn', label: 'Campaigns' },
    { path: '/influencers', icon: 'users', label: 'Influencers' },
    { path: '/messages', icon: 'comment-dots', label: 'Messages' },
    { path: '/wallet', icon: 'wallet', label: 'Wallet & Payments' },
    { path: '/analytics', icon: 'chart-line', label: 'Analytics' },
    { path: '/settings', icon: 'cog', label: 'Settings' },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="BrandConnect"
            />
            <span className="ml-2 text-xl font-semibold text-gray-900">BrandConnect</span>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <i className={`fas fa-${item.icon} mr-3 flex-shrink-0 h-6 w-6`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src={user?.avatar || '/default-avatar.png'}
                  alt=""
                />
                <span className="ml-2 text-sm font-medium text-gray-700">{user?.name || 'User'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
} 