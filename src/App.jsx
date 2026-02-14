import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GroupChat from './pages/GroupChat';
import PrivateChat from './pages/PrivateChat';
import GroupSettings from './pages/GroupSettings';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ChatPage from './pages/ChatPage';
import Rooms from './pages/Rooms';
import FreeOnlineChat from './pages/FreeOnlineChat';
import RandomVideoChat from './pages/RandomVideoChat';
import AdminDashboard from './pages/AdminDashboard';

const RootRedirect = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />;
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/group/:groupId"
                element={
                  <ProtectedRoute>
                    <GroupChat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/group/:groupId/settings"
                element={
                  <ProtectedRoute>
                    <GroupSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/private/:userId"
                element={
                  <ProtectedRoute>
                    <PrivateChat />
                  </ProtectedRoute>
                }
              />
              {/* Admin Dashboard */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<RootRedirect />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/free-online-chat" element={<FreeOnlineChat />} />
              <Route path="/random-video-chat" element={<RandomVideoChat />} />
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;