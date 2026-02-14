import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FaVideo, FaComments, FaShieldAlt, FaGlobe, FaUserFriends, FaStar } from 'react-icons/fa';

const ChatPage = () => {
  return (
    <>
      <SEO 
        title="Start Free Online Chat with Strangers"
        description="Start free online chat with strangers worldwide. Use OmagleChat for random video chat, anonymous text chat, and meet new people in real-time."
        url="/chat"
      />
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary-600">OmagleChat</span>
              </Link>
              <div className="flex items-center space-x-6">
                <Link to="/chat" className="text-primary-600 dark:text-primary-400 font-medium">Chat Now</Link>
                <Link to="/rooms" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">Rooms</Link>
                <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">About</Link>
                <Link to="/login" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">Login</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Start <span className="text-primary-600">Free Chat</span> with Strangers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Connect instantly with people worldwide through random video chat and anonymous text conversations. No registration required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <FaVideo className="inline mr-2" /> Start Video Chat
              </button>
              <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition text-lg shadow-lg">
                <FaComments className="inline mr-2" /> Start Text Chat
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
              <FaGlobe className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Global Connections</h3>
              <p className="text-gray-600 dark:text-gray-300">Chat with people from over 150 countries worldwide</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
              <FaShieldAlt className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">100% Anonymous</h3>
              <p className="text-gray-600 dark:text-gray-300">Chat without revealing your identity</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
              <FaUserFriends className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Easy to Use</h3>
              <p className="text-gray-600 dark:text-gray-300">One click to start chatting with strangers</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Choose Chat Type</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Video or text chat</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Click Start</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Instant connection</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Meet Strangers</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Random matching</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">4</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Keep Chatting</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Or skip anytime</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Users Say</h2>
            <div className="flex justify-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <FaStar key={i} className="w-6 h-6" />)}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic">"Great way to meet new people from around the world!"</p>
            <p className="text-gray-500 mt-2">- Happy User</p>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
            <p>&copy; 2024 OmagleChat. Free online chat with strangers.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChatPage;
