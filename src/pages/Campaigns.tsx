import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  requirements: string;
  status: 'draft' | 'active' | 'completed';
  applicants: number;
}

export default function Campaigns() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Summer Collection Launch',
      description: 'Looking for influencers to promote our new summer collection...',
      budget: 5000,
      deadline: '2024-06-30',
      requirements: '10k+ followers, fashion niche, high engagement rate',
      status: 'active',
      applicants: 12,
    },
    {
      id: '2',
      title: 'Product Review Campaign',
      description: 'Seeking honest reviews for our new product line...',
      budget: 2000,
      deadline: '2024-07-15',
      requirements: '5k+ followers, lifestyle niche, previous review experience',
      status: 'draft',
      applicants: 0,
    },
  ]);

  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    title: '',
    description: '',
    budget: 0,
    deadline: '',
    requirements: '',
    status: 'draft',
  });

  const handleCreateCampaign = () => {
    const campaign: Campaign = {
      id: Date.now().toString(),
      ...newCampaign,
      applicants: 0,
    } as Campaign;
    setCampaigns([...campaigns, campaign]);
    setIsCreateModalOpen(false);
    setNewCampaign({
      title: '',
      description: '',
      budget: 0,
      deadline: '',
      requirements: '',
      status: 'draft',
    });
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-full">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Campaigns</h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary"
            >
              Create Campaign
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <li key={campaign.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium text-primary-600 truncate">
                            {campaign.title}
                          </h3>
                          <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                        </div>
                        <div className="ml-2 flex flex-shrink-0">
                          <p className="text-sm text-gray-500">
                            Budget: ${campaign.budget}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            Deadline: {new Date(campaign.deadline).toLocaleDateString()}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            {campaign.applicants} applicants
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <button className="text-primary-600 hover:text-primary-500">
                            View details →
                          </button>
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

      {/* Create Campaign Modal */}
      <Dialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
              Create New Campaign
            </Dialog.Title>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Campaign Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  className="input-field mt-1"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  className="input-field mt-1"
                />
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Budget
                </label>
                <input
                  type="number"
                  id="budget"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({ ...newCampaign, budget: Number(e.target.value) })}
                  className="input-field mt-1"
                />
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  value={newCampaign.deadline}
                  onChange={(e) => setNewCampaign({ ...newCampaign, deadline: e.target.value })}
                  className="input-field mt-1"
                />
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                  Requirements
                </label>
                <textarea
                  id="requirements"
                  rows={3}
                  value={newCampaign.requirements}
                  onChange={(e) => setNewCampaign({ ...newCampaign, requirements: e.target.value })}
                  className="input-field mt-1"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateCampaign}
                className="btn-primary"
              >
                Create Campaign
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
} 