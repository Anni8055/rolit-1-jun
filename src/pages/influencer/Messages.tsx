import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { 
  searchUsers, 
  getOrCreateChat, 
  sendMessage as sendSupabaseMessage, 
  subscribeToMessages, 
  User as ChatUser,
  Message as ChatMessage 
} from '../../services/supabaseChatService';
import { seedDemoUsers } from '../../services/supabaseClient';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  unread: boolean;
}

export default function InfluencerMessages() {
  const { theme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ChatUser[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ChatUser | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesListener = useRef<{ unsubscribe: () => void } | null>(null);
  const searchDebounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch all users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        console.log('Fetching all users');
        
        // Use an empty search term to get all users
        const allUsers = await searchUsers('', user.id);
        setConversations(allUsers);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
    
    // Optional: Seed demo users for testing
    seedDemoUsers();
  }, [user?.id]);

  // Handle search input with debounce
  useEffect(() => {
    if (searchDebounceTimer.current) {
      clearTimeout(searchDebounceTimer.current);
    }
    
    if (!user?.id) {
      setSearchResults([]);
      return;
    }
    
    // Only show loading indicator if actually searching
    if (searchTerm) {
      setSearchLoading(true);
    }
    
    searchDebounceTimer.current = setTimeout(async () => {
      try {
        console.log('Searching users with term:', searchTerm);
        const results = await searchUsers(searchTerm, user.id);
        setSearchResults(results);
        setSearchLoading(false);
      } catch (error) {
        console.error('Error searching users:', error);
        setSearchResults([]);
        setSearchLoading(false);
      }
    }, 300);
    
    return () => {
      if (searchDebounceTimer.current) {
        clearTimeout(searchDebounceTimer.current);
      }
    };
  }, [searchTerm, user?.id]);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Cleanup subscription when component unmounts
  useEffect(() => {
    return () => {
      if (messagesListener.current) {
        messagesListener.current.unsubscribe();
      }
    };
  }, []);

  const handleContactSelect = async (contact: ChatUser) => {
    try {
      setSelectedContact(contact);
      setSearchTerm('');
      setSearchResults([]);
      setLoadingMessages(true);
      
      if (!user?.id) {
        console.error('Cannot select contact: User is not logged in');
        setLoadingMessages(false);
        return;
      }
      
      console.log('Selected contact:', contact.username, 'with ID:', contact.id);
      
      // Clean up previous listener
      if (messagesListener.current) {
        messagesListener.current.unsubscribe();
        messagesListener.current = null;
      }
      
      // Get or create chat between current user and selected contact
      console.log('Getting or creating chat for users:', user.id, contact.id);
      const newChatId = await getOrCreateChat(user.id, contact.id);
      
      if (!newChatId) {
        console.error('Failed to get or create chat');
        setLoadingMessages(false);
        return;
      }
      
      console.log('Successfully got/created chat with ID:', newChatId);
      
      setChatId(newChatId);
      setSelectedConversation(contact.id);
      
      // Set up message subscription
      messagesListener.current = subscribeToMessages(newChatId, (chatMessages) => {
        console.log(`Received ${chatMessages.length} messages from subscription`);
        setMessages(chatMessages);
        setLoadingMessages(false);
      });
    } catch (error) {
      console.error('Error selecting contact:', error);
      setLoadingMessages(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !chatId || !user?.id) return;
    
    try {
      setIsSending(true);
      
      const result = await sendSupabaseMessage(chatId, user.id, newMessage);
      
      if (!result.success) {
        console.error('Error sending message:', result.error);
        return;
      }
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for brands..."
              className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
          </div>
          
          {/* Search Results or Conversation List */}
          <div className="space-y-4">
            {searchLoading ? (
              <div className="text-center py-4">Searching...</div>
            ) : searchTerm ? (
              searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => handleContactSelect(result)}
                    className="p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={result.avatar || `https://ui-avatars.com/api/?name=${result.username}`}
                        alt={result.username}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{result.username}</p>
                        <p className="text-xs text-gray-500 truncate">{result.bio || 'No bio'}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">No users found</div>
              )
            ) : loading ? (
              <div className="text-center py-4">Loading conversations...</div>
            ) : conversations.length > 0 ? (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleContactSelect(conversation)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedConversation === conversation.id
                      ? 'bg-primary-50 dark:bg-primary-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={conversation.avatar || `https://ui-avatars.com/api/?name=${conversation.username}`}
                      alt={conversation.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium truncate">{conversation.username}</p>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{conversation.bio || 'No bio'}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">No conversations yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Message View */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedContact.avatar || `https://ui-avatars.com/api/?name=${selectedContact.username}`}
                  alt={selectedContact.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{selectedContact.username}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedContact.role || 'User'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loadingMessages ? (
                <div className="text-center py-4">Loading messages...</div>
              ) : messages.length > 0 ? (
                messages.map((message) => {
                  const isCurrentUser = message.sender_id === user?.id;
                  
                  return (
                    <div 
                      key={message.id}
                      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`rounded-lg py-2 px-4 max-w-sm ${
                        isCurrentUser 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          isCurrentUser ? 'opacity-75' : 'text-gray-500'
                        }`}>
                          {formatTime(message.created_at)}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-4">No messages yet. Start the conversation!</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  disabled={isSending}
                  className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50"
                >
                  {isSending ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
} 