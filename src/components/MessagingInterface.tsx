import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  PaperAirplaneIcon, 
  BellIcon, 
  UserCircleIcon,
  ChevronDownIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  avatar: string;
  description: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

export default function MessagingInterface() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample users data
  const users: User[] = [
    {
      id: '1',
      name: 'fashion_influencer',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      description: 'Fashion and lifestyle blogger'
    },
    {
      id: '2',
      name: 'tech_reviewer',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      description: 'Tech reviews and unboxing'
    },
    {
      id: '3',
      name: 'travel_blogger',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      description: 'Exploring the world'
    },
    {
      id: '4',
      name: 'fitness_coach',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      description: 'Helping you get fit'
    },
    {
      id: '5',
      name: 'food_critic',
      avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
      description: 'Reviewing restaurants'
    }
  ];

  // Sample messages data
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: '1-1',
        text: 'Have you tried the new features?',
        sender: 'user',
        timestamp: '03:12 PM'
      },
      {
        id: '1-2',
        text: 'That sounds like a great opportunity.',
        sender: 'other',
        timestamp: '03:17 PM'
      },
      {
        id: '1-3',
        text: "Hey, how's it going?",
        sender: 'user',
        timestamp: '03:22 PM'
      },
      {
        id: '1-4',
        text: 'Your latest content was amazing!',
        sender: 'user',
        timestamp: '03:27 PM'
      },
      {
        id: '1-5',
        text: "Let me know if you're interested in this opportunity.",
        sender: 'user',
        timestamp: '03:32 PM'
      }
    ]
  });

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedUser) return;
    
    const newMessage: Message = {
      id: `${selectedUser.id}-${Date.now()}`,
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage]
    }));
    
    setMessageText('');
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Left sidebar - User list */}
      <div className="w-1/4 min-w-[320px] border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Messages</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg pl-10 pr-4 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <h2 className="px-4 pt-4 pb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Conversations</h2>
          <div className="space-y-1">
            {filteredUsers.map(user => (
              <div 
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  selectedUser?.id === user.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-12 w-12 rounded-full object-cover flex-shrink-0" 
                />
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right side - Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat header */}
            <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={selectedUser.avatar} 
                  alt={selectedUser.name} 
                  className="h-10 w-10 rounded-full object-cover" 
                />
                <div className="ml-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedUser.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <BellIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
            
            {/* Messages area */}
            <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-900">
              <div className="space-y-4">
                {(messages[selectedUser.id] || []).map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'other' && (
                      <img 
                        src={selectedUser.avatar}
                        alt={selectedUser.name}
                        className="h-10 w-10 rounded-full object-cover mr-3 flex-shrink-0"
                      />
                    )}
                    <div 
                      className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-primary-500 text-white rounded-br-none ml-auto' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' 
                          ? 'text-primary-100' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>{message.timestamp}</p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="ml-3 flex-shrink-0">
                        <span className="inline-block h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-800 text-center leading-10 text-primary-800 dark:text-primary-200 font-medium">
                          You
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-transparent border-0 focus:outline-none text-gray-800 dark:text-gray-200"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className={`ml-2 p-2 rounded-full ${
                    messageText.trim() 
                      ? 'bg-primary-500 hover:bg-primary-600 text-white' 
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  } transition-colors`}
                >
                  <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <UserCircleIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No conversation selected</h2>
              <p className="text-gray-500 dark:text-gray-400">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 