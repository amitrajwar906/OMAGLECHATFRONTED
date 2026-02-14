import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { Layout, Header, Sidebar, Button, Avatar, Badge, Modal, Input } from '../components/ui/index.js';
import { MessageList, MessageInput } from '../components/chat/index.js';
import api from '../services/api.js';
import toast from 'react-hot-toast';

const GroupChat = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { socket, onlineUsers } = useSocket();
  
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', isPublic: false });
  const [addUserForm, setAddUserForm] = useState({ userId: '' });
  const [updatingGroup, setUpdatingGroup] = useState(false);
  const [deletingGroup, setDeletingGroup] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const [sidebarChats, setSidebarChats] = useState({ private: [], groups: [] });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!groupId || !socket) return;
    
    fetchGroupData();
    socket.emit('joinGroup', { groupId });
      
    const handleNewMessage = (message) => {
      if (message && message.chatType === 'group' && String(message.chatRoomId) === String(groupId)) {
        setMessages(prev => {
          if (prev.some(m => m.id === message.id)) return prev;
          if (message.sender?.id === user?.id) return prev;
          return [...prev, message];
        });
        scrollToBottom();
      }
      if (message && message.chatType === 'broadcast') {
        setMessages(prev => {
          if (prev.some(m => m.id === message.id)) return prev;
          return [...prev, message];
        });
        scrollToBottom();
      }
    };

    const handleUserJoinedGroup = (userData) => {
      if (String(userData.groupId) === String(groupId)) {
        toast.success(`${userData.username} joined the group`);
        fetchGroupData();
      }
    };

    const handleUserLeftGroup = (userData) => {
      if (String(userData.groupId) === String(groupId)) {
        toast.info(`${userData.username} left the group`);
        fetchGroupData();
      }
    };

    const handleGroupUpdated = () => {
      fetchGroupData();
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('userJoinedGroup', handleUserJoinedGroup);
    socket.on('userLeftGroup', handleUserLeftGroup);
    socket.on('groupUpdated', handleGroupUpdated);

    return () => {
      socket.emit('leaveGroup', { groupId });
      socket.off('newMessage', handleNewMessage);
      socket.off('userJoinedGroup', handleUserJoinedGroup);
      socket.off('userLeftGroup', handleUserLeftGroup);
      socket.off('groupUpdated', handleGroupUpdated);
    };
  }, [socket, groupId]);

  const fetchGroupData = async () => {
    try {
      const [groupResponse, messagesResponse, chatsResponse] = await Promise.all([
        api.get(`/groups/${groupId}`),
        api.get(`/messages/group/${groupId}`),
        api.get('/chats')
      ]);

      // Extract data from API responses
      const groupData = groupResponse.data.data?.group || groupResponse.data.data || groupResponse.data.group || groupResponse.data;
      const messagesData = messagesResponse.data.data || [];
      const chatsData = chatsResponse.data.data?.chats || chatsResponse.data?.chats || [];

      setGroup(groupData);
      setMessages(messagesData);
      setSidebarChats({ private: chatsData.private || chatsData, groups: chatsData.groups || [] });
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching group data:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = async (messageContent) => {
    if (!messageContent || !messageContent.trim()) return;

    const tempId = Date.now();
    const tempMessage = {
      id: tempId,
      content: messageContent.trim(),
      senderId: user?.id,
      sender: user,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, tempMessage]);
    scrollToBottom();

    try {
      const response = await api.post('/messages', {
        content: messageContent.trim(),
        chatType: 'group',
        chatRoom: groupId
      });

      const rawData = response.data;
      let messageData = null;
      
      if (rawData.data?.message && typeof rawData.data.message === 'object') {
        messageData = rawData.data.message;
      } else if (rawData.message && typeof rawData.message === 'object') {
        messageData = rawData.message;
      } else if (rawData.data && typeof rawData.data === 'object' && rawData.data.id) {
        messageData = rawData.data;
      } else if (rawData.id) {
        messageData = rawData;
      }
      
      if (messageData && messageData.id) {
        setMessages(prev => prev.map(m => m.id === tempId ? messageData : m));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => prev.filter(m => m.id !== tempId));
      toast.error(error.response?.data?.message || 'Failed to send message');
    }
  };

  const handleTypingStart = () => {
    if (socket) {
      socket.emit('typing', { chatType: 'group', chatRoom: groupId });
    }
  };

  const handleTypingStop = () => {
    if (socket) {
      socket.emit('stopTyping', { chatType: 'group', chatRoom: groupId });
    }
  };

  const handleLeaveGroup = async () => {
    setDeletingGroup(true);
    try {
      await api.delete(`/groups/${groupId}/leave`);
      toast.success('Left group successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to leave group');
    } finally {
      setDeletingGroup(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await api.delete(`/groups/${groupId}/members/${memberId}`);
      toast.success('Member removed successfully');
      fetchGroupData();
    } catch (error) {
      toast.error('Failed to remove member');
    }
  };

  const openEditModal = () => {
    setEditForm({
      name: group.name,
      description: group.description || '',
      isPublic: !group.isPrivate && !group.is_public && group.isPublic !== false
    });
    setShowEditModal(true);
  };

  const handleUpdateGroup = async () => {
    if (!editForm.name.trim()) {
      toast.error('Group name is required');
      return;
    }
    
    setUpdatingGroup(true);
    try {
      const updateData = {
        name: editForm.name,
        description: editForm.description,
        isPrivate: !editForm.isPublic
      };
      
      await api.put(`/groups/${groupId}`, updateData);
      toast.success('Group updated successfully!');
      setShowEditModal(false);
      fetchGroupData();
    } catch (error) {
      console.error('Update group error:', error);
      toast.error(error.response?.data?.message || 'Failed to update group');
    } finally {
      setUpdatingGroup(false);
    }
  };

  const handleDeleteGroup = async () => {
    setDeletingGroup(true);
    try {
      await api.delete(`/groups/${groupId}`);
      toast.success('Group deleted successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Delete group error:', error);
      toast.error('Failed to delete group');
    } finally {
      setDeletingGroup(false);
    }
  };

  const handleAddUser = async () => {
    if (!addUserForm.userId.trim()) {
      toast.error('User ID is required');
      return;
    }
    
    setAddingUser(true);
    try {
      await api.post(`/groups/${groupId}/add-user`, {
        userId: addUserForm.userId
      });
      toast.success('User added successfully!');
      setShowAddUserModal(false);
      setAddUserForm({ userId: '' });
      fetchGroupData();
    } catch (error) {
      console.error('Add user error:', error);
      toast.error(error.response?.data?.message || 'Failed to add user');
    } finally {
      setAddingUser(false);
    }
  };

  const handleSidebarChats = async (chat) => {
    const chatId = chat.id || chat._id;
    if (chatId) navigate(`/private/${chatId}`);
  };

  const handleSidebarGroups = async (group) => {
    const groupId = group.id || group._id;
    if (groupId) navigate(`/group/${groupId}`);
  };

  const isAdmin = group?.admin === user?.id || group?.admin?.id === user?.id || String(group?.admin) === String(user?.id);

  let baseActions = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      label: 'Members',
      onClick: () => setShowMembersModal(true)
    }
  ];

  const adminActions = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Settings',
      onClick: () => navigate(`/group/${groupId}/settings`)
    }
  ];

  const headerActions = isAdmin ? [...baseActions, ...adminActions] : baseActions;

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 mx-auto mb-4"></div>
          <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">Loading group...</div>
        </div>
      </div>
    );
  }

    return (
      <Layout
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(false)}
        sidebar={
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            chats={sidebarChats.private || []}
            groups={sidebarChats.groups || []}
            onChatSelect={handleSidebarChats}
            onGroupSelect={handleSidebarGroups}
          />
        }
        header={
          <Header
            title={group?.name || 'Loading...'}
            subtitle={group ? `${group.members?.length || 0} members` : 'Please wait...'}
            showBackButton={true}
            showMenuButton={true}
            onBackClick={() => navigate('/dashboard')}
            onMenuClick={() => setSidebarOpen(true)}
            actions={group ? headerActions : []}
          />
        }
      >
        {/* Main Content */}
        <div className="flex flex-col h-[calc(100vh-64px)]">
          {/* Messages Area - scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            <MessageList
              messages={messages}
              currentUser={user}
              loading={loading}
            />
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input - fixed at bottom */}
          <div className="flex-shrink-0">
            <MessageInput
              onSendMessage={handleSendMessage}
              onTypingStart={handleTypingStart}
              onTypingStop={handleTypingStop}
              placeholder={`Message ${group?.name || 'group'}...`}
              disabled={!group}
            />
          </div>
        </div>

        {/* Members Modal */}
        <Modal
          isOpen={showMembersModal}
          onClose={() => setShowMembersModal(false)}
          size="lg"
        >
          <Modal.Header>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Group Members
            </h3>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {group?.members?.map(member => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center flex-1 min-w-0">
                    <div 
                      onClick={() => { setSelectedMember(member); setShowProfileModal(true); }}
                      className="cursor-pointer"
                    >
                      <Avatar
                        src={member.avatar}
                        alt={member.username}
                        size="sm"
                        status={onlineUsers.some(u => u.id === member.id) ? 'online' : 'offline'}
                      />
                    </div>
                    <div className="ml-3 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {member.username}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-4">
                    {member.id === group?.admin && (
                      <Badge variant="primary" size="sm">
                        Admin
                      </Badge>
                    )}
                    {isAdmin && member.id !== group?.admin && member.id !== user?.id && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                        className="ml-2"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline"
              onClick={() => setShowMembersModal(false)}
            >
              Close
            </Button>
            {!isAdmin && group?.members?.some(m => m.id === user?.id && m.id !== group?.admin) && (
              <Button
                variant="danger"
                onClick={() => setShowLeaveModal(true)}
                className="ml-2"
              >
                Leave Group
              </Button>
            )}
          </Modal.Footer>
        </Modal>

        {/* Edit Group Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          size="md"
        >
          <Modal.Header>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Group
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
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (optional)
                </label>
                <textarea
                  placeholder="What's this group about?"
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editForm.isPublic}
                    onChange={(e) => setEditForm(prev => ({ ...prev, isPublic: e.target.checked }))}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Make this group public (anyone can join)
                  </span>
                </label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateGroup}
                loading={updatingGroup}
                disabled={!editForm.name.trim()}
              >
                Update Group
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Delete Group Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          size="md"
        >
          <Modal.Header>
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
              Delete Group
            </h3>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center space-y-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50 mb-4">
                <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M-6.938 4h13.856c1.54 0 2.502-1.667 1.732L13.732 4c-.77.833.192-1.595 1.595-1.32 1.32-1.32.8L12 14z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Are you sure?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This action cannot be undone. This will permanently delete the group "{group?.name}" and all its messages.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteGroup}
                loading={deletingGroup}
              >
                Delete Group
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Profile Popup Modal */}
        <Modal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          size="sm"
        >
          <Modal.Body>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar
                  src={selectedMember?.avatar}
                  alt={selectedMember?.username}
                  size="xl"
                  status={onlineUsers.some(u => u.id === selectedMember?.id) ? 'online' : 'offline'}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {selectedMember?.username}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {selectedMember?.email}
              </p>
              <div className="flex justify-center items-center space-x-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${onlineUsers.some(u => u.id === selectedMember?.id) ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                  {onlineUsers.some(u => u.id === selectedMember?.id) ? 'Online' : 'Offline'}
                </span>
                {selectedMember?.id === group?.admin && (
                  <span className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                    Admin
                  </span>
                )}
              </div>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  setShowProfileModal(false);
                  navigate(`/private/${selectedMember?.id}`);
                }}
              >
                Send Message
              </Button>
            </div>
          </Modal.Body>
        </Modal>
    </Layout>
  );
};

export default GroupChat;