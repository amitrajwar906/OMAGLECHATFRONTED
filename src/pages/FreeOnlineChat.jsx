import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FaComments, FaShieldAlt, FaMobileAlt, FaClock, FaUserPlus } from 'react-icons/fa';

const FreeOnlineChat = () => {
  return (
    <>
      <SEO 
        title="Free Online Chat - Chat with Strangers Anytime"
        description="Experience free online chat with strangers worldwide. Connect through anonymous text chat, random video chat, and meet new people 24/7 on OmagleChat."
        url="/free-online-chat"
      />
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary-600">OmagleChat</span>
              </Link>
              <div className="flex items-center space-x-6">
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">Chat Now</Link>
                <Link to="/rooms" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">Rooms</Link>
                <Link to="/free-online-chat" className="text-primary-600 dark:text-primary-400 font-medium">Free Chat</Link>
                <Link to="/login" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">Login</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Free Online <span className="text-primary-600">Chat</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Connect with strangers worldwide through free online chat. No registration, no fees - just instant conversations with people from around the globe.
            </p>
            <Link to="/login" className="inline-block px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition text-lg shadow-lg">
              Start Free Chat Now
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <FaComments className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Instant Connections</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get matched with strangers instantly. Start chatting within seconds of clicking start.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <FaShieldAlt className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Anonymous & Safe</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Chat without revealing your identity. Your privacy is our top priority.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <FaMobileAlt className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mobile Friendly</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access free online chat from any device - phone, tablet, or desktop.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <FaClock className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">24/7 Available</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Chat anytime, day or night. Our platform is always available.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <FaUserPlus className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Meet New People</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Expand your social circle with people from 150+ countries.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <FaShieldAlt className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Registration</h3>
              <p className="text:text-gray-300-gray-600 dark">
                Jump straight into chatting. No account needed, no personal info required.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready for Free Online Chat?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of people who use OmagleChat every day to connect, chat, and make new friends.
            </p>
            <Link to="/login" className="inline-block px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-100 transition">
              Start Chatting Now
            </Link>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
            <p>&copy; 2024 OmagleChat. Free online chat with strangers worldwide.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FreeOnlineChat;
