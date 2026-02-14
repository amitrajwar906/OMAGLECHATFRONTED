import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui';


const MessageInput = ({ 
  onSendMessage, 
  onTypingStart, 
  onTypingStop,
  placeholder = 'Type a message...',
  disabled = false,
  sending = false,
  members = [],
  replyTo = null,
  onCancelReply = null,
  className = '',
  ...props 
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showTagList, setShowTagList] = useState(false);
  const [tagSearch, setTagSearch] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);
  const tagListRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const emojis = [
    '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘',
    '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐',
    '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴',
    '😷', '🤒', '🤕', '🤢', '🤮', '🥵', '🥶', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐',
    '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😱',
    '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '✋',
    '🤚', '🖐️', '🖖', '👋', '🤏', '✍️', '👏', '🙌', '👐', '🤲', '🙏', '❤️', '🧡', '💛',
    '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘'
  ];

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tagListRef.current && !tagListRef.current.contains(event.target) && 
          emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowTagList(false);
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredMembers = members.filter(member => 
    member.username?.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const handleTyping = (value) => {
    setMessage(value);
    
    // Check for @ mentions
    const lastAtIndex = value.lastIndexOf('@');
    if (lastAtIndex !== -1) {
      const textAfterAt = value.slice(lastAtIndex + 1);
      if (!textAfterAt.includes(' ')) {
        setShowTagList(true);
        setTagSearch(textAfterAt);
      } else {
        setShowTagList(false);
      }
    } else {
      setShowTagList(false);
    }
    
    if (value.trim() && !isTyping) {
      setIsTyping(true);
      onTypingStart?.();
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    if (value.trim()) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        onTypingStop?.();
      }, 1000);
    } else if (isTyping) {
      setIsTyping(false);
      onTypingStop?.();
    }
  };

  const handleSelectMember = (member) => {
    const lastAtIndex = message.lastIndexOf('@');
    const newMessage = message.slice(0, lastAtIndex) + `@${member.username} `;
    setMessage(newMessage);
    setShowTagList(false);
    setTagSearch('');
    inputRef.current?.focus();
  };

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;

    const messageData = {
      content: trimmedMessage,
      replyToId: replyTo?.id
    };

    onSendMessage?.(messageData);
    setMessage('');
    setShowEmojiPicker(false);
    setShowImageInput(false);
    setImageUrl('');
    if (onCancelReply) onCancelReply();
    
    // Stop typing indicator
    if (isTyping) {
      setIsTyping(false);
      onTypingStop?.();
    }
    
    // Focus back to input
    inputRef.current?.focus();
  };

  const handleSendImage = () => {
    if (!imageUrl.trim() || disabled) return;

    const messageData = {
      content: imageUrl.trim(),
      isImage: true,
      replyToId: replyTo?.id
    };

    onSendMessage?.(messageData);
    setMessage('');
    setShowImageInput(false);
    setImageUrl('');
    if (onCancelReply) onCancelReply();
    
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (showTagList && filteredMembers.length > 0) {
        e.preventDefault();
        handleSelectMember(filteredMembers[0]);
      } else {
        e.preventDefault();
        handleSend();
      }
    }
  };

  const handleEmojiSelect = (emoji) => {
    const newMessage = message + emoji;
    setMessage(newMessage);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const isImageUrl = (url) => {
    return /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url) || url.includes('imgflip') || url.includes('memegen');
  };

  return (
    <div className={`p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${className}`} style={{ position: 'relative' }} {...props}>
      {/* Reply preview */}
      {replyTo && (
        <div className="flex items-center justify-between mb-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg border-l-4 border-purple-500">
          <div className="flex items-center gap-2 overflow-hidden">
            <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-purple-500 font-medium">Replying to @{replyTo.sender?.username || 'Unknown'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{replyTo.content}</p>
            </div>
          </div>
          {onCancelReply && (
            <button onClick={onCancelReply} className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Image URL input */}
      {showImageInput && (
        <div className="mb-2 flex items-center gap-2">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image URL..."
            className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendImage();
              if (e.key === 'Escape') setShowImageInput(false);
            }}
          />
          <button
            onClick={handleSendImage}
            disabled={!imageUrl.trim()}
            className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
          <button
            onClick={() => setShowImageInput(false)}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      )}
      
      {/* Emoji picker */}
      {showEmojiPicker && (
        <div 
          ref={emojiPickerRef}
          className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-3 z-50 max-h-56 overflow-y-auto"
          style={{ width: '300px' }}
        >
          <div className="grid grid-cols-8 gap-1">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiSelect(emoji)}
                className="text-xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Tag list dropdown */}
      {showTagList && filteredMembers.length > 0 && (
        <div 
          ref={tagListRef}
          className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-2 z-50 max-h-48 overflow-y-auto"
          style={{ width: '250px' }}
        >
          {filteredMembers.slice(0, 5).map(member => (
            <button
              key={member.id}
              onClick={() => handleSelectMember(member)}
              className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <img 
                src={member.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${member.username}`} 
                alt={member.username}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-900 dark:text-white font-medium">{member.username}</span>
            </button>
          ))}
        </div>
      )}
      
      {/* Input container */}
      <div className="flex items-center space-x-2">
        {/* Image URL button */}
        <button
          type="button"
          onClick={() => setShowImageInput(!showImageInput)}
          disabled={disabled}
          className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Send Image Link"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        
        {/* Emoji button */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          disabled={disabled}
          className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Emojis"
        >
          😊
        </button>
        
        {/* Message input */}
        <div className="flex-1">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none placeholder-gray-600 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              minHeight: '44px',
              maxHeight: '100px'
            }}
          />
        </div>
        
        {/* Send button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!message.trim() || disabled || sending}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-2.5 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          {sending ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
