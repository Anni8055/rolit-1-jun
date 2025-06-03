import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { 
  XMarkIcon, 
  PaperAirplaneIcon, 
  ChatBubbleLeftRightIcon, 
  SparklesIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

type UserType = 'brand' | 'influencer' | null;
type QueryStatus = 'initial' | 'query-selection' | 'chat' | 'resolved';

interface QueryOption {
  id: string;
  text: string;
  answer: string;
}

const brandQueries: QueryOption[] = [
  { 
    id: 'brand-1', 
    text: 'How do I find the right influencers?', 
    answer: 'Our platform uses AI-powered matching to connect you with the perfect influencers for your brand. Create a profile, set your preferences, and our system will suggest the best matches based on audience demographics, engagement rates, and content style.' 
  },
  { 
    id: 'brand-2', 
    text: 'What are the payment options?', 
    answer: "We offer secure payment processing through our platform with options including credit cards, PayPal, and bank transfers. All payments are protected by our escrow system, ensuring you only release funds once you're satisfied with the influencer's work." 
  },
  { 
    id: 'brand-3', 
    text: 'How do I create a campaign?', 
    answer: 'To create a campaign, navigate to the "Campaigns" section and click "Create New". Fill in the campaign details including objectives, deliverables, timeline, and budget. You can then invite specific influencers or open it to applications.' 
  },
  { 
    id: 'brand-4', 
    text: 'How do I measure campaign performance?', 
    answer: 'Our analytics dashboard provides real-time insights on your campaign performance. Track metrics like reach, engagement, clicks, conversions, and ROI. You can export detailed reports and compare performance across different influencers and campaigns.' 
  },
  { 
    id: 'brand-5', 
    text: 'How does the fraud detection work?', 
    answer: 'Our AI-powered fraud detection system analyzes engagement patterns, audience demographics, and growth trends to identify fake followers and engagement. Each influencer receives an authenticity score, helping you partner only with genuine influencers who have real influence.' 
  }
];

const influencerQueries: QueryOption[] = [
  { 
    id: 'influencer-1', 
    text: 'How do I get matched with brands?', 
    answer: 'After creating your profile, our AI-powered matching system will connect you with compatible brands. Make sure your profile is complete with your niche, content examples, audience demographics, and engagement metrics.' 
  },
  { 
    id: 'influencer-2', 
    text: 'When and how will I get paid?', 
    answer: 'Payments are processed through our secure platform. Once you complete the deliverables and the brand approves your work, funds are released from escrow to your account. You can withdraw via direct deposit, PayPal, or other supported methods.' 
  },
  { 
    id: 'influencer-3', 
    text: 'How do I negotiate rates?', 
    answer: 'You can negotiate rates directly through our messaging system. We provide market rate insights based on your metrics to help you price fairly. When you receive an offer, you can accept, decline, or counter with your preferred rate.' 
  },
  { 
    id: 'influencer-4', 
    text: 'How do I improve my profile visibility?', 
    answer: 'Keep your profile updated with recent content examples and engagement metrics. Use relevant tags and categories. Complete all profile sections, including your bio, audience demographics, and past collaborations. Higher profile completion leads to better ranking in brand searches.' 
  },
  { 
    id: 'influencer-5', 
    text: 'Can I work with international brands?', 
    answer: 'Yes! Our platform connects influencers with brands globally. Make sure to specify the languages you speak and regions you can create content for in your profile. You can also set your preferences for international collaborations in your account settings.' 
  }
];

const ChatBot: React.FC = () => {
  const { theme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<QueryStatus>('initial');
  const [userType, setUserType] = useState<UserType>(null);
  const [selectedQuery, setSelectedQuery] = useState<QueryOption | null>(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Set user type based on auth state, but only if user selects nothing
  useEffect(() => {
    // We don't automatically set the user type now - we always ask
    // This allows the user to explore different FAQ options
  }, [isAuthenticated, user]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Toggle chat open/closed
  const toggleChat = () => {
    if (isOpen) {
      setStatus('initial');
      setSelectedQuery(null);
      setChatMessages([]);
      setMessage('');
      setUserType(null); // Reset user type when closing chat
    }
    setIsOpen(!isOpen);
  };

  // Handle user type selection for non-authenticated users
  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type);
    setStatus('query-selection');
    
    const welcomeMessage = type === 'brand' 
      ? 'Welcome, Brand Manager! How can I help you today?' 
      : 'Welcome, Influencer! How can I assist you today?';
    
    setChatMessages([{text: welcomeMessage, isUser: false}]);
  };

  // Handle query selection
  const handleQuerySelection = (query: QueryOption) => {
    setSelectedQuery(query);
    setStatus('resolved');
    
    setIsTyping(true);
    
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        {text: query.text, isUser: true},
        {text: query.answer, isUser: false}
      ]);
      setIsTyping(false);
      
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {text: 'Did that solve your query?', isUser: false}
        ]);
      }, 500);
    }, 1000);
  };

  // Handle query resolution
  const handleQueryResolution = (resolved: boolean) => {
    if (resolved) {
      setChatMessages(prev => [
        ...prev,
        {text: 'Yes, thank you!', isUser: true},
        {text: 'Great! Is there anything else I can help you with?', isUser: false}
      ]);
      setStatus('query-selection');
      setSelectedQuery(null);
    } else {
      setChatMessages(prev => [
        ...prev,
        {text: 'No, I need more help.', isUser: true},
        {text: 'I understand. Please contact our support team at support@rolit.com for further assistance.', isUser: false}
      ]);
      setStatus('chat');
    }
  };

  // Handle custom query button
  const handleCustomQuery = () => {
    setChatMessages(prev => [
      ...prev,
      {text: 'My query is not listed here.', isUser: true},
      {text: 'I understand. Please tell me how I can help you, and our support team will get back to you shortly.', isUser: false}
    ]);
    setStatus('chat');
  };

  // Handle custom message sending
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setChatMessages(prev => [
      ...prev,
      {text: message, isUser: true}
    ]);
    
    setIsTyping(true);
    setMessage('');
    
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {text: 'Thank you for your message. Our support team will contact you shortly. For faster assistance, please email support@rolit.com.', isUser: false}
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div 
          className={`mb-3 w-72 rounded-xl overflow-hidden shadow-xl border transform transition-all duration-300 ease-in-out
            ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          style={{ 
            boxShadow: theme === 'dark' ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            maxHeight: 'calc(100vh - 80px)'
          }}
        >
          {/* Chat Header */}
          <div className={`flex items-center justify-between p-3 sticky top-0 z-30
            ${theme === 'dark' ? 'bg-primary-600' : 'bg-primary-500'}`}
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-white" />
              </div>
              <div className="ml-2">
                <h3 className="text-sm font-semibold text-white">Avni</h3>
                <p className="text-xs text-white/80">Virtual Assistant</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors duration-200"
            >
              <XMarkIcon className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex flex-col h-[400px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Initial state - User type selection - Always show this initially regardless of auth status */}
              {status === 'initial' && (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Hello there! 👋</h3>
                    <p className="text-sm mb-4">Please tell us who you are so we can help you better:</p>
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <button
                      onClick={() => handleUserTypeSelection('brand')}
                      className="w-full py-3 px-4 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-all duration-200"
                    >
                      I'm a Brand
                    </button>
                    <button
                      onClick={() => handleUserTypeSelection('influencer')}
                      className="w-full py-3 px-4 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-all duration-200"
                    >
                      I'm an Influencer
                    </button>
                  </div>
                </div>
              )}

              {/* Chat messages */}
              {chatMessages.length > 0 && (
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {!msg.isUser && (
                        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center mr-2 flex-shrink-0">
                          <SparklesIcon className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div 
                        className={`max-w-[85%] rounded-lg px-4 py-3 ${
                          msg.isUser 
                            ? 'bg-primary-500 text-white rounded-tr-none' 
                            : theme === 'dark' 
                              ? 'bg-gray-700 text-white rounded-tl-none'
                              : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      {msg.isUser && (
                        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center ml-2 flex-shrink-0">
                          <span className="text-white text-xs font-bold">You</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center mr-2 flex-shrink-0">
                        <SparklesIcon className="w-4 h-4 text-white" />
                      </div>
                      <div 
                        className={`max-w-[85%] rounded-lg px-4 py-3 ${
                          theme === 'dark' 
                            ? 'bg-gray-700 text-white rounded-tl-none'
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              )}

              {/* Query selection */}
              {status === 'query-selection' && userType && !chatMessages.length && (
                <div className="space-y-3">
                  <p className="text-sm font-medium mb-2">
                    {userType === 'brand' ? 
                      'Common questions from brands:' : 
                      'Common questions from influencers:'}
                  </p>
                  <div className="space-y-2">
                    {(userType === 'brand' ? brandQueries : influencerQueries).map((query) => (
                      <button
                        key={query.id}
                        onClick={() => handleQuerySelection(query)}
                        className={`text-left w-full px-4 py-3 text-sm rounded-lg ${
                          theme === 'dark'
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        } hover:shadow-sm transition-all duration-200`}
                      >
                        {query.text}
                      </button>
                    ))}
                    <button
                      onClick={handleCustomQuery}
                      className={`text-left w-full px-4 py-3 text-sm rounded-lg font-medium ${
                        theme === 'dark'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      } hover:shadow-sm transition-all duration-200 mt-4`}
                    >
                      My query is not listed here
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Footer */}
            <div className={`p-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              {status === 'resolved' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleQueryResolution(true)}
                    className="flex-1 py-2 px-3 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-all duration-200"
                  >
                    Yes, thanks!
                  </button>
                  <button
                    onClick={() => handleQueryResolution(false)}
                    className="flex-1 py-2 px-3 rounded-lg bg-gray-500 text-white text-sm font-medium hover:bg-gray-600 transition-all duration-200"
                  >
                    I need more help
                  </button>
                </div>
              )}

              {status === 'chat' && (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className={`flex-1 px-3 py-2 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-white placeholder:text-gray-400'
                        : 'bg-gray-100 text-gray-800 placeholder:text-gray-500'
                    } focus:outline-none`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={`p-2 rounded-lg ${
                      !message.trim() 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-primary-500 hover:bg-primary-600'} text-white`}
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
              
              {status === 'query-selection' && chatMessages.length > 0 && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setChatMessages([]);
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-all duration-200"
                  >
                    FAQ
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`p-3.5 rounded-full shadow-lg transition-all duration-300 
          ${isOpen ? 'bg-gray-600' : 'bg-primary-600 hover:bg-primary-700'} 
          ${!isOpen && 'animate-pulse hover:scale-110'}`}
        aria-label="Chat with Avni"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
        {!isOpen && (
          <span className="absolute top-0 right-0 block w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
        )}
      </button>
    </div>
  );
};

export default ChatBot; 