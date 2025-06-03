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
  ArcElement,
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

export default function BrandAnalytics() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D'>('30D');

  // Sample data - replace with actual API calls
  const analyticsData: AnalyticsData = {
    totalCampaigns: 12,
    activeCampaigns: 5,
    totalInfluencers: 45,
    totalBudget: 25000,
    averageEngagement: 4.2,
    totalReach: 1500000,
    totalImpressions: 2500000,
    totalClicks: 45000,
    totalConversions: 1200,
    totalRevenue: 85000,
  };

  // Performance chart data
  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: [3.8, 4.2, 4.5, 4.2],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Reach',
        data: [300000, 350000, 400000, 450000],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
      },
    ],
  };

  // Campaign status distribution
  const campaignStatusData = {
    labels: ['Active', 'Pending', 'Completed'],
    datasets: [
      {
        data: [5, 3, 4],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="min-h-full">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
            <div className="flex space-x-2">
              {(['7D', '30D', '90D'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    timeRange === range
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <i className="fas fa-bullhorn text-2xl text-primary-600"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Campaigns
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {analyticsData.totalCampaigns}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <i className="fas fa-users text-2xl text-green-600"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Influencers
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {analyticsData.totalInfluencers}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <i className="fas fa-chart-line text-2xl text-blue-600"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Average Engagement
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {analyticsData.averageEngagement}%
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <i className="fas fa-dollar-sign text-2xl text-yellow-600"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Revenue
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          ${analyticsData.totalRevenue.toLocaleString()}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h3>
                <Line data={performanceData} options={chartOptions} />
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Status Distribution</h3>
                <Doughnut data={campaignStatusData} options={doughnutOptions} />
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="mt-8 bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Metrics</h3>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Reach</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {analyticsData.totalReach.toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Impressions</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {analyticsData.totalImpressions.toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Clicks</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {analyticsData.totalClicks.toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Conversions</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {analyticsData.totalConversions.toLocaleString()}
                    </dd>
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