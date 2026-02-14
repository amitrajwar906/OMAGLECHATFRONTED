import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [lastPrivateMessage, setLastPrivateMessage] = useState(null);
  const [lastGroupMessage, setLastGroupMessage] = useState(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      const token = localStorage.getItem('token');
      
      const newSocket = io(SOCKET_URL, {
        auth: {
          token
        },
        transports: ['websocket', 'polling'],
        timeout: 10000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      newSocket.on('connect', () => {
        console.log('Connected to server with socket ID:', newSocket.id);
      });

      newSocket.on('onlineUsers', (users) => {
        setOnlineUsers(users);
      });

      newSocket.on('userOnline', (userData) => {
        setOnlineUsers(prev => {
          const filtered = prev.filter(u => u.userId !== userData.userId);
          return [...filtered, userData];
        });
      });

      newSocket.on('userOffline', (userData) => {
        setOnlineUsers(prev => prev.filter(u => u.userId !== userData.userId));
      });

      newSocket.on('newMessage', (message) => {
        if (message.chatType === 'private') {
          setLastPrivateMessage(message);
        } else if (message.chatType === 'group') {
          setLastGroupMessage(message);
        }
      });

      newSocket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      newSocket.on('disconnect', (reason) => {
        console.log('Disconnected from server:', reason);
      });

      // Add debugging for all events
      newSocket.onAny((event, ...args) => {
        console.log(`Socket event: ${event}`, args);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [isAuthenticated, user]);

  const joinPrivateChat = (otherUserId) => {
    if (socket) {
      socket.emit('joinPrivateChat', { otherUserId });
    }
  };

  const joinGroup = (groupId) => {
    if (socket) {
      socket.emit('joinGroup', { groupId });
    }
  };

  const leaveGroup = (groupId) => {
    if (socket) {
      socket.emit('leaveGroup', { groupId });
    }
  };

  const emitTyping = (chatType, chatRoom) => {
    if (socket) {
      socket.emit('typing', { chatType, chatRoom });
    }
  };

  const emitStopTyping = (chatType, chatRoom) => {
    if (socket) {
      socket.emit('stopTyping', { chatType, chatRoom });
    }
  };

  const value = {
    socket,
    onlineUsers,
    lastPrivateMessage,
    lastGroupMessage,
    joinPrivateChat,
    joinGroup,
    leaveGroup,
    emitTyping,
    emitStopTyping,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};