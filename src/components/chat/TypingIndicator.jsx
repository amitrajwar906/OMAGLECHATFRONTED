import React from 'react';
import { Avatar, Badge, LoadingSpinner } from '../ui';

const TypingIndicator = ({ 
  users = [], 
  maxUsers = 3,
  className = '',
  ...props 
}) => {
  if (users.length === 0) return null;

  const formatUsers = () => {
    if (users.length === 1) {
      return users[0].username;
    } else if (users.length === 2) {
      return `${users[0].username} and ${users[1].username}`;
    } else if (users.length <= maxUsers) {
      const lastUser = users[users.length - 1];
      const otherUsers = users.slice(0, -1);
      return `${otherUsers.map(u => u.username).join(', ')}, and ${lastUser.username}`;
    } else {
      const visibleUsers = users.slice(0, maxUsers);
      const remainingCount = users.length - maxUsers;
      return `${visibleUsers.map(u => u.username).join(', ')} and ${remainingCount} other${remainingCount > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className={`flex items-center space-x-3 px-4 py-2 ${className}`} {...props}>
      {/* Avatars */}
      <div className="flex -space-x-2">
        {users.slice(0, maxUsers).map((user, index) => (
          <div key={user.id} className="relative">
            <Avatar
              src={user.avatar}
              alt={user.username}
              size="sm"
              status="typing"
            />
            {/* Typing animation overlay */}
            <div className="absolute -bottom-0 -right-0 bg-green-500 rounded-full p-1">
              <div className="flex space-x-0.5">
                <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        ))}
        {users.length > maxUsers && (
          <div className="relative">
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
              +{users.length - maxUsers}
            </div>
          </div>
        )}
      </div>
      
      {/* Typing text with dots */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {formatUsers()} {users.length === 1 ? 'is' : 'are'} typing
        </span>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;