import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import api from '../services/api';
import { FaVideo, FaComments, FaUsers, FaShieldAlt, FaBolt, FaArrowRight, FaPlay, FaBars, FaTimes } from 'react-icons/fa';

const FloatingShape = ({ delay, duration, className }) => (
  <div
    className={`absolute rounded-full opacity-20 ${className}`}
    style={{
      animation: `float ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({ totalUsers: 0, totalGroups: 0, totalMessages: 0, onlineUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/public/stats');
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <SEO 
        title="" 
        description="OmagleChat - Connect with friends worldwide through private messaging, group chats, and real-time communication. Join thousands of users today!"
        url="/"
      />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-avatar {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-float-avatar { animation: float-avatar 3s ease-in-out infinite; }
        .animate-float-avatar-delay { animation: float-avatar 3s ease-in-out infinite; animation-delay: 0.5s; }
        .animate-float-avatar-delay2 { animation: float-avatar 3s ease-in-out infinite; animation-delay: 1s; }
        .gradient-animate { background-size: 200% 200%; animation: gradient-shift 5s ease infinite; }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <FloatingShape delay={0} duration={6} className="w-96 h-96 bg-purple-500 top-10 left-10" />
          <FloatingShape delay={2} duration={8} className="w-64 h-64 bg-blue-500 top-1/3 right-10" />
          <FloatingShape delay={4} duration={7} className="w-72 h-72 bg-pink-500 bottom-20 left-1/4" />
          <FloatingShape delay={1} duration={9} className="w-48 h-48 bg-cyan-500 bottom-10 right-1/3" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        </div>

        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/70 backdrop-blur-2xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-3 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-white">OmagleChat</span>
                </Link>
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/#features" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Features</Link>
                <Link to="/about" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">About</Link>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Contact</Link>
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-purple-500/25"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-300 hover:text-white transition-colors font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-purple-500/25"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-white/10">
                <div className="flex flex-col space-y-4">
                  <Link to="/#features" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Features</Link>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                  {isAuthenticated ? (
                    <Link
                      to="/dashboard"
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold rounded-xl text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Go to Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-gray-300 hover:text-white transition-colors py-2 text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold rounded-xl text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-40 pb-32 px-4 relative">
          <div 
            className="max-w-7xl mx-auto text-center relative z-10"
            style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`, transition: 'transform 0.3s ease-out' }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full mb-10 border border-white/20 animate-slide-up">
              <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></span>
              <span className="text-gray-200 font-medium">Join 50,000+ active users worldwide</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Chat Without
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent gradient-animate">
                Boundaries
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Connect instantly with friends through private messages, group chats, 
              and real-time conversations. Experience communication like never before.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link
                to="/register"
                className="group px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold rounded-2xl text-lg hover:opacity-90 transition-all hover:scale-105 shadow-2xl shadow-purple-500/30 flex items-center gap-3"
              >
                Start Chatting Free
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-10 py-5 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-2xl text-lg hover:bg-white/20 transition-all border border-white/20 flex items-center gap-3"
              >
                <FaPlay className="text-purple-400" /> Login
              </Link>
              <a
                href="https://www.zomagle.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-10 py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-bold rounded-2xl text-lg hover:opacity-90 transition-all hover:scale-105 shadow-2xl shadow-pink-500/30 flex items-center gap-3"
              >
                <FaVideo className="group-hover:rotate-12 transition-transform" /> Video Chat
              </a>
            </div>

            {/* Chat Preview */}
            <div className="mt-24 relative animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur-3xl opacity-40 animate-pulse"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-float-avatar"></div>
                    <div>
                      <div className="text-white font-bold text-lg">OmagleChat Community</div>
                      <div className="text-green-400 text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        24,500 members online
                      </div>
                    </div>
                  </div>
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-2 border-gray-900 animate-float-avatar-delay"></div>
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full border-2 border-gray-900 animate-float-avatar-delay2"></div>
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full border-2 border-gray-900"></div>
                    <div className="w-10 h-10 bg-gray-700 rounded-full border-2 border-gray-900 flex items-center justify-center text-white text-xs font-bold">+99</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-4 bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaComments className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Hey everyone! 👋</div>
                      <div className="text-gray-400 text-sm">Welcome to OmagleChat</div>
                      <div className="text-gray-500 text-xs mt-2">Just now</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaBolt className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">This app is amazing!</div>
                      <div className="text-gray-400 text-sm">Love the UI ✨</div>
                      <div className="text-gray-500 text-xs mt-2">Just now</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaUsers className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Joined community!</div>
                      <div className="text-gray-400 text-sm">Great to be here 🎉</div>
                      <div className="text-gray-500 text-xs mt-2">Just now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 px-4 bg-black/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full mb-6 border border-purple-500/30">
                <span className="text-purple-300 text-sm font-medium">✨ Features</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Powerful features designed for seamless communication
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <FaComments className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Private Messaging</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Send direct messages instantly with real-time delivery, read receipts, and typing indicators.
                </p>
              </div>
              
              <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <FaUsers className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Group Chats</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Create unlimited group conversations with members. Perfect for communities and teams.
                </p>
              </div>
              
              <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-green-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <FaShieldAlt className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Secure & Private</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Your conversations are protected with end-to-end encryption. Privacy-first design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  {loading ? '...' : stats.totalUsers >= 1000 ? `${(stats.totalUsers / 1000).toFixed(1)}K+` : stats.totalUsers}
                </div>
                <div className="text-gray-400 text-lg">Active Users</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  {loading ? '...' : stats.totalGroups >= 1000 ? `${(stats.totalGroups / 1000).toFixed(1)}K+` : stats.totalGroups}
                </div>
                <div className="text-gray-400 text-lg">Active Groups</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  {loading ? '...' : stats.totalMessages >= 1000000 ? `${(stats.totalMessages / 1000000).toFixed(1)}M+` : stats.totalMessages >= 1000 ? `${(stats.totalMessages / 1000).toFixed(1)}K+` : stats.totalMessages}
                </div>
                <div className="text-gray-400 text-lg">Total Messages</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  {loading ? '...' : stats.onlineUsers >= 1000 ? `${(stats.onlineUsers / 1000).toFixed(1)}K+` : stats.onlineUsers}
                </div>
                <div className="text-gray-400 text-lg">Online Now</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4">
          <div className="max-w-5xl mx-auto text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-[3rem] blur-3xl opacity-50"></div>
            <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-[3rem] p-16 md:p-20 overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
              <div className="relative">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Start Chatting Today
                </h2>
                <p className="text-purple-100 text-xl mb-10 max-w-xl mx-auto">
                  Join thousands of users experiencing the future of communication. 
                  It's free, fast, and secure.
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-600 font-bold rounded-2xl text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                >
                  Create Free Account
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 border-t border-white/10 bg-black/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-6 md:mb-0">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg">OmagleChat</span>
              </div>
              <div className="flex items-center space-x-8 text-gray-400 mb-6 md:mb-0">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link to="/support" className="hover:text-white transition-colors">Support</Link>
              </div>
              <div className="text-gray-500">
                © 2024 OmagleChat. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
