import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Badge, Button, LoadingSpinner } from '../ui';
import TypingIndicator from './TypingIndicator';
import { VscVerifiedFilled } from 'react-icons/vsc';

const MessageList = ({ 
  messages = [], 
  currentUser, 
  onEdit, 
  onDelete, 
  onReply,
  onReact,
  loading = false,
  className = '',
  ...props 
}) => {
  const messagesEndRef = useRef(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editText, setEditText] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    const now = new Date();
    const diff = now - date;
    
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      });
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const handleEdit = (message) => {
    setEditingMessageId(message.id);
    setEditText(message.content);
    setSelectedMessage(null);
  };

  const handleSaveEdit = (messageId) => {
    if (onEdit && editText.trim()) {
      onEdit(messageId, editText.trim());
    }
    setEditingMessageId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditText('');
  };

  const handleMessageReact = (messageId, emoji) => {
    if (onReact) {
      onReact(messageId, emoji);
      setSelectedMessage(null);
    }
  };

  const renderMessage = (message, index) => {
    const isOwn = message.sender?.id === currentUser?.id;
    const isBroadcast = message.chatType === 'broadcast';
    const prevDate = messages[index - 1]?.timestamp ? new Date(messages[index - 1].timestamp) : null;
    const currDate = message.timestamp ? new Date(message.timestamp) : null;
    const showDate = index === 0 || 
      (prevDate && currDate && !isNaN(prevDate.getTime()) && !isNaN(currDate.getTime()) && 
       prevDate.toDateString() !== currDate.toDateString());
    const messageKey = message.id || message._id || `msg-${index}`;
    
    // Find the message being replied to
    const replyToMessage = message.replyToId ? messages.find(m => m.id === message.replyToId || m._id === message.replyToId) : null;
    
    return (
      <div key={messageKey}>
        {/* Date divider */}
        {showDate && (
          <div className="flex items-center justify-center my-4">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1">
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {isBroadcast ? '📢 Broadcast' : formatDate(message.timestamp)}
              </span>
            </div>
          </div>
        )}
        
        <div
          className={`flex items-end space-x-2 mb-4 group ${isOwn ? 'flex-row-reverse space-x-reverse' : ''} ${isBroadcast ? 'justify-center' : ''}`}
          onMouseEnter={() => setSelectedMessage(message.id)}
          onMouseLeave={() => setSelectedMessage(null)}
        >
          {/* Avatar */}
          {!isOwn && !isBroadcast && (
            <Avatar
              src={message.sender?.avatar}
              alt={message.sender?.username}
              size="sm"
              status={message.sender?.isOnline ? 'online' : 'offline'}
            />
          )}
          
          {/* Message content */}
          <div className={`max-w-xs lg:max-w-md ${isOwn ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}>
            {/* Username for non-own messages */}
            {!isOwn && !isBroadcast && (
              <span className="text-xs text-gray-600 dark:text-gray-400 mb-1 ml-1 flex items-center gap-1">
                {message.sender?.username}
                {message.sender?.role === 'admin' && (
                  <VscVerifiedFilled className="text-blue-500 w-3 h-3" />
                )}
              </span>
            )}
            
            {/* Message bubble */}
            <div className={`relative rounded-2xl px-4 py-2 ${
              isBroadcast
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white w-full text-center'
              : isOwn 
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white' 
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
            } ${message.isEdited ? 'opacity-90' : ''}`}>
              {isBroadcast && (
                <div className="text-xs text-purple-200 mb-1">📢 Admin Broadcast</div>
              )}
              
              {/* Reply preview */}
              {replyToMessage && (
                <div className={`mb-2 px-3 py-2 rounded-lg border-l-4 ${
                  isBroadcast || isOwn 
                    ? 'bg-white/10 border-purple-300' 
                    : 'bg-gray-100 dark:bg-gray-700 border-purple-500'
                }`}>
                  <p className={`text-xs ${isBroadcast || isOwn ? 'text-purple-200' : 'text-purple-600 dark:text-purple-400'} font-medium`}>
                    @{replyToMessage.sender?.username || 'Unknown'}
                  </p>
                  <p className={`text-sm truncate ${isBroadcast || isOwn ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                    {replyToMessage.content}
                  </p>
                </div>
              )}

              {isBroadcast && message.image && (
                <img 
                  src={message.image} 
                  alt="Broadcast" 
                  className="max-w-full h-auto rounded-lg mb-2 mx-auto"
                  style={{ maxHeight: '200px' }}
                />
              )}
              {/* Editing state */}
              {editingMessageId === message.id ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveEdit(message.id);
                      } else if (e.key === 'Escape') {
                        handleCancelEdit();
                      }
                    }}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    autoFocus
                  />
                  <div className="flex space-x-1">
                    <Button size="xs" variant="ghost" onClick={() => handleSaveEdit(message.id)}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </Button>
                    <Button size="xs" variant="ghost" onClick={handleCancelEdit}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Check if message is an image */}
                  {message.isImage ? (
                    <div className="mt-1">
                      <img 
                        src={message.content} 
                        alt="Shared" 
                        className="max-w-full h-auto rounded-lg"
                        style={{ maxHeight: '300px' }}
                        onError={(e) => { 
                          e.target.style.display = 'none'; 
                          if (e.target.parentElement) {
                            e.target.parentElement.innerHTML = `<a href="${message.content}" target="_blank" class="text-purple-500 underline text-sm">${message.content.substring(0, 30)}...</a>`;
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  )}
                  
                  {isBroadcast && message.buttonText && message.buttonUrl && (
                    <a
                      href={message.buttonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      {message.buttonText}
                    </a>
                  )}
                  
                  {/* Message footer with time and reply button */}
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <span className={`text-xs ${isOwn ? 'text-purple-200' : 'text-gray-400'}`}>
                      {formatTime(message.timestamp)}
                    </span>
                    <button
                      onClick={() => onReply && onReply(message)}
                      className={`p-1 rounded hover:bg-white/20 transition-colors ${isOwn ? 'text-purple-200' : 'text-gray-400 hover:text-purple-500'}`}
                      title="Reply"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                    </button>
                  </div>
                  </>
              )}
            </div>
            
            {/* Reactions */}
            {message.reactions && message.reactions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {message.reactions.map((reaction, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                      reaction.users?.includes(currentUser?.id)
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span>{reaction.emoji}</span>
                    {reaction.count > 1 && <span>{reaction.count}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Message actions - show on hover */}
          {selectedMessage === message.id && !editingMessageId && isOwn && (
            <div className={`absolute top-0 ${isOwn ? 'right-0' : 'left-0'} -mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20 flex`}>
              <button
                onClick={() => handleEdit(message)}
                className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(message.id)}
                className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`} {...props}>
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${className}`} {...props}>
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-lg font-medium mb-2">No messages yet</p>
            <p className="text-sm">Start a conversation by sending a message below</p>
          </div>
        ) : (
          messages.map(renderMessage)
        )}
        
        {/* Typing indicator */}
        <TypingIndicator users={[]} />
        
        {/* Auto scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;