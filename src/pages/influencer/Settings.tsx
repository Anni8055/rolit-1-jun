import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function InfluencerSettings() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    socialMedia: {
      instagram: '',
      youtube: '',
      tiktok: '',
      twitter: ''
    },
    categories: [] as string[],
    location: '',
    languages: [] as string[],
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name.startsWith('social.')) {
        const platform = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          socialMedia: {
            ...prev.socialMedia,
            [platform]: checkbox.checked
          }
        }));
      } else if (name.startsWith('category.')) {
        const category = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          categories: checkbox.checked
            ? [...prev.categories, category]
            : prev.categories.filter(c => c !== category)
        }));
      } else if (name.startsWith('language.')) {
        const language = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          languages: checkbox.checked
            ? [...prev.languages, language]
            : prev.languages.filter(l => l !== language)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [name]: checkbox.checked
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement settings update
    console.log('Settings updated:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Influencer Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Social Media Profiles</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Instagram</label>
              <input
                type="text"
                name="socialMedia.instagram"
                value={formData.socialMedia.instagram}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                placeholder="@username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">YouTube</label>
              <input
                type="text"
                name="socialMedia.youtube"
                value={formData.socialMedia.youtube}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                placeholder="Channel URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">TikTok</label>
              <input
                type="text"
                name="socialMedia.tiktok"
                value={formData.socialMedia.tiktok}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                placeholder="@username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Twitter</label>
              <input
                type="text"
                name="socialMedia.twitter"
                value={formData.socialMedia.twitter}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                placeholder="@username"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Content Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Fashion', 'Beauty', 'Lifestyle', 'Food', 'Travel', 'Tech', 'Fitness', 'Gaming', 'Education'].map(category => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  name={`category.${category.toLowerCase()}`}
                  checked={formData.categories.includes(category.toLowerCase())}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm">{category}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Languages</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese'].map(language => (
              <div key={language} className="flex items-center">
                <input
                  type="checkbox"
                  name={`language.${language.toLowerCase()}`}
                  checked={formData.languages.includes(language.toLowerCase())}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm">{language}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="email"
                checked={formData.notifications.email}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm">Email Notifications</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="push"
                checked={formData.notifications.push}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm">Push Notifications</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="sms"
                checked={formData.notifications.sms}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm">SMS Notifications</label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-lg font-medium hover:from-primary-700 hover:to-blue-700 transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
} 