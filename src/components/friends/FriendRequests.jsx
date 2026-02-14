import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Avatar, Badge } from '../ui';
import { getFriendRequests, acceptFriendRequest, rejectFriendRequest, getFriends } from '../../services/api';
import toast from 'react-hot-toast';
import { VscVerifiedFilled } from 'react-icons/vsc';

const FriendRequests = ({ onClose }) => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('requests');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [requestsRes, friendsRes] = await Promise.all([
        getFriendRequests(),
        getFriends()
      ]);
      setRequests(requestsRes.data.data?.requests || []);
      setFriends(friendsRes.data.data?.friends || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);
      toast.success('Friend request accepted!');
      fetchData();
    } catch (error) {
      toast.error('Failed to accept request');
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectFriendRequest(requestId);
      toast.success('Friend request rejected');
      fetchData();
    } catch (error) {
      toast.error('Failed to reject request');
    }
  };

  const handleChat = (userId) => {
    navigate(`/private/${userId}`);
    onClose?.();
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Friends
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'requests'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            Requests ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'friends'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            Friends ({friends.filter(f => f.friendStatus === 'friends').length})
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : activeTab === 'requests' ? (
          requests.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No pending friend requests</p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map(request => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={request.avatar}
                      alt={request.username}
                      size="md"
                      status={request.isOnline ? 'online' : 'offline'}
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                        {request.username}
                        {request.role === 'admin' && (
                          <VscVerifiedFilled className="text-blue-500 w-4 h-4" />
                        )}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {request.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAccept(request.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          friends.filter(f => f.friendStatus === 'friends').length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No friends yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {friends.filter(f => f.friendStatus === 'friends').map(friend => (
                <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={friend.avatar}
                      alt={friend.username}
                      size="md"
                      status={friend.isOnline ? 'online' : 'offline'}
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                        {friend.username}
                        {friend.role === 'admin' && (
                          <VscVerifiedFilled className="text-blue-500 w-4 h-4" />
                        )}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {friend.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleChat(friend.id)}
                  >
                    Chat
                  </Button>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FriendRequests;
