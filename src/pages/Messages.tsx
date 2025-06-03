import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { 
  MagnifyingGlassIcon, 
  PaperAirplaneIcon, 
  XMarkIcon,
  ArrowPathIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

// Mock the data for demo - in production would be replaced with real API calls
interface User {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

const Messages: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedContact, setSelectedContact] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchDebounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Mock data setup
  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Simulate loading users
    setLoading(true);
    setTimeout(() => {
      // Mock contacts
      const mockContacts: User[] = [
        { id: 'user1', username: 'fashion_influencer', bio: 'Fashion and lifestyle blogger', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: 'user2', username: 'tech_reviewer', bio: 'Tech reviews and unboxing', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 'user3', username: 'travel_blogger', bio: 'Exploring the world', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
        { id: 'user4', username: 'fitness_coach', bio: 'Helping you get fit', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { id: 'user5', username: 'food_critic', bio: 'Reviewing restaurants', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
      ];
      
      setContacts(mockContacts);
      setLoading(false);
    }, 1000);
  }, [isAuthenticated]);

  // Handle search with debounce
  useEffect(() => {
    if (searchDebounceTimer.current) {
      clearTimeout(searchDebounceTimer.current);
    }
    
    if (searchTerm) {
      setSearchLoading(true);
      searchDebounceTimer.current = setTimeout(() => {
        // Filter contacts based on search term
        const filtered = contacts.filter(contact => 
          contact.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (contact.bio && contact.bio.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setSearchResults(filtered);
        setSearchLoading(false);
      }, 300);
    } else {
      setSearchResults([]);
    }
    
    return () => {
      if (searchDebounceTimer.current) {
        clearTimeout(searchDebounceTimer.current);
      }
    };
  }, [searchTerm, contacts]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle selecting a contact
  const handleContactSelect = (contact: User) => {
    setSelectedContact(contact);
    setSearchTerm('');
    setSearchResults([]);
    setLoadingMessages(true);
    
    // Simulate loading messages
    setTimeout(() => {
      // Generate mock messages
      const mockMessages: Message[] = [];
      const numMessages = Math.floor(Math.random() * 10) + 5;
      
      for (let i = 0; i < numMessages; i++) {
        const isFromUser = Math.random() > 0.5;
        mockMessages.push({
          id: `msg-${i}`,
          senderId: isFromUser ? user?.id || 'current-user' : contact.id,
          content: isFromUser 
            ? getRandomUserMessage() 
            : getRandomContactMessage(contact.username),
          timestamp: new Date(Date.now() - i * 1000 * 60 * 5).toISOString()
        });
      }
      
      // Sort by timestamp (oldest first)
      mockMessages.sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      
      setMessages(mockMessages);
      setLoadingMessages(false);
    }, 800);
  };

  // Handle sending a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !selectedContact) return;
    
    // Show sending indicator
    setIsSending(true);
    
    // Simulate sending a message
    setTimeout(() => {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: user?.id || 'current-user',
        content: message.trim(),
        timestamp: new Date().toISOString()
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      setIsSending(false);
      
      // Simulate response after a delay
      setTimeout(() => {
        if (selectedContact) {
          const responseMessage: Message = {
            id: `msg-${Date.now() + 1}`,
            senderId: selectedContact.id,
            content: getRandomReply(),
            timestamp: new Date().toISOString()
          };
          
          setMessages(prevMessages => [...prevMessages, responseMessage]);
        }
      }, 1500 + Math.random() * 3000);
    }, 500);
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Helper functions for mock messages
  const getRandomUserMessage = () => {
    const messages = [
      "Hey, how's it going?",
      "I wanted to discuss our collaboration.",
      "What do you think about my latest post?",
      "Are you available for a campaign next month?",
      "I'd love to hear your thoughts on this product.",
      "Have you tried the new features?",
      "Can we schedule a call to discuss the details?",
      "I'm looking for influencers in your niche.",
      "Your latest content was amazing!",
      "Let me know if you're interested in this opportunity."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getRandomContactMessage = (username: string) => {
    const messages = [
      "Hi there! What can I help you with?",
      "Thanks for reaching out!",
      "I'd be interested in learning more about your brand.",
      "Let me check my schedule and get back to you.",
      "That sounds like a great opportunity.",
      "I've been looking for collaborations like this.",
      "My audience would love your product.",
      "What's your budget for this campaign?",
      "I'm currently accepting new partnerships.",
      "Let's discuss the deliverables."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getRandomReply = () => {
    const replies = [
      "That sounds great!",
      "I'd be happy to discuss this further.",
      "When did you have in mind?",
      "Could you provide more details?",
      "I'm interested. What's the next step?",
      "Let me think about it and get back to you.",
      "That works for me.",
      "I'll check my calendar and confirm.",
      "Thanks for the information.",
      "I'll send you a proposal soon."
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-6xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden min-h-[80vh]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        {/* Contacts sidebar */}
        <div className={`border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            
            {/* Search bar */}
            <div className={`relative mb-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className={`pl-10 pr-4 py-2 w-full rounded-lg border-none ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-white placeholder:text-gray-400' 
                    : 'bg-gray-100 text-gray-800 placeholder:text-gray-500'
                } focus:ring-primary-500`}
              />
              
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </div>
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-center py-8">
                <ArrowPathIcon className="h-8 w-8 text-primary-500 animate-spin" />
              </div>
            )}
            
            {/* Search results */}
            {searchTerm && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Search Results</h3>
                {searchLoading ? (
                  <div className="flex justify-center py-4">
                    <ArrowPathIcon className="h-6 w-6 text-primary-500 animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {searchResults.length === 0 ? (
                      <p className="text-sm text-gray-500 py-2">No users found</p>
                    ) : (
                      searchResults.map(contact => (
                        <button
                          key={contact.id}
                          onClick={() => handleContactSelect(contact)}
                          className={`flex items-center p-2 w-full rounded-lg transition-colors ${
                            theme === 'dark'
                              ? 'hover:bg-gray-700'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <img 
                            src={contact.avatar} 
                            alt={contact.username} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-3 text-left">
                            <p className="font-medium">{contact.username}</p>
                            {contact.bio && (
                              <p className="text-sm text-gray-500 truncate">{contact.bio}</p>
                            )}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* Contacts list */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Conversations</h3>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {!loading && contacts.length === 0 ? (
                  <p className="text-sm text-gray-500 py-2">No conversations yet</p>
                ) : (
                  contacts.map(contact => (
                    <button
                      key={contact.id}
                      onClick={() => handleContactSelect(contact)}
                      className={`flex items-center p-2 w-full rounded-lg transition-colors ${
                        selectedContact?.id === contact.id 
                          ? theme === 'dark'
                            ? 'bg-gray-700' 
                            : 'bg-gray-200'
                          : theme === 'dark'
                            ? 'hover:bg-gray-700'
                            : 'hover:bg-gray-100'
                      }`}
                    >
                      <img 
                        src={contact.avatar} 
                        alt={contact.username} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-3 text-left">
                        <p className="font-medium">{contact.username}</p>
                        {contact.bio && (
                          <p className="text-sm text-gray-500 truncate">{contact.bio}</p>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat area */}
        <div className="col-span-2 flex flex-col h-[80vh]">
          {selectedContact ? (
            <>
              {/* Chat header */}
              <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex items-center`}>
                <img 
                  src={selectedContact.avatar} 
                  alt={selectedContact.username} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="font-medium text-lg">{selectedContact.username}</h3>
                  {selectedContact.bio && (
                    <p className="text-sm text-gray-500">{selectedContact.bio}</p>
                  )}
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loadingMessages ? (
                  <div className="flex justify-center items-center h-full">
                    <ArrowPathIcon className="h-8 w-8 text-primary-500 animate-spin" />
                  </div>
                ) : (
                  messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <UserCircleIcon className="h-16 w-16 text-gray-400 mb-2" />
                      <h3 className="text-lg font-medium">No messages yet</h3>
                      <p className="text-gray-500">Send a message to start the conversation</p>
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.senderId === (user?.id || 'current-user') ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.senderId !== (user?.id || 'current-user') && (
                          <img 
                            src={selectedContact.avatar} 
                            alt={selectedContact.username} 
                            className="h-8 w-8 rounded-full object-cover mr-2"
                          />
                        )}
                        <div 
                          className={`max-w-[70%] p-3 rounded-lg ${
                            msg.senderId === (user?.id || 'current-user')
                              ? 'bg-primary-500 text-white rounded-tr-none'
                              : theme === 'dark'
                                ? 'bg-gray-700 text-white rounded-tl-none'
                                : 'bg-gray-200 text-gray-800 rounded-tl-none'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className={`text-xs mt-1 ${
                            msg.senderId === (user?.id || 'current-user')
                              ? 'text-primary-100'
                              : 'text-gray-500'
                          }`}>
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                        {msg.senderId === (user?.id || 'current-user') && (
                          <div className="h-8 w-8 bg-primary-500 rounded-full ml-2 flex items-center justify-center">
                            <span className="text-white text-xs">You</span>
                          </div>
                        )}
                      </div>
                    ))
                  )
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message input */}
              <form 
                onSubmit={handleSendMessage}
                className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex items-center`}
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className={`flex-1 px-4 py-2 rounded-l-lg border-r-0 ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-white text-gray-800 border-gray-300'
                  } focus:ring-primary-500 focus:border-primary-500`}
                  disabled={isSending}
                />
                <button
                  type="submit"
                  disabled={!message.trim() || isSending}
                  className={`px-4 py-2 rounded-r-lg ${
                    !message.trim() || isSending
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-500 hover:bg-primary-600'
                  } text-white transition-colors`}
                >
                  {isSending ? (
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  ) : (
                    <PaperAirplaneIcon className="h-5 w-5" />
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <ChatBubbleLeftRightIcon className="h-12 w-12 text-primary-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your Messages</h2>
              <p className="text-gray-500 max-w-md">
                Select a contact from the list to start chatting or use the search to find someone.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Messages; 