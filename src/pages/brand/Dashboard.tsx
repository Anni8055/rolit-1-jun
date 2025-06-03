import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Campaign {
  id: string;
  title: string;
  status: 'active' | 'pending' | 'completed';
  influencers: number;
  budget: number;
  engagement: number;
  deadline: string;
}

interface AnalyticsData {
  totalCampaigns: number;
  activeCampaigns: number;
  totalInfluencers: number;
  totalBudget: number;
  averageEngagement: number;
  totalReach: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
}

export default function BrandDashboard() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');

  // Sample data - replace with actual API calls
  const analyticsData: AnalyticsData = {
    totalCampaigns: 12,
    activeCampaigns: 5,
    totalInfluencers: 45,
    totalBudget: 25000,
    averageEngagement: 8.5,
    totalReach: 250000,
    totalImpressions: 350000,
    totalClicks: 12000,
    totalConversions: 1500,
    totalRevenue: 45000
  };

  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Summer Collection Launch',
      status: 'active',
      influencers: 8,
      budget: 5000,
      engagement: 8.2,
      deadline: '2024-06-30'
    },
    {
      id: '2',
      title: 'Product Review Campaign',
      status: 'pending',
      influencers: 5,
      budget: 3000,
      engagement: 0,
      deadline: '2024-07-15'
    },
    {
      id: '3',
      title: 'Brand Awareness',
      status: 'completed',
      influencers: 12,
      budget: 8000,
      engagement: 9.1,
      deadline: '2024-05-30'
    }
  ];

  // Performance chart data
  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: [7.2, 8.1, 8.5, 8.8],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4
      },
      {
        label: 'Reach',
        data: [200000, 220000, 240000, 250000],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4
      }
    ]
  };

  // Campaign status distribution data
  const campaignStatusData = {
    labels: ['Active', 'Pending', 'Completed'],
    datasets: [
      {
        data: [5, 3, 4],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)'
        ]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="min-h-full">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  timeRange === '7d'
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                7D
              </button>
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  timeRange === '30d'
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                30D
              </button>
              <button
                onClick={() => setTimeRange('90d')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  timeRange === '90d'
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                90D
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stats Cards */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="fas fa-bullhorn text-2xl text-primary-600"></i>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Campaigns</dt>
                      <dd className="text-lg font-semibold text-gray-900">{analyticsData.activeCampaigns}</dd>
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
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Influencers</dt>
                      <dd className="text-lg font-semibold text-gray-900">{analyticsData.totalInfluencers}</dd>
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
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Reach</dt>
                      <dd className="text-lg font-semibold text-gray-900">{analyticsData.totalReach.toLocaleString()}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="fas fa-dollar-sign text-2xl text-primary-600"></i>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Budget</dt>
                      <dd className="text-lg font-semibold text-gray-900">${analyticsData.totalBudget.toLocaleString()}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h3>
              <Line data={performanceData} options={chartOptions} />
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Status Distribution</h3>
              <Doughnut data={campaignStatusData} options={chartOptions} />
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Active Campaigns</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Campaign
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Influencers
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Budget
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Engagement
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Deadline
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {campaigns.map((campaign) => (
                        <tr key={campaign.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {campaign.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              campaign.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : campaign.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {campaign.influencers}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${campaign.budget.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {campaign.engagement}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(campaign.deadline).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 