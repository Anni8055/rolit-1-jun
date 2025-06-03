import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router-dom';
import { 
  UserCircleIcon, 
  BuildingOffice2Icon, 
  GlobeAltIcon, 
  MapPinIcon, 
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface BrandStats {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalInfluencers: number;
  averageEngagement: string;
  totalReach: string;
}

export default function BrandProfile() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Sample brand data
  const [brandData, setBrandData] = useState({
    name: user?.name || 'Your Brand Name',
    logo: user?.avatar || '',
    website: 'https://yourbrand.com',
    industry: 'Technology',
    founded: '2020',
    location: 'San Francisco, CA',
    employeeCount: '10-50',
    description: 'We are a technology company focused on creating innovative solutions that help businesses grow and succeed in the digital landscape.',
    socialLinks: {
      instagram: 'https://instagram.com/yourbrand',
      twitter: 'https://twitter.com/yourbrand',
      facebook: 'https://facebook.com/yourbrand',
      linkedin: 'https://linkedin.com/company/yourbrand'
    }
  });

  // Sample brand statistics
  const [stats, setStats] = useState<BrandStats>({
    totalCampaigns: 15,
    activeCampaigns: 5,
    completedCampaigns: 10,
    totalInfluencers: 47,
    averageEngagement: '4.8%',
    totalReach: '2.3M',
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes here (API call would go here)
      toast.success('Profile updated successfully');
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBrandData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBrandData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const handleLogoUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      // This would be replaced with actual upload logic
      toast.success('Logo uploaded successfully');
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h2 className={`text-2xl font-bold leading-7 ${theme === 'dark' ? 'text-white' : 'text-gray-900'} sm:text-3xl sm:truncate`}>
              Brand Profile
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={handleEditToggle}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${isEditing 
                  ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                  : 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {isEditing ? (
                <>
                  <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Save Changes
                </>
              ) : (
                <>
                  <PencilSquareIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Edit Profile
                </>
              )}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <XMarkIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Brand Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Personal details and company information.</p>
            </div>
            
            {/* Logo Upload */}
            <div className="relative group">
              {brandData.logo ? (
                <img 
                  src={brandData.logo} 
                  alt="Brand Logo" 
                  className="h-24 w-24 rounded-full object-cover border-2 border-primary-500"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center">
                  <BuildingOffice2Icon className="h-12 w-12 text-white" aria-hidden="true" />
                </div>
              )}
              
              {isEditing && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
                  onClick={handleLogoUpload}
                >
                  {isUploading ? (
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <span className="text-white text-xs font-medium">Update Logo</span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700">
            <dl>
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Brand name</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="name" 
                      value={brandData.name} 
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    brandData.name
                  )}
                </dd>
              </div>
              
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="website" 
                      value={brandData.website} 
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    <a href={brandData.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center">
                      <GlobeAltIcon className="h-4 w-4 mr-1" /> {brandData.website}
                    </a>
                  )}
                </dd>
              </div>
              
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Industry</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="industry" 
                      value={brandData.industry} 
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    brandData.industry
                  )}
                </dd>
              </div>
              
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Founded</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="founded" 
                      value={brandData.founded} 
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    brandData.founded
                  )}
                </dd>
              </div>
              
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="location" 
                      value={brandData.location} 
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                      {brandData.location}
                    </div>
                  )}
                </dd>
              </div>
              
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Company size</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="employeeCount" 
                      value={brandData.employeeCount} 
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    brandData.employeeCount + ' employees'
                  )}
                </dd>
              </div>
              
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">About</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <textarea 
                      name="description" 
                      rows={4} 
                      value={brandData.description} 
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    brandData.description
                  )}
                </dd>
              </div>
              
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Social media</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 space-y-3">
                  {isEditing ? (
                    <div className="space-y-3">
                      {Object.entries(brandData.socialLinks).map(([platform, url]) => (
                        <div key={platform} className="flex items-center">
                          <span className="w-20 text-gray-500 dark:text-gray-400 capitalize">{platform}:</span>
                          <input 
                            type="text" 
                            name={platform} 
                            value={url} 
                            onChange={handleSocialLinkChange}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {Object.entries(brandData.socialLinks).map(([platform, url]) => (
                        <a 
                          key={platform}
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                        >
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </a>
                      ))}
                    </div>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        {/* Statistics Section */}
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Campaign Statistics</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Your campaign performance and engagement metrics.</p>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-200 text-lg font-bold">{stats.totalCampaigns}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Campaigns</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Overall campaigns created</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-200 text-lg font-bold">{stats.activeCampaigns}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Campaigns</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Currently running</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-200 text-lg font-bold">{stats.completedCampaigns}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Completed</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Finished campaigns</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-200 text-lg font-bold">{stats.totalInfluencers}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Influencers</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Collaborations to date</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                      <span className="text-pink-600 dark:text-pink-200 text-lg font-bold">{stats.averageEngagement}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Avg. Engagement</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Engagement rate</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-200 text-lg font-bold">{stats.totalReach}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Reach</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Audience reached</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link 
                  to="/brand/analytics" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  View Detailed Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 