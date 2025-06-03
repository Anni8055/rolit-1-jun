import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface Campaign {
  id: string;
  title: string;
  brand: string;
  logo: string;
  description: string;
  requirements: string[];
  compensation: string;
  deadline: string;
  status: 'active' | 'pending' | 'completed';
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export default function InfluencerCampaigns() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending' | 'completed'>('all');

  // Sample data - replace with actual API calls
  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Summer Fashion Collection',
      brand: 'Fashion Brand X',
      logo: 'https://via.placeholder.com/40',
      description: 'Promote our new summer collection through social media posts and stories.',
      requirements: [
        'Minimum 100K followers',
        '3 Instagram posts',
        '5 Instagram stories',
        '1 YouTube video'
      ],
      compensation: '$1,500',
      deadline: '2023-07-15',
      status: 'active',
      engagement: {
        likes: 2500,
        comments: 150,
        shares: 300
      }
    },
    {
      id: '2',
      title: 'New Fitness Product Launch',
      brand: 'FitLife',
      logo: 'https://via.placeholder.com/40',
      description: 'Review and promote our new fitness product line.',
      requirements: [
        'Minimum 50K followers',
        '2 Instagram posts',
        '1 YouTube review video',
        '1 TikTok video'
      ],
      compensation: '$2,000',
      deadline: '2023-07-22',
      status: 'pending',
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0
      }
    },
    {
      id: '3',
      title: 'Beauty Product Campaign',
      brand: 'Beauty Co.',
      logo: 'https://via.placeholder.com/40',
      description: 'Create content showcasing our new beauty products.',
      requirements: [
        'Minimum 75K followers',
        '4 Instagram posts',
        '3 Instagram stories',
        '1 YouTube tutorial'
      ],
      compensation: '$1,800',
      deadline: '2023-06-30',
      status: 'completed',
      engagement: {
        likes: 3500,
        comments: 200,
        shares: 450
      }
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
          <h1 className="text-2xl font-semibold text-gray-900">Campaigns</h1>
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
                            <img
                              className="h-10 w-10 rounded-full"
                              src={campaign.logo}
                              alt={campaign.brand}
                            />
                            <div className="ml-4">
                              <h3 className="text-sm font-medium text-gray-900">
                                {campaign.title}
                              </h3>
                              <p className="text-sm text-gray-500">{campaign.brand}</p>
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
                              {campaign.compensation}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <button className="text-primary-600 hover:text-primary-500">
                              View details →
                            </button>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">{campaign.description}</p>
                          <div className="mt-2">
                            <h4 className="text-sm font-medium text-gray-900">Requirements:</h4>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-500">
                              {campaign.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>
                          {campaign.status === 'active' && (
                            <div className="mt-4 grid grid-cols-3 gap-4">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-sm font-medium text-gray-900">{campaign.engagement.likes}</p>
                                <p className="text-sm text-gray-500">Likes</p>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-sm font-medium text-gray-900">{campaign.engagement.comments}</p>
                                <p className="text-sm text-gray-500">Comments</p>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-sm font-medium text-gray-900">{campaign.engagement.shares}</p>
                                <p className="text-sm text-gray-500">Shares</p>
                              </div>
                            </div>
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
  );
} 