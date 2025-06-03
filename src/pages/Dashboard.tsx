import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Campaign {
  id: string;
  title: string;
  status: 'active' | 'pending' | 'completed';
  budget: number;
  deadline: string;
  applicants: number;
  impressions: number;
}

interface Message {
  id: string;
  sender: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  avatar: string;
}

interface InfluencerApplication {
  id: string;
  name: string;
  category: string;
  followers: number;
  campaign: string;
  avatar: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'messages'>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  // Mock data - replace with actual API calls
  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Summer Collection Launch',
      status: 'active',
      budget: 5000,
      deadline: '2024-06-30',
      applicants: 12,
      impressions: 125000,
    },
    {
      id: '2',
      title: 'Product Review Campaign',
      status: 'pending',
      budget: 2000,
      deadline: '2024-07-15',
      applicants: 5,
      impressions: 45000,
    },
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Sarah Johnson',
      preview: 'Hi, I would love to collaborate on your summer collection...',
      timestamp: '2h ago',
      unread: true,
      avatar: '/influencer1.jpg',
    },
    {
      id: '2',
      sender: 'Mike Chen',
      preview: 'Thank you for your interest in our campaign...',
      timestamp: '1d ago',
      unread: false,
      avatar: '/influencer2.jpg',
    },
  ];

  const applications: InfluencerApplication[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      category: 'Fashion & Lifestyle',
      followers: 125000,
      campaign: 'Summer Collection Campaign',
      avatar: '/influencer1.jpg',
    },
    {
      id: '2',
      name: 'Mike Williams',
      category: 'Tech Reviews',
      followers: 89000,
      campaign: 'Product Launch Campaign',
      avatar: '/influencer2.jpg',
    },
  ];

  const performanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Impressions',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-8">
              {/* Stats cards */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <i className="fas fa-bullhorn text-2xl text-primary-600"></i>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Active Campaigns</dt>
                          <dd className="text-lg font-semibold text-gray-900">{campaigns.filter(c => c.status === 'active').length}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <i className="fas fa-users text-2xl text-primary-600"></i>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Applicants</dt>
                          <dd className="text-lg font-semibold text-gray-900">{campaigns.reduce((acc, c) => acc + c.applicants, 0)}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <i className="fas fa-eye text-2xl text-primary-600"></i>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Impressions</dt>
                          <dd className="text-lg font-semibold text-gray-900">{campaigns.reduce((acc, c) => acc + c.impressions, 0).toLocaleString()}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <i className="fas fa-wallet text-2xl text-primary-600"></i>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Wallet Balance</dt>
                          <dd className="text-lg font-semibold text-gray-900">$12,450</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Graph */}
              <div className="mt-8 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Campaign Performance</h3>
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    >
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                      <option value="90d">Last 3 Months</option>
                    </select>
                  </div>
                  <div className="h-96">
                    <Line data={performanceData} options={{ maintainAspectRatio: false }} />
                  </div>
                </div>
              </div>

              {/* Recent Applications */}
              <div className="mt-8 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Recent Applications</h3>
                    <a href="/influencers" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                      View All
                    </a>
                  </div>
                  <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                      {applications.map((application) => (
                        <li key={application.id} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img className="h-8 w-8 rounded-full" src={application.avatar} alt="" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{application.name}</p>
                              <p className="text-sm text-gray-500">{application.category} • {application.followers.toLocaleString()} followers</p>
                              <p className="text-sm text-gray-500">{application.campaign}</p>
                            </div>
                            <div>
                              <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                Accept
                              </button>
                              <button className="ml-2 inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                Decline
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recent Messages */}
              <div className="mt-8 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Recent Messages</h3>
                    <a href="/messages" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                      View All
                    </a>
                  </div>
                  <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                      {messages.map((message) => (
                        <li key={message.id} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img className="h-8 w-8 rounded-full" src={message.avatar} alt="" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={`text-sm font-medium ${message.unread ? 'text-gray-900' : 'text-gray-500'}`}>
                                  {message.sender}
                                </p>
                                <p className="text-sm text-gray-500">{message.timestamp}</p>
                              </div>
                              <p className="text-sm text-gray-500">{message.preview}</p>
                              {message.unread && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                  New
                                </span>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 