import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface Campaign {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'completed';
  budget: number;
  deadline: string;
  influencers: number;
  engagement: number;
  requirements: string[];
  targetAudience: string;
  platform: string;
}

export default function BrandCampaigns() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending' | 'completed'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Sample data - replace with actual API calls
  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Summer Collection Launch',
      description: 'Promote our new summer collection through social media influencers.',
      status: 'active',
      budget: 5000,
      deadline: '2024-06-30',
      influencers: 8,
      engagement: 8.2,
      requirements: [
        'Minimum 50K followers',
        '3 Instagram posts',
        '5 Instagram stories',
        '1 YouTube video'
      ],
      targetAudience: 'Fashion-conscious millennials',
      platform: 'Instagram, YouTube'
    },
    {
      id: '2',
      title: 'Product Review Campaign',
      description: 'Get authentic reviews for our new product line.',
      status: 'pending',
      budget: 3000,
      deadline: '2024-07-15',
      influencers: 5,
      engagement: 0,
      requirements: [
        'Minimum 30K followers',
        '2 Instagram posts',
        '1 YouTube review',
        '1 TikTok video'
      ],
      targetAudience: 'Tech-savvy consumers',
      platform: 'Instagram, YouTube, TikTok'
    },
    {
      id: '3',
      title: 'Brand Awareness',
      description: 'Increase brand visibility through influencer partnerships.',
      status: 'completed',
      budget: 8000,
      deadline: '2024-05-30',
      influencers: 12,
      engagement: 9.1,
      requirements: [
        'Minimum 100K followers',
        '4 Instagram posts',
        '3 Instagram stories',
        '2 YouTube videos'
      ],
      targetAudience: 'General audience',
      platform: 'Instagram, YouTube'
    }
  ];

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

  const filteredCampaigns = activeTab === 'all'
    ? campaigns
    : campaigns.filter(campaign => campaign.status === activeTab);

  return (
    <div className="min-h-full">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Campaigns</h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <i className="fas fa-plus mr-2"></i>
              Create Campaign
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {(['all', 'active', 'pending', 'completed'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                      ${activeTab === tab
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }
                    `}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Campaign List */}
            <div className="mt-8">
              <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredCampaigns.map((campaign) => (
                    <li key={campaign.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <i className="fas fa-bullhorn text-2xl text-primary-600"></i>
                            </div>
                            <div className="ml-4">
                              <h3 className="text-sm font-medium text-gray-900">
                                {campaign.title}
                              </h3>
                              <p className="text-sm text-gray-500">{campaign.description}</p>
                            </div>
                          </div>
                          <div className="ml-2 flex flex-shrink-0">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(campaign.status)}`}>
                              {campaign.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <i className="fas fa-calendar mr-1.5"></i>
                              Deadline: {new Date(campaign.deadline).toLocaleDateString()}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <i className="fas fa-money-bill-wave mr-1.5"></i>
                              Budget: ${campaign.budget.toLocaleString()}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <i className="fas fa-users mr-1.5"></i>
                              {campaign.influencers} Influencers
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <i className="fas fa-chart-line mr-1.5"></i>
                              {campaign.engagement}% Engagement
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <button className="text-primary-600 hover:text-primary-500">
                              View details →
                            </button>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {campaign.platform}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {campaign.targetAudience}
                            </span>
                          </div>
                          <div className="mt-2">
                            <h4 className="text-sm font-medium text-gray-900">Requirements:</h4>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-500">
                              {campaign.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>
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

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Create New Campaign
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Campaign Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        ></textarea>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                          Budget
                        </label>
                        <input
                          type="number"
                          name="budget"
                          id="budget"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                          Deadline
                        </label>
                        <input
                          type="date"
                          name="deadline"
                          id="deadline"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
                          Platform
                        </label>
                        <select
                          name="platform"
                          id="platform"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                          <option value="instagram">Instagram</option>
                          <option value="youtube">YouTube</option>
                          <option value="tiktok">TikTok</option>
                          <option value="all">All Platforms</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
                          Target Audience
                        </label>
                        <input
                          type="text"
                          name="targetAudience"
                          id="targetAudience"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Create Campaign
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 