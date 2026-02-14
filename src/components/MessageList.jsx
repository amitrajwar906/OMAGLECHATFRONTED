import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { VscVerifiedFilled } from 'react-icons/vsc';

const MessageList = ({ messages, onEdit, onDelete }) => {
  const { user } = useAuth();
  const [editingMessage, setEditingMessage] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleEdit = (message) => {
    setEditingMessage(message.id);
    setEditContent(message.content);
  };

  const handleSaveEdit = () => {
    if (editingMessage && editContent.trim()) {
      onEdit(editingMessage, editContent.trim());
      setEditingMessage(null);
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setEditContent('');
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.filter(Boolean).map((message) => {
        const isMe = message.sender._id === user._id;

        return (
          <div className={`w-full flex ${isMe ? 'justify-end' : 'justify-start'} mb-3`} key={message.id}>
            {isMe ? (
              // OUTGOING MESSAGE (RIGHT SIDE)
              <div className="flex flex-col items-end max-w-[70%]">
                <div className="relative">
                  <div className="bg-blue-600 text-white rounded-2xl px-4 py-2 shadow">
                    {message.editedAt && (
                      <div className="text-xs text-blue-100 mb-1">edited</div>
                    )}
                    <div className="text-sm break-words">{message.content}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-blue-100 text-xs">{formatTime(message.createdAt)}</span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEdit(message)}
                          className="text-xs text-blue-100 hover:text-white p-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(message.id)}
                          className="text-xs text-blue-100 hover:text-white p-1 rounded ml-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // INCOMING MESSAGE (LEFT SIDE)
              <div className="flex flex-col items-start max-w-[70%]">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      {message.sender.avatar ? (
                        <img src={message.sender.avatar} alt={message.sender.username} className="w-10 h-10 rounded-full" />
                      ) : (
                        <span className="text-white text-sm font-semibold">
                          {message.sender.username.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium flex items-center gap-1">
                      {message.sender.username}
                      {message.sender.role === 'admin' && (
                        <VscVerifiedFilled className="text-blue-500 w-3 h-3" />
                      )}
                    </div>
                    <div className="bg-slate-700 text-white rounded-2xl px-4 py-2 shadow">
                      <div className="text-sm break-words">{message.content}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-gray-400 text-xs">{formatTime(message.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;