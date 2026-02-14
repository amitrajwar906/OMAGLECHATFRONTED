import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaShieldAlt, FaVideo, FaGlobe, FaHeart, FaStar } from 'react-icons/fa';
import SEO from '../components/SEO';

const About = () => {
  return (
    <>
      <SEO 
        title="About - Free Online Chat Platform"
        description="Learn about OmagleChat, the leading free online chat platform. Connect with strangers worldwide through random video chat, text chat, and anonymous chat rooms."
        url="/about"
      />
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary-600">OmagleChat</span>
              </Link>
              <div className="flex items-center space-x-6">
                <Link to="/chat" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">Chat Now</Link>
                <Link to="/about" className="text-primary-600 dark:text-primary-400 font-medium">About</Link>
                <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">Blog</Link>
                <Link to="/login" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">Login</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About <span className="text-primary-600">OmagleChat</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connecting people worldwide through free online chat, anonymous conversations, and random video chat experiences since 2024.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                At OmagleChat, we believe everyone deserves a safe, free platform to connect with others. Our mission is to break down barriers and create meaningful connections through anonymous chat rooms and random video chat.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Whether you're looking for casual conversation, want to practice a new language, or simply want to meet interesting people from around the world, OmagleChat provides the perfect platform.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <FaUsers className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">500K+</div>
                <div className="text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <FaGlobe className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">150+</div>
                <div className="text-gray-600 dark:text-gray-400">Countries</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <FaVideo className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">1M+</div>
                <div className="text-gray-600 dark:text-gray-400">Chats Daily</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <FaStar className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">4.8/5</div>
                <div className="text-gray-600 dark:text-gray-400">User Rating</div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Why Choose OmagleChat?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <FaShieldAlt className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Safe & Anonymous</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Chat without revealing your identity. Our platform prioritizes your privacy and security in every conversation.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <FaVideo className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Video & Text Chat</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose how you want to connect. Switch between video chat and text chat instantly during conversations.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <FaHeart className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Free for Everyone</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  No subscriptions, no hidden fees. Enjoy unlimited access to all chat features completely free.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Chatting?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of people connecting through OmagleChat every day. Start your anonymous chat now!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat" className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition">
                Start Chatting Free
              </Link>
              <Link to="/register" className="px-8 py-4 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition">
                Create Account
              </Link>
            </div>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">OmagleChat</h3>
                <p className="text-gray-400">Free online chat connecting the world.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/chat" className="hover:text-white transition">Chat Now</Link></li>
                  <li><Link to="/rooms" className="hover:text-white transition">Chat Rooms</Link></li>
                  <li><Link to="/random-video-chat" className="hover:text-white transition">Video Chat</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                  <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 OmagleChat. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About;
