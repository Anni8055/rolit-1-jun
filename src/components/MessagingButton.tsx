import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

interface MessagingButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const MessagingButton: React.FC<MessagingButtonProps> = ({ 
  position = 'bottom-left' 
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const positionClasses = {
    'bottom-right': 'bottom-20 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  const handleClick = () => {
    navigate('/messages');
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <button
        onClick={handleClick}
        className={`p-3.5 rounded-full shadow-lg transition-all duration-300
          bg-primary-600 hover:bg-primary-700 hover:scale-110
          flex items-center justify-center`}
        aria-label="Open Messaging"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
        <span className="absolute top-0 right-0 block w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
      </button>
    </div>
  );
};

export default MessagingButton; 