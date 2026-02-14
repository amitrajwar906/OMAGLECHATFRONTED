import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import api, { searchUsers, sendFriendRequest } from '../services/api';
import toast from 'react-hot-toast';
import { Layout, Header, Sidebar } from '../components/layout';
import { Card, Button, Avatar, Badge, LoadingSpinner, Modal } from '../components/ui';
import { VscVerifiedFilled } from 'react-icons/vsc';
import SEO from '../components/SEO';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user: authUser, updateUser } = useAuth();
  const [chats, setChats] = useState({ private: [], groups: [] });
  const [publicGroups, setPublicGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [profileForm, setProfileForm] = useState({
    username: authUser?.username || '',
    bio: authUser?.bio || '',
    avatar: authUser?.avatar || ''
  });
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [groupForm, setGroupForm] = useState({
    name: '',
    description: '',
    isPublic: false
  });
  const [creatingGroup, setCreatingGroup] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const groupsPerPage = 16;
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter groups by search query
  const filteredGroups = publicGroups.filter(group => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (group.name && group.name.toLowerCase().includes(query)) ||
      (group.id && group.id.toString().includes(query)) ||
      (group._id && group._id.toString().includes(query))
    );
  });
  
  const { user } = useAuth();
  const { onlineUsers } = useSocket();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchChats();
    fetchPublicGroups();
  }, [user]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchStats();
    }
  }, [user]);

  const fetchChats = async () => {
    try {
      const response = await api.get('/chats');
      console.log('Chats response:', response.data);
      const chatsData = response.data.data?.chats || response.data.chats || { private: [], groups: [] };
      console.log('Chats data:', chatsData);
      setChats(chatsData);
    } catch (error) {
      console.error('Error fetching chats:', error);
      toast.error('Failed to load chats');
    }
  };

  const fetchPublicGroups = async (page = 1) => {
    try {
      const response = await api.get(`/groups/public?page=${page}&limit=${groupsPerPage}`);
      const groups = response.data.data.groups || [];
      const totalCount = response.data.data.total || groups.length;
      
      setPublicGroups(groups);
      setTotalPages(Math.ceil(totalCount / groupsPerPage));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching public groups:', error);
      toast.error('Failed to load public groups');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      await api.post(`/groups/${groupId}/join`);
      toast.success('Joined group successfully!');
      fetchChats();
      fetchPublicGroups(currentPage);
    } catch (error) {
      toast.error('Failed to join group');
    }
  };

  const handleGroupSelect = (group) => {
    navigate(`/group/${group._id || group.id}`);
  };

  const handleChatSelect = (chat) => {
    const chatId = chat.id || chat._id || chat.user?.id || chat.user?._id;
    if (chatId) {
      navigate(`/private/${chatId}`);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchPublicGroups(page);
    }
  };

  const handlePrevPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="relative">
          <LoadingSpinner size="xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400 text-sm">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const headerActions = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      label: 'Search Users',
      onClick: () => setShowSearchModal(true)
    }
  ];

  const handleUserSearch = async (query) => {
    setSearchQuery(query);
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await searchUsers(query);
      if (res.data.success) {
        setSearchResults(res.data.data?.users || []);
      }
    } catch (error) {
      console.error('Search error:', error);
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

  const handleUpdateProfile = async () => {
    if (!profileForm.username.trim()) {
      toast.error('Username is required');
      return;
    }
    setUpdatingProfile(true);
    try {
      const res = await api.put('/users/profile', {
        username: profileForm.username,
        bio: profileForm.bio,
        avatar: profileForm.avatar
      });
      if (res.data.success) {
        const updatedUser = res.data.data?.user;
        updateUser(updatedUser);
        toast.success('Profile updated!');
        setShowEditProfileModal(false);
      } else {
        toast.error(res.data.message || 'Failed to update profile');
      }
    } catch (error) {
      alert('Error: ' + (error.message || 'Unknown error'));
      console.error('Update profile error:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdatingProfile(false);
    }
  };

  return (
    <>
      <SEO 
        title="Dashboard" 
        description="Your OmagleChat dashboard. Manage your chats, groups, friends, and profile settings all in one place."
        url="/dashboard"
        noIndex={true}
      />
      <Layout
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen(false)}
      sidebar={
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          chats={chats.private}
          groups={chats.groups}
          onGroupSelect={handleGroupSelect}
          onChatSelect={handleChatSelect}
          onCreateGroup={() => setShowCreateGroupModal(true)}
        />
      }
      header={
        <Header
          title="Dashboard"
          subtitle="Discover communities and connect with friends"
          showBackButton={false}
          showMenuButton={true}
          onMenuClick={() => setSidebarOpen(true)}
          onEditProfile={() => setShowEditProfileModal(true)}
          actions={headerActions}
        />
      }
    >
      <div className="flex-1 bg-gradient-to-br from-purple-50/10 via-blue-50/10 to-pink-50/10 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-900/95 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {user?.role === 'admin' && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
                    <p className="text-purple-100 mt-1">Manage users, groups, and view statistics</p>
                  </div>
                  <button
                    onClick={() => navigate('/admin')}
                    className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    Open Admin Panel
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                    <p className="text-2xl font-bold text-white">{stats?.totalUsers || '-'}</p>
                    <p className="text-purple-100 text-sm">Total Users</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                    <p className="text-2xl font-bold text-white">{stats?.totalGroups || '-'}</p>
                    <p className="text-purple-100 text-sm">Total Groups</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                    <p className="text-2xl font-bold text-white">{stats?.totalMessages || '-'}</p>
                    <p className="text-purple-100 text-sm">Total Messages</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                    <p className="text-2xl font-bold text-white">{stats?.onlineUsers || '-'}</p>
                    <p className="text-purple-100 text-sm">Online Users</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <section className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl mb-6 sm:mb-8">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
              Welcome Back, {user?.username}!
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
              Discover vibrant communities, connect with amazing people, and start meaningful conversations.
            </p>
          </section>

          <section>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Discover Communities
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
                Join vibrant public groups and connect with people who share your interests
              </p>
              
              <div className="flex flex-row items-center justify-center gap-6 md:gap-8">
                <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 shadow-lg glass-morphism min-w-[100px]">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {publicGroups.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Groups</div>
                </div>
                <div className="text-center bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-xl px-6 py-4 shadow-lg glass-morphism min-w-[100px]">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {publicGroups.reduce((acc, group) => acc + (group.members?.length || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Members</div>
                </div>
                <div className="text-center bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-xl px-6 py-4 shadow-lg glass-morphism min-w-[100px]">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Active</div>
                </div>
              </div>
            </div>

            {/* Search Groups */}
            <div className="mb-6 px-4">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search groups by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                />
                <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 px-4">
              {filteredGroups.length > 0 ? (
                filteredGroups.map(group => {
                  const isMember = chats.groups.some(g => (g._id || g.id) === (group.id || group._id));
                  const memberCount = group.members?.length || 0;
                  
                  return (
                    <div key={group._id || group.id} className="group premium-card relative overflow-hidden">
                      <div className="relative z-10 p-3 sm:p-4 lg:p-6">
                        <div className="text-center mb-3 sm:mb-4 lg:mb-6">
                          <div className="relative inline-block mb-2 sm:mb-3 lg:mb-4">
                            <Avatar
                              src={group.avatar}
                              alt={group.name}
                              size="lg"
                              fallback={group.name?.charAt(0)}
                              className="ring-4 ring-white dark:ring-gray-800 group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold">
                              Public
                            </div>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                            {group.name}
                          </h3>
                          
                          <div className="inline-flex items-center bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-full px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 badge-primary text-xs sm:text-sm font-medium">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {memberCount} members
                          </div>
                        </div>

                        {memberCount > 0 && (
                          <div className="mb-3 sm:mb-4 lg:mb-6">
                            <div className="flex justify-center">
                              <div className="flex -space-x-1.5 sm:-space-x-2 lg:-space-x-3">
                                {group.members.slice(0, 3).map((member) => (
                                  <Avatar
                                    key={member.id}
                                    src={member.avatar}
                                    alt={member.username}
                                    size="sm"
                                    fallback={member.username?.charAt(0)}
                                    className="ring-2 ring-white dark:ring-gray-800 border border-gray-100 dark:border-gray-700"
                                    title={member.username}
                                  />
                                ))}
                                {memberCount > 3 && (
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 ring-2 ring-white dark:ring-gray-800 border-2 border-gray-100 dark:border-gray-700 flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">
                                      +{memberCount - 3}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1 sm:mt-2">
                              {memberCount} active member{memberCount !== 1 ? 's' : ''}
                            </p>
                          </div>
                        )}

                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                          {isMember ? (
                            <button
                              onClick={() => navigate(`/group/${group._id || group.id}`)}
                              className="relative w-full py-2 px-3 sm:py-3 sm:px-4 btn-primary btn-elevated hover:shadow-2xl transition-all duration-300"
                            >
                              Enter Group
                            </button>
                          ) : (
                            <button
                              onClick={() => handleJoinGroup(group._id || group.id)}
                              className="relative w-full py-2 px-3 sm:py-3 sm:px-4 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 text-gray-900 dark:text-white font-semibold rounded-lg sm:rounded-xl hover:border-purple-600/50 dark:hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 shadow-md sm:shadow-lg text-xs sm:text-sm glass-morphism"
                            >
                              Join Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : searchQuery ? (
                <div className="col-span-full text-center py-20">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    No Groups Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    No groups match "{searchQuery}". Try a different search.
                  </p>
                </div>
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    No Public Groups Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    Be the first to create a public group and start building an amazing community!
                  </p>
                  <Button
                    onClick={() => setShowCreateGroupModal(true)}
                    variant="outline"
                    size="lg"
                    className="px-3 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 text-xs sm:text-sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Your Own Group
                  </Button>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4 mt-8 px-4">
                <Button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="px-4 py-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentPage === index + 1
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/10 dark:bg-gray-800/10 text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 border border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  className="px-4 py-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            )}

            <div className="text-center mt-6 sm:mt-8 lg:mt-12 px-4">
              <Button
                onClick={() => setShowCreateGroupModal(true)}
                variant="outline"
                size="lg"
                className="px-3 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 text-xs sm:text-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Group
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* Search Users Modal */}
      <Modal
        isOpen={showSearchModal}
        onClose={() => {
          setShowSearchModal(false);
          setSearchQuery('');
          setSearchResults([]);
        }}
        size="lg"
      >
        <Modal.Header>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Search Users
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search by username or email... (press Enter)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleUserSearch(searchQuery); }}
              className="w-full px-4 py-3 input-glass focus:ring-2 focus:ring-purple-500/50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <div className="max-h-96 overflow-y-auto space-y-2">
              {searchResults.length === 0 && searchQuery.length >= 2 ? (
                <p className="text-center text-gray-500 py-4">No users found for "{searchQuery}"</p>
              ) : (
                searchResults.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar src={user.avatar} alt={user.username} size="md" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                          {user.username}
                          {user.role === 'admin' && (
                            <VscVerifiedFilled className="text-blue-500 w-4 h-4" />
                          )}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.bio || 'No bio'}</p>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSendFriendRequest(user.id)}
                    >
                      Add Friend
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        size="md"
      >
        <Modal.Header>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit Profile
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            {/* Avatar Preview */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img
                  src={profileForm.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${profileForm.username}`}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-purple-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Picture URL
              </label>
              <input
                type="url"
                value={profileForm.avatar}
                onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 mt-1">Paste an image URL for your profile picture</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={profileForm.username}
                onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white resize-none"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setShowEditProfileModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateProfile} loading={updatingProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Group Modal */}
      <Modal
        isOpen={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
        size="md"
      >
        <Modal.Header>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create New Group
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Group Name
              </label>
              <input
                type="text"
                placeholder="Group name"
                value={groupForm.name}
                onChange={(e) => setGroupForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description (optional)
              </label>
              <textarea
                placeholder="What's this group about?"
                value={groupForm.description}
                onChange={(e) => setGroupForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                rows={3}
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={groupForm.isPublic}
                  onChange={(e) => setGroupForm(prev => ({ ...prev, isPublic: e.target.checked }))}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Make this group public (anyone can join)
                </span>
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline"
            onClick={() => setShowCreateGroupModal(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (!groupForm.name.trim()) {
                toast.error('Group name is required');
                return;
              }
              // Add create group logic here
              setCreatingGroup(true);
              try {
                await api.post('/groups', groupForm);
                toast.success('Group created successfully!');
                setShowCreateGroupModal(false);
                setGroupForm({ name: '', description: '', isPublic: false });
                fetchChats();
                fetchPublicGroups();
              } catch (error) {
                toast.error('Failed to create group');
              } finally {
                setCreatingGroup(false);
              }
            }}
            loading={creatingGroup}
            disabled={!groupForm.name.trim()}
          >
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowCreateGroupModal(true)}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 w-16 h-16 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg sm:shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform duration-300"
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </Layout>
    </>
  );
};

export default Dashboard;