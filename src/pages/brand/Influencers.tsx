import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface Influencer {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  engagement: number;
  categories: string[];
  platforms: string[];
  location: string;
  languages: string[];
  averageLikes: number;
  averageComments: number;
  averageShares: number;
  pricePerPost: number;
  rating: number;
  reviews: number;
  completedCampaigns: number;
}

export default function BrandInfluencers() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Sample data - replace with actual API calls
  const influencers: Influencer[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      followers: 150000,
      engagement: 4.2,
      categories: ['Fashion', 'Lifestyle', 'Travel'],
      platforms: ['Instagram', 'YouTube', 'TikTok'],
      location: 'New York, USA',
      languages: ['English', 'Spanish'],
      averageLikes: 5000,
      averageComments: 200,
      averageShares: 150,
      pricePerPost: 500,
      rating: 4.8,
      reviews: 24,
      completedCampaigns: 18
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      followers: 250000,
      engagement: 3.8,
      categories: ['Tech', 'Gaming', 'Lifestyle'],
      platforms: ['YouTube', 'Twitch', 'Instagram'],
      location: 'San Francisco, USA',
      languages: ['English', 'Mandarin'],
      averageLikes: 8000,
      averageComments: 300,
      averageShares: 200,
      pricePerPost: 800,
      rating: 4.9,
      reviews: 32,
      completedCampaigns: 25
    },
    {
      id: '3',
      name: 'Emma Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      followers: 80000,
      engagement: 5.1,
      categories: ['Beauty', 'Fashion', 'Lifestyle'],
      platforms: ['Instagram', 'TikTok'],
      location: 'London, UK',
      languages: ['English', 'French'],
      averageLikes: 3000,
      averageComments: 150,
      averageShares: 100,
      pricePerPost: 300,
      rating: 4.7,
      reviews: 15,
      completedCampaigns: 12
    }
  ];

  const categories = ['all', 'Fashion', 'Lifestyle', 'Travel', 'Tech', 'Gaming', 'Beauty'];
  const platforms = ['all', 'Instagram', 'YouTube', 'TikTok', 'Twitch'];

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      influencer.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || influencer.categories.includes(selectedCategory);
    const matchesPlatform = selectedPlatform === 'all' || influencer.platforms.includes(selectedPlatform);
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  return (
    <div className="min-h-full">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Influencers</h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8">
            {/* Search and Filters */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-search text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Search influencers by name or category"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <i className="fas fa-filter mr-2"></i>
                  Filters
                </button>
              </div>

              {/* Filter Options */}
              {showFilters && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Platform</label>
                    <select
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    >
                      {platforms.map(platform => (
                        <option key={platform} value={platform}>
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Influencer Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredInfluencers.map((influencer) => (
                <div
                  key={influencer.id}
                  className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
                >
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={influencer.avatar}
                          alt={influencer.name}
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{influencer.name}</h3>
                        <p className="text-sm text-gray-500">{influencer.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {influencer.categories.map((category) => (
                        <span
                          key={category}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {influencer.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500 truncate">Followers</dt>
                        <dd className="mt-1 text-sm text-gray-900">{influencer.followers.toLocaleString()}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 truncate">Engagement</dt>
                        <dd className="mt-1 text-sm text-gray-900">{influencer.engagement}%</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 truncate">Price per Post</dt>
                        <dd className="mt-1 text-sm text-gray-900">${influencer.pricePerPost}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 truncate">Rating</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <span className="flex items-center">
                            <i className="fas fa-star text-yellow-400 mr-1"></i>
                            {influencer.rating} ({influencer.reviews} reviews)
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {influencer.completedCampaigns} campaigns completed
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 