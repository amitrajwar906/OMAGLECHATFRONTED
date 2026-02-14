import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaShieldAlt, FaGlobe, FaHeart, FaStar, FaQuoteLeft, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const About = () => {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <SEO 
        title="About - Free Online Chat Platform"
        description="Learn about OmagleChat, the leading free online chat platform. Connect with strangers worldwide through text chat and anonymous chat rooms."
        url="/about"
      />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .gradient-animate { background-size: 200% 200%; animation: gradient-shift 5s ease infinite; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full top-20 left-10" style={{ animation: 'float 8s ease-in-out infinite' }}></div>
          <div className="absolute w-64 h-64 bg-pink-500/20 rounded-full top-1/3 right-20" style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '1s' }}></div>
          <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full bottom-20 left-1/3" style={{ animation: 'float 7s ease-in-out infinite', animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        </div>

        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/70 backdrop-blur-2xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-white">OmagleChat</span>
              </Link>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/#features" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Features</Link>
                <Link to="/about" className="text-white font-medium">About</Link>
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
                  <Link to="/about" className="text-white font-medium py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
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
        <section className="pt-40 pb-24 px-4">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center px-5 py-2 bg-purple-500/20 rounded-full mb-8 border border-purple-500/30">
              <span className="text-purple-300 text-sm font-medium">About Us</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Connecting the World
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent gradient-animate">
                One Chat at a Time
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We're on a mission to break down barriers and help people connect meaningfully, 
              regardless of geography or background.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="animate-slide-up">
                <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
                <div className="space-y-4">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    At OmagleChat, we believe everyone deserves a safe, free platform to connect with others. 
                    Our mission is to break down barriers and create meaningful connections through anonymous chat rooms.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Whether you're looking for casual conversation, want to practice a new language, or simply want 
                    to meet interesting people from around the world, OmagleChat provides the perfect platform.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2">
                  <FaUsers className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">500K+</div>
                  <div className="text-gray-400 mt-2">Active Users</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 hover:border-pink-500/50 transition-all duration-500 hover:-translate-y-2">
                  <FaGlobe className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">150+</div>
                  <div className="text-gray-400 mt-2">Countries</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 col-span-2">
                  <FaStar className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">4.8/5</div>
                  <div className="text-gray-400 mt-2">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose OmagleChat</h2>
              <p className="text-gray-400 text-lg">Built with you in mind</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaShieldAlt className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Safe & Anonymous</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Chat without revealing your identity. Our platform prioritizes your privacy and security 
                  in every conversation. Your safety is our top priority.
                </p>
              </div>
              <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-pink-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaHeart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Free for Everyone</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  No subscriptions, no hidden fees. Enjoy unlimited access to all chat features completely free. 
                  Premium communication should be accessible to all.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FaQuoteLeft className="w-12 h-12 text-purple-400 mx-auto mb-8 opacity-50" />
            <blockquote className="text-3xl md:text-4xl font-bold text-white mb-8 leading-relaxed">
              "Communication is the bridge between curiosity and connection. 
              We're building that bridge for millions around the world."
            </blockquote>
            <div className="text-gray-400">— The OmagleChat Team</div>
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

export default About;
