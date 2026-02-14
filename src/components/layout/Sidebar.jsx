import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Avatar, Modal, Input } from '../ui';
import { useAuth } from '../../context/AuthContext';
import { getFriends, getFriendRequests, acceptFriendRequest, rejectFriendRequest, searchUsers, sendFriendRequest } from '../../services/api';
import toast from 'react-hot-toast';
import { VscVerifiedFilled } from 'react-icons/vsc';

const Sidebar = ({ 
  isOpen, 
  onClose, 
  chats = [], 
  groups = [], 
  onChatSelect, 
  onGroupSelect,
  onCreateGroup,
  currentChatId,
  currentGroupId,
  className = '',
  ...props 
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('chats');
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [showFriendsPanel, setShowFriendsPanel] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);

  useEffect(() => {
    fetchFriendsData();
  }, []);

  const fetchFriendsData = async () => {
    try {
      const [friendsRes, requestsRes] = await Promise.all([
        getFriends(),
        getFriendRequests()
      ]);
      setFriends(friendsRes.data.data?.friends || []);
      setFriendRequests(requestsRes.data.data?.requests || []);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);
      toast.success('Friend added!');
      fetchFriendsData();
    } catch (error) {
      toast.error('Failed to accept');
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectFriendRequest(requestId);
      fetchFriendsData();
    } catch (error) {
      toast.error('Failed to reject');
    }
  };

  const handleSearch = async (query) => {
    alert('Searching for: ' + query);
    console.log('handleSearch called with:', query);
    if (!query || query.trim().length < 2) {
      alert('Enter at least 2 characters');
      console.log('Query too short or empty');
      return;
    }
    setSearching(true);
    try {
      console.log('Calling searchUsers API...');
      const res = await searchUsers(query.trim());
      console.log('API response:', res.data);
      alert('Got response: ' + JSON.stringify(res.data));
      if (res.data.success) {
        setSearchResults(res.data.data?.users || []);
      } else {
        console.log('API returned error:', res.data.message);
        setSearchResults([]);
      }
    } catch (error) {
      alert('Error: ' + error.message);
      console.error('Search error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleSendFriendRequest = async (userId) => {
    try {
      await sendFriendRequest(userId);
      toast.success('Friend request sent!');
      setSearchResults(prev => prev.map(u => u.id === userId ? { ...u, requestSent: true } : u));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send request');
    }
  };

  const filteredChats = (chats || []).filter(chat => 
    (chat.name || chat.user?.username)?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = (groups || []).filter(group => 
    group.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrivateMessage = (userId) => {
    navigate(`/private/${userId}`);
    onClose();
  };

  const handleNewChat = () => {
    setShowNewChatModal(true);
  };

  const FriendsPanel = () => (
    <div className="p-2">
      {friendRequests.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase px-2 mb-2">
            Requests ({friendRequests.length})
          </h4>
          {friendRequests.map(request => (
            <div key={request.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg mb-2">
              <div className="flex items-center space-x-2">
                <Avatar src={request.avatar} alt={request.username} size="sm" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{request.username}</span>
              </div>
              <div className="flex space-x-1">
                <Button variant="primary" size="sm" className="text-xs px-2 py-1" onClick={() => handleAccept(request.id)}>Accept</Button>
                <Button variant="outline" size="sm" className="text-xs px-2 py-1" onClick={() => handleReject(request.id)}>Reject</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase px-2 mb-2">
        My Friends ({friends.filter(f => f.friendStatus === 'friends').length})
      </h4>
      {friends.filter(f => f.friendStatus === 'friends').length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4 text-sm">No friends yet</p>
      ) : (
        friends.filter(f => f.friendStatus === 'friends').map(friend => (
          <div
            key={friend.id}
            onClick={() => handlePrivateMessage(friend.id)}
            className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Avatar src={friend.avatar} alt={friend.username} status={friend.isOnline ? 'online' : 'offline'} size="sm" />
            <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1">
              {friend.username}
              {friend.role === 'admin' && (
                <VscVerifiedFilled className="text-blue-500 w-3 h-3" />
              )}
            </span>
          </div>
        ))
      )}
    </div>
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-90 lg:hidden" onClick={onClose} />
      )}
      
      <aside className={`fixed top-0 left-0 z-40 hidden lg:flex lg:flex-col lg:w-80 h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/30 dark:border-gray-700/30 ${className}`} {...props}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h2>
              <Button variant="ghost" size="sm" onClick={handleNewChat}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </Button>
            </div>
            <div className="relative flex">
              <input
                type="text"
                placeholder="Search users and press Enter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(searchQuery); }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button 
                onClick={() => handleSearch(searchQuery)}
                className="ml-2 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm"
              >
                Search
              </button>
            </div>
            {searchQuery.length >= 2 && (
              <div className="mt-2 max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                {searching ? (
                  <p className="p-3 text-sm text-gray-500">Searching...</p>
                ) : searchResults.length === 0 ? (
                  <div className="p-3">
                    <p className="text-sm text-gray-500 mb-2">No users found for "{searchQuery}"</p>
                    <button 
                      onClick={() => handleSearch(searchQuery)}
                      className="text-sm text-purple-600 hover:underline"
                    >
                      Click to search
                    </button>
                  </div>
                ) : (
                  searchResults.map(u => (
                    <div key={u.id} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="flex items-center space-x-2">
                        <Avatar src={u.avatar} alt={u.username} size="sm" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{u.username}</span>
                      </div>
                      {u.requestSent ? (
                        <span className="text-xs text-gray-500">Request sent</span>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleSendFriendRequest(u.id)}>Add</Button>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
            <div className="flex mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button onClick={() => { setActiveTab('chats'); setShowFriendsPanel(false); }} className={`flex-1 py-2 px-2 rounded-md text-xs font-medium ${activeTab === 'chats' && !showFriendsPanel ? 'bg-white dark:bg-gray-700 text-primary-600' : 'text-gray-600 dark:text-gray-400'}`}>Chats</button>
              <button onClick={() => { setActiveTab('groups'); setShowFriendsPanel(false); }} className={`flex-1 py-2 px-2 rounded-md text-xs font-medium ${activeTab === 'groups' && !showFriendsPanel ? 'bg-white dark:bg-gray-700 text-primary-600' : 'text-gray-600 dark:text-gray-400'}`}>Groups</button>
              <button onClick={() => { setActiveTab('friends'); setShowFriendsPanel(true); }} className={`flex-1 py-2 px-2 rounded-md text-xs font-medium relative ${showFriendsPanel ? 'bg-white dark:bg-gray-700 text-primary-600' : 'text-gray-600 dark:text-gray-400'}`}>
                Friends {friendRequests.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">{friendRequests.length}</span>}
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {showFriendsPanel ? <FriendsPanel /> : activeTab === 'chats' ? (
              <div className="p-2">
                {filteredChats.length === 0 ? <p className="text-center text-gray-500 py-8">No chats</p> : filteredChats.map(chat => (
                  <div key={chat.id || chat._id} onClick={() => { onChatSelect?.(chat); onClose(); }} className={`flex items-center p-3 rounded-lg cursor-pointer ${currentChatId === (chat.id || chat._id) ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    <Avatar src={chat.avatar || chat.user?.avatar} alt={chat.name || chat.user?.username || 'User'} fallback={chat.name?.charAt(0) || chat.user?.username?.charAt(0) || 'U'} status={chat.isOnline || chat.user?.isOnline ? 'online' : 'offline'} size="md" />
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{chat.name || chat.user?.username || 'Unknown User'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2">
                {filteredGroups.length === 0 ? <p className="text-center text-gray-500 py-8">No groups</p> : filteredGroups.map(group => (
                  <div key={group._id || group.id} onClick={() => { onGroupSelect?.(group); onClose(); }} className={`flex items-center p-3 rounded-lg cursor-pointer ${currentGroupId === (group._id || group.id) ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    <Avatar src={group.avatar} alt={group.name} fallback={group.name?.charAt(0)} size="md" />
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{group.name}</p>
                      <p className="text-xs text-gray-500">{group.memberCount || 0} members</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Avatar src={user?.avatar} alt={user?.username} size="md" status="online" />
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.username}</p>
                <p className="text-xs text-green-600">Active now</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h2>
              <Button variant="ghost" size="sm" onClick={onClose}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></Button>
            </div>
            <div className="relative">
              <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <div className="flex mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button onClick={() => { setActiveTab('chats'); setShowFriendsPanel(false); }} className={`flex-1 py-2 px-2 rounded-md text-xs font-medium ${activeTab === 'chats' && !showFriendsPanel ? 'bg-white dark:bg-gray-700 text-primary-600' : 'text-gray-600 dark:text-gray-400'}`}>Chats</button>
              <button onClick={() => { setActiveTab('groups'); setShowFriendsPanel(false); }} className={`flex-1 py-2 px-2 rounded-md text-xs font-medium ${activeTab === 'groups' && !showFriendsPanel ? 'bg-white dark:bg-gray-700 text-primary-600' : 'text-gray-600 dark:text-gray-400'}`}>Groups</button>
              <button onClick={() => { setActiveTab('friends'); setShowFriendsPanel(true); }} className={`flex-1 py-2 px-2 rounded-md text-xs font-medium relative ${showFriendsPanel ? 'bg-white dark:bg-gray-700 text-primary-600' : 'text-gray-600 dark:text-gray-400'}`}>
                Friends {friendRequests.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">{friendRequests.length}</span>}
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {showFriendsPanel ? <FriendsPanel /> : activeTab === 'chats' ? (
              <div className="p-2">
                {filteredChats.length === 0 ? <p className="text-center text-gray-500 py-8">No chats</p> : filteredChats.map(chat => (
                  <div key={chat.id || chat._id} onClick={() => { onChatSelect?.(chat); onClose(); }} className={`flex items-center p-3 rounded-lg cursor-pointer ${currentChatId === (chat.id || chat._id) ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    <Avatar src={chat.avatar || chat.user?.avatar} alt={chat.name || chat.user?.username || 'User'} status={chat.isOnline || chat.user?.isOnline ? 'online' : 'offline'} size="md" />
                    <div className="ml-3 flex-1 min-w-0"><p className="text-sm font-medium text-gray-900 dark:text-white truncate">{chat.name || chat.user?.username || 'Unknown'}</p></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2">
                {filteredGroups.length === 0 ? <p className="text-center text-gray-500 py-8">No groups</p> : filteredGroups.map(group => (
                  <div key={group._id || group.id} onClick={() => { onGroupSelect?.(group); onClose(); }} className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <Avatar src={group.avatar} alt={group.name} fallback={group.name?.charAt(0)} size="md" />
                    <div className="ml-3 flex-1 min-w-0"><p className="text-sm font-medium text-gray-900 dark:text-white truncate">{group.name}</p><p className="text-xs text-gray-500">{group.memberCount || 0} members</p></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
