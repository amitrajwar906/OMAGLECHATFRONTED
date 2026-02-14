import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FaVideo, FaMicrophone, FaShieldAlt, FaMobileAlt, FaRandom, FaUserFriends } from 'react-icons/fa';

const RandomVideoChat = () => {
  return (
    <>
      <SEO 
        title="Random Video Chat - Meet Strangers on Camera"
        description="Experience random video chat with strangers worldwide. Connect face-to-face through OmagleChat's free webcam chat. Meet new people instantly."
        url="/random-video-chat"
      />
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary-600">OmagleChat</span>
              </Link>
              <div className="flex items-center space-x-6">
                <Link to="/chat" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">Chat Now</Link>
                <Link to="/rooms" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">Rooms</Link>
                <Link to="/random-video-chat" className="text-primary-600 dark:text-primary-400 font-medium">Video Chat</Link>
                <Link to="/login" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">Login</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Random <span className="text-primary-600">Video Chat</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Connect face-to-face with strangers through random video chat. See and talk to people from around the world in real-time video conversations.
            </p>
            <Link to="/chat" className="inline-block px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition text-lg shadow-lg flex items-center justify-center gap-2">
              <FaVideo /> Start Video Chat
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 mb-16">
            <div className="aspect-video max-w-4xl mx-auto bg-gray-900 rounded-xl flex items-center justify-center">
              <div className="text-center text-white">
                <FaVideo className="w-20 h-20 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400">Video preview will appear here</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
              <FaRandom className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Random Matching</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get connected to random strangers instantly for face-to-face conversations.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
              <FaShieldAlt className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your video is never recorded. Chat anonymously without concerns.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
              <FaMobileAlt className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Any Device</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Works on any device with a webcam - laptop, desktop, or mobile.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Video Chat Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <FaVideo className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">HD Video Quality</h4>
                  <p className="text-gray-600 dark:text-gray-400">Crystal clear video calls</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaMicrophone className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Voice Chat</h4>
                  <p className="text-gray-600 dark:text-gray-400">Built-in microphone support</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaShieldAlt className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Skip Anytime</h4>
                  <p className="text-gray-600 dark:text-gray-400">Move to next person instantly</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaUserFriends className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Global Reach</h4>
                  <p className="text-gray-600 dark:text-gray-400">Meet people from 150+ countries</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Start Random Video Chat</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Connect with strangers face-to-face. No registration required - just click and start chatting.
            </p>
            <Link to="/chat" className="inline-block px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-100 transition">
              Start Video Chat Now
            </Link>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
            <p>&copy; 2024 OmagleChat. Random video chat with strangers worldwide.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default RandomVideoChat;
