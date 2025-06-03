import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
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
  brand: string;
  logo: string;
  deadline: string;
  compensation: string;
}

interface Message {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  time: string;
}

export default function InfluencerDashboard() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  // Performance chart data
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: [4.2, 3.8, 5.1, 4.9, 6.2, 5.7],
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    }
  };

  // Sample data - replace with actual API calls
  const upcomingCampaigns: Campaign[] = [
    {
      id: '1',
      title: 'Summer Fashion Collection',
      brand: 'Fashion Brand X',
      logo: 'https://via.placeholder.com/40',
      deadline: '2023-07-15',
      compensation: '$1,500',
    },
    {
      id: '2',
      title: 'New Fitness Product Launch',
      brand: 'FitLife',
      logo: 'https://via.placeholder.com/40',
      deadline: '2023-07-22',
      compensation: '$2,000',
    },
  ];

  const recentMessages: Message[] = [
    {
      id: '1',
      sender: 'Beauty Co.',
      avatar: 'https://via.placeholder.com/40',
      message: 'Hey! We loved your last promotion. Would you be interested in...',
      time: '2 hours ago',
    },
    {
      id: '2',
      sender: 'Travel Adventures',
      avatar: 'https://via.placeholder.com/40',
      message: "Thank you for your application. We'd like to discuss details...",
      time: '1 day ago',
    },
  ];

  const earningsData = {
    total: 12500,
    pending: 3000,
    thisMonth: 2500,
    campaigns: 8,
  };

  return (
    <div className="min-h-full">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Influencer Dashboard</h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <i className="fas fa-money-bill-wave text-2xl text-blue-600"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Earnings</dt>
                        <dd className="text-lg font-semibold text-gray-900">${earningsData.total.toLocaleString()}</dd>
                        <dd className="text-sm text-gray-500">${earningsData.thisMonth.toLocaleString()} this month</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <i className="fas fa-bullhorn text-2xl text-green-600"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Campaigns</dt>
                        <dd className="text-lg font-semibold text-gray-900">{earningsData.campaigns}</dd>
                        <dd className="text-sm text-gray-500">2 currently active</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <i className="fas fa-eye text-2xl text-purple-600"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Impressions</dt>
                        <dd className="text-lg font-semibold text-gray-900">284.5K</dd>
                        <dd className="text-sm text-gray-500">+12.3% from last month</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <i className="fas fa-thumbs-up text-2xl text-orange-600"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Avg. Engagement</dt>
                        <dd className="text-lg font-semibold text-gray-900">5.7%</dd>
                        <dd className="text-sm text-gray-500">+0.8% from last month</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Performance Chart */}
              <div className="lg:col-span-2 bg-white shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Performance Overview</h3>
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
                    <Line data={performanceData} options={chartOptions} />
                  </div>
                </div>
              </div>

              {/* Upcoming Campaigns */}
              <div className="bg-white shadow rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Campaigns</h3>
                  <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                      {upcomingCampaigns.map((campaign) => (
                        <li key={campaign.id} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img className="h-8 w-8 rounded-full" src={campaign.logo} alt="" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{campaign.title}</p>
                              <p className="text-sm text-gray-500">{campaign.brand}</p>
                              <p className="text-sm text-gray-500">Deadline: {new Date(campaign.deadline).toLocaleDateString()}</p>
                              <p className="text-sm font-medium text-green-600">{campaign.compensation}</p>
                            </div>
                            <div>
                              <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                View Details
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
              <div className="lg:col-span-2 bg-white shadow rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Messages</h3>
                  <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                      {recentMessages.map((message) => (
                        <li key={message.id} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img className="h-8 w-8 rounded-full" src={message.avatar} alt="" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">{message.sender}</p>
                                <p className="text-sm text-gray-500">{message.time}</p>
                              </div>
                              <p className="text-sm text-gray-500">{message.message}</p>
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