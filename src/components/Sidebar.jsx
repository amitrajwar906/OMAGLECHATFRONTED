import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const Sidebar = ({ chats, onlineUsers, onSearchOpen, onGroupModalOpen }) => {
  const { user, logout } = useAuth();
  const { onlineUsers: socketOnlineUsers } = useSocket();
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isUserOnline = (userId) => {
    return socketOnlineUsers.some(user => user.userId === userId);
  };

  return (
    <div className="sidebar">
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="avatar avatar-large mr-4 shadow-lg">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full" />
              ) : (
                <span className="text-white font-bold text-xl">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                {user?.username}
              </h3>
              <div className="flex items-center">
                <span className="status-indicator status-online mr-2"></span>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Active</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="p-3 hover:bg-white/10 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200"
            >
              <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-3 w-56 glass-container shadow-2xl z-10 animate-fade-in">
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </div>
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-4 py-3 text-sm text-purple-600 dark:text-purple-400 hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                      Admin Panel
                    </div>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-b-xl"
                >
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onSearchOpen}
            className="btn-secondary text-sm flex-1 hover-scale"
          >
            <svg className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
          <button
            onClick={onGroupModalOpen}
            className="btn-primary text-sm flex-1 hover-scale"
          >
            <svg className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Create
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-4 tracking-wider">
            Groups
          </h4>
          <div className="space-y-2">
            {chats?.groups?.map(group => (
              <Link
                key={group._id}
                to={`/group/${group._id}`}
                className="sidebar-item group"
              >
                <div className="avatar mr-3 shadow-md">
                  {group.avatar ? (
                    <img src={group.avatar} alt={group.name} className="w-full h-full rounded-full" />
                  ) : (
                    <span className="text-white font-bold">
                      {group.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {group.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {group.memberCount || 0} members
                  </div>
                </div>
              </Link>
            ))}
            {(!chats?.groups || chats.groups.length === 0) && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <svg className="h-12 w-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-sm">No groups yet</p>
                <p className="text-xs mt-1">Create your first group to get started</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-4 tracking-wider">
            Friends
          </h4>
          <div className="space-y-2">
            {chats?.private?.map(friend => (
              <Link
                key={friend._id}
                to={`/private/${friend._id}`}
                className="sidebar-item group"
              >
                <div className="relative mr-3">
                  <div className="avatar shadow-md">
                    {friend.avatar ? (
                      <img src={friend.avatar} alt={friend.name} className="w-full h-full rounded-full" />
                    ) : (
                      <span className="text-white font-bold">
                        {friend.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  {isUserOnline(friend._id) && (
                    <span className="status-indicator status-online"></span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {friend.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {isUserOnline(friend._id) ? (
                      <span className="flex items-center">
                        <span className="status-indicator status-online mr-1"></span>
                        Online
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <span className="status-indicator status-offline mr-1"></span>
                        Offline
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
            {(!chats?.private || chats.private.length === 0) && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <svg className="h-12 w-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-sm">No friends yet</p>
                <p className="text-xs mt-1">Search for users to add friends</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;