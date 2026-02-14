import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { VscVerifiedFilled } from 'react-icons/vsc';

const SearchModal = ({ onClose, onAddFriend }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchUsers = async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const response = await api.get('/users/search', {
            params: { query: query.trim() }
          });
          setResults(response.data.data.users);
        } catch (error) {
          console.error('Error searching users:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    const timeoutId = setTimeout(searchUsers, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleAddFriend = (userId) => {
    onAddFriend(userId);
    setResults(results.filter(user => user._id !== userId));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-96 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Search Users
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search by username or email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-field"
              autoFocus
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
            </div>
          ) : results.length === 0 && query.trim() ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No users found
            </p>
          ) : results.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Type to search for users
            </p>
          ) : (
            <div className="space-y-2">
              {results.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.username} className="h-10 w-10 rounded-full" />
                      ) : (
                        <span className="text-white font-semibold">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                        {user.username}
                        {user.role === 'admin' && (
                          <VscVerifiedFilled className="text-blue-500 w-4 h-4" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.isOnline ? 'Online' : 'Offline'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddFriend(user._id)}
                    className="btn-primary text-sm"
                  >
                    Add Friend
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;