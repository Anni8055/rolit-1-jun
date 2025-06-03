import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router-dom';
import { 
  UserCircleIcon, 
  GlobeAltIcon, 
  MapPinIcon, 
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  CameraIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface SocialMetrics {
  followers: string;
  engagement: string;
  avgLikes: string;
  avgComments: string;
  platforms: Array<{
    name: string;
    url: string;
    followers: string;
    engagement: string;
  }>;
}

export default function InfluencerProfile() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Sample influencer data
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Jane Doe',
    avatar: user?.avatar || '',
    bio: 'Lifestyle and tech content creator passionate about sustainable living and innovative products.',
    location: 'Los Angeles, CA',
    categories: ['Lifestyle', 'Technology', 'Sustainable Living'],
    website: 'https://janedoe.com',
    age: '28',
    gender: 'Female',
    languages: ['English', 'Spanish'],
    rate: '$500 - $1,500 per post'
  });

  // Sample social media metrics
  const [socialMetrics, setSocialMetrics] = useState<SocialMetrics>({
    followers: '125K',
    engagement: '4.2%',
    avgLikes: '5.8K',
    avgComments: '348',
    platforms: [
      {
        name: 'Instagram',
        url: 'https://instagram.com/janedoe',
        followers: '87K',
        engagement: '3.8%'
      },
      {
        name: 'TikTok',
        url: 'https://tiktok.com/@janedoe',
        followers: '65K',
        engagement: '6.5%'
      },
      {
        name: 'YouTube',
        url: 'https://youtube.com/c/janedoe',
        followers: '32K',
        engagement: '2.9%'
      }
    ]
  });

  // Content examples
  const [contentExamples, setContentExamples] = useState([
    {
      id: 1,
      platform: 'Instagram',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      caption: 'Sharing my morning routine with @techbrand\'s new smart blender! #ad',
      engagement: '12K likes, 832 comments',
      date: '2 weeks ago'
    },
    {
      id: 2,
      platform: 'TikTok',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      caption: 'Three sustainable swaps that changed my life! #zerowaste',
      engagement: '250K views, 18K likes',
      date: '1 month ago'
    },
    {
      id: 3,
      platform: 'YouTube',
      imageUrl: 'https://images.unsplash.com/photo-1484972759836-b93f9ef2b293?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      caption: 'I lived zero waste for 30 days - here\'s what happened',
      engagement: '128K views, 12K likes',
      date: '2 months ago'
    }
  ]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes here (API call would go here)
      toast.success('Profile updated successfully');
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field: string, value: string) => {
    if (field === 'categories' || field === 'languages') {
      const arrayValue = value.split(',').map(item => item.trim());
      setProfileData(prev => ({
        ...prev,
        [field]: arrayValue
      }));
    }
  };

  const handleAvatarUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      // This would be replaced with actual upload logic
      toast.success('Profile photo uploaded successfully');
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h2 className={`text-2xl font-bold leading-7 ${theme === 'dark' ? 'text-white' : 'text-gray-900'} sm:text-3xl sm:truncate`}>
              Influencer Profile
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
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Profile Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Personal details and platform information.</p>
            </div>
            
            {/* Avatar Upload */}
            <div className="relative group">
              {profileData.avatar ? (
                <img 
                  src={profileData.avatar} 
                  alt="Profile" 
                  className="h-24 w-24 rounded-full object-cover border-2 border-primary-500"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 flex items-center justify-center">
                  <UserCircleIcon className="h-12 w-12 text-white" aria-hidden="true" />
                </div>
              )}
              
              {isEditing && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
                  onClick={handleAvatarUpload}
                >
                  {isUploading ? (
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <span className="text-white text-xs font-medium">Update Photo</span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700">
            <dl>
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="name" 
                      value={profileData.name} 
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    profileData.name
                  )}
                </dd>
              </div>
              
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <textarea 
                      name="bio" 
                      rows={3} 
                      value={profileData.bio} 
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    profileData.bio
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
                      value={profileData.location} 
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                      {profileData.location}
                    </div>
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
                      value={profileData.website} 
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center">
                      <GlobeAltIcon className="h-4 w-4 mr-1" /> {profileData.website}
                    </a>
                  )}
                </dd>
              </div>
              
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Categories</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="categories" 
                      value={profileData.categories.join(', ')} 
                      onChange={(e) => handleArrayChange('categories', e.target.value)}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      placeholder="Separate with commas"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profileData.categories.map((category, index) => (
                        <span key={index} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                </dd>
              </div>
              
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Demographics</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Age</span>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="age" 
                          value={profileData.age} 
                          onChange={handleChange}
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                        />
                      ) : (
                        <span>{profileData.age}</span>
                      )}
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Gender</span>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="gender" 
                          value={profileData.gender} 
                          onChange={handleChange}
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                        />
                      ) : (
                        <span>{profileData.gender}</span>
                      )}
                    </div>
                  </div>
                </dd>
              </div>
              
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Languages</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="languages" 
                      value={profileData.languages.join(', ')} 
                      onChange={(e) => handleArrayChange('languages', e.target.value)}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      placeholder="Separate with commas"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profileData.languages.map((language, index) => (
                        <span key={index} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {language}
                        </span>
                      ))}
                    </div>
                  )}
                </dd>
              </div>
              
              <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Collaboration Rate</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="rate" 
                      value={profileData.rate} 
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                  ) : (
                    profileData.rate
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        {/* Social Media Metrics */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Social Media Metrics</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Your reach and engagement across platforms.</p>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">Total Followers</dt>
                  <dd className="mt-1 text-xl font-semibold text-primary-600 dark:text-primary-400">{socialMetrics.followers}</dd>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">Avg. Engagement</dt>
                  <dd className="mt-1 text-xl font-semibold text-green-600 dark:text-green-400">{socialMetrics.engagement}</dd>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">Avg. Likes</dt>
                  <dd className="mt-1 text-xl font-semibold text-blue-600 dark:text-blue-400">{socialMetrics.avgLikes}</dd>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">Avg. Comments</dt>
                  <dd className="mt-1 text-xl font-semibold text-purple-600 dark:text-purple-400">{socialMetrics.avgComments}</dd>
                </div>
              </div>
              
              {/* Platform breakdown */}
              <h4 className="text-base font-medium text-gray-900 dark:text-white mt-8 mb-4">Platform Breakdown</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {socialMetrics.platforms.map((platform, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 flex items-center justify-center">
                            <DevicePhoneMobileIcon className="h-5 w-5 text-white" aria-hidden="true" />
                          </div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{platform.name}</dt>
                            <dd>
                              <div className="flex justify-between items-baseline">
                                <div className="text-lg font-semibold text-gray-900 dark:text-white">{platform.followers}</div>
                                <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                                  {platform.engagement} engagement
                                </div>
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                      <div className="mt-4">
                        <a 
                          href={platform.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline"
                        >
                          View Profile →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Examples */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Content Examples</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Recent content that showcase your style.</p>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {contentExamples.map((content) => (
                  <div key={content.id} className="bg-gray-50 dark:bg-gray-700 overflow-hidden rounded-lg shadow-sm">
                    <div className="relative pb-[100%]">
                      <img 
                        src={content.imageUrl} 
                        alt={`Content from ${content.platform}`} 
                        className="absolute h-full w-full object-cover"
                      />
                      <div className="absolute top-0 right-0 m-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 bg-opacity-75 text-white">
                          {content.platform}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-900 dark:text-white truncate mb-2">{content.caption}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 dark:text-gray-400">{content.engagement}</span>
                        <span className="text-gray-500 dark:text-gray-400">{content.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {isEditing && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <CameraIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                    Add Content Example
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 