import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { Layout, Header, Sidebar } from '../components/layout';
import { Card, Button, Avatar, LoadingSpinner, Modal, Badge } from '../components/ui';
import { MessageList, MessageInput } from '../components/chat';
import api from '../services/api';
import toast from 'react-hot-toast';

const PrivateChat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { socket, onlineUsers } = useSocket();
  
  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [sidebarChats, setSidebarChats] = useState({ private: [], groups: [] });

  useEffect(() => {
    if (!userId || !socket) return;
    
    setMessages([]);
    fetchChatData();
    
    socket.emit('joinPrivateChat', { otherUserId: userId });

    const handleNewMessage = (message) => {
      const currentUserId = user?.id;
      const userIdNum = parseInt(userId);
      const messageSenderId = message.sender?.id;
      const isRelevantMessage = 
        (message.chatType === 'private' && 
         ((messageSenderId === userIdNum && message.chatRoomId === currentUserId) ||
          (messageSenderId === currentUserId && message.chatRoomId === userIdNum)));
      
      if (isRelevantMessage) {
        setMessages(prev => {
          if (prev.some(msg => msg.id === message.id)) return prev;
          if (message.sender?.id === user?.id) return prev;
          return [...prev, message];
        });
      }
      if (message && message.chatType === 'broadcast') {
        setMessages(prev => {
          if (prev.some(msg => msg.id === message.id)) return prev;
          return [...prev, message];
        });
      }
    };

    socket.on('newMessage', handleNewMessage);

    socket.on('userTyping', ({ userId: typingUserId, chatRoom }) => {
      if (typingUserId === userId && chatRoom === user?.id) {
        setTypingUsers([chatUser]);
      }
    });

    socket.on('userStoppedTyping', ({ userId: typingUserId, chatRoom }) => {
      if (typingUserId === userId && chatRoom === user?.id) {
        setTypingUsers([]);
      }
    });

    socket.on('messageEdited', ({ messageId, content }) => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, content, isEdited: true } : msg
      ));
    });

    socket.on('messageDeleted', ({ messageId }) => {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    });
    
    return () => {
      socket.emit('leavePrivateChat', { otherUserId: userId });
      socket.off('newMessage', handleNewMessage);
      socket.off('userTyping');
      socket.off('userStoppedTyping');
      socket.off('messageEdited');
      socket.off('messageDeleted');
    };
  }, [userId, socket, user?.id]);

  const fetchChatData = async () => {
    try {
      let chatUser = null;
      let msgs = [];
      let chatsData = { private: [], groups: [] };
      
      try {
        const chatResponse = await api.get(`/chats/private/${userId}`);
        chatUser = chatResponse.data.data?.user || chatResponse.data.data;
      } catch (e) {
        console.error('Error fetching chat user:', e);
      }
      
      try {
        const messagesResponse = await api.get(`/messages?chatId=${userId}&type=private`);
        msgs = messagesResponse.data?.data?.messages || messagesResponse.data?.data || [];
      } catch (e) {
        console.error('Error fetching messages:', e);
      }
      
      try {
        const chatsResponse = await api.get('/chats');
        chatsData = chatsResponse.data?.data?.chats || chatsResponse.data?.chats || { private: [], groups: [] };
      } catch (e) {
        console.error('Error fetching chats:', e);
      }

      setChatUser(chatUser);
      setMessages(Array.isArray(msgs) ? msgs : []);
      setSidebarChats(chatsData);
    } catch (error) {
      console.error('Error fetching chat data:', error);
      toast.error('Failed to load chat');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content) => {
    try {
      const response = await api.post('/messages', {
        content,
        chatType: 'private',
        chatRoom: userId
      });
      
      const messageData = response.data.data?.message || response.data.data || response.data;
      setMessages(prev => [...prev, messageData]);
    } catch (error) {
      console.error('Send message error:', error);
      toast.error('Failed to send message');
    }
  };

  const handleEditMessage = async (messageId, content) => {
    try {
      await api.put(`/messages/${messageId}`, { content });
      if (socket) {
        socket.emit('editPrivateMessage', { messageId, content });
      }
    } catch (error) {
      toast.error('Failed to edit message');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await api.delete(`/messages/${messageId}`);
      if (socket) {
        socket.emit('deletePrivateMessage', { messageId });
      }
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const handleTypingStart = () => {
    if (socket) {
      socket.emit('typing', { 
        chatType: 'private', 
        chatRoom: userId 
      });
    }
  };

  const handleTypingStop = () => {
    if (socket) {
      socket.emit('stopTyping', { 
        chatType: 'private', 
        chatRoom: userId 
      });
    }
  };

  const handleBlockUser = async () => {
    try {
      await api.post(`/users/block/${userId}`);
      toast.success('User blocked successfully');
      setShowUserInfoModal(false);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to block user');
    }
  };

  const isUserOnline = onlineUsers.some(u => u.id === userId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  const handleGroupSelect = (group) => {
    const groupId = group.id || group._id;
    if (groupId) navigate(`/group/${groupId}`);
  };

  const handleChatSelect = (chat) => {
    const chatId = chat.id || chat._id || chat.user?.id || chat.user?._id;
    if (chatId) navigate(`/private/${chatId}`);
  };

  const headerActions = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Info',
      onClick: () => setShowUserInfoModal(true)
    }
  ];

  return (
    <Layout
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen(false)}
      sidebar={
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          chats={sidebarChats.private}
          groups={sidebarChats.groups}
          currentChatId={userId}
          onGroupSelect={handleGroupSelect}
          onChatSelect={handleChatSelect}
        />
      }
      header={
        chatUser && (
          <Header
            title={chatUser.username}
            subtitle={isUserOnline ? 'Active now' : 'Offline'}
            showBackButton={true}
            showMenuButton={true}
            onBackClick={() => navigate('/dashboard')}
            onMenuClick={() => setSidebarOpen(true)}
            actions={headerActions}
          />
        )
      }
    >
      <div className="flex flex-col h-screen relative">
        {/* Messages */}
        <div className="flex-1 overflow-hidden pb-24">
          <MessageList
            messages={messages}
            currentUser={user}
            onEdit={handleEditMessage}
            onDelete={handleDeleteMessage}
            loading={loading}
          />
        </div>

        {/* Message Input - Fixed at bottom */}
        <MessageInput
          onSendMessage={handleSendMessage}
          onTypingStart={handleTypingStart}
          onTypingStop={handleTypingStop}
          placeholder={`Message ${chatUser?.username || 'user'}...`}
          disabled={!chatUser}
          className="lg:ml-80"
        />
      </div>

      {/* User Info Modal */}
      <Modal
        isOpen={showUserInfoModal}
        onClose={() => setShowUserInfoModal(false)}
        size="md"
      >
        <Modal.Header>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            User Information
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-center">
            <Avatar
              src={chatUser?.avatar}
              alt={chatUser?.username}
              size="xl"
              status={isUserOnline ? 'online' : 'offline'}
            />
            <div className="mt-4 text-center">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {chatUser?.username}
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                {chatUser?.email}
              </p>
            </div>
            
            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                <Badge 
                  variant={isUserOnline ? 'success' : 'secondary'} 
                  size="sm"
                >
                  {isUserOnline ? 'Online' : 'Offline'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Member Since</span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {chatUser?.createdAt ? new Date(chatUser.createdAt).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline"
            onClick={() => setShowUserInfoModal(false)}
          >
            Close
          </Button>
          <Button
            variant="danger"
            onClick={handleBlockUser}
          >
            Block User
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center z-50"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </Layout>
  );
};

export default PrivateChat;