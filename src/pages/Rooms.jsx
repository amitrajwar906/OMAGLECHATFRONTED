import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FaComments, FaGamepad, FaMusic, FaHeart, FaGlobeAmericas, FaLanguage, FaCoffee, FaFilm } from 'react-icons/fa';

const rooms = [
  { id: 'general', name: 'General Chat', icon: FaComments, description: 'Chat about anything', members: 1243 },
  { id: 'friendship', name: 'Friendship', icon: FaHeart, description: 'Make new friends', members: 856 },
  { id: 'dating', name: 'Dating & Romance', icon: FaCoffee, description: 'Meet someone special', members: 723 },
  { id: 'gaming', name: 'Gaming', icon: FaGamepad, description: 'Gamers unite', members: 567 },
  { id: 'music', name: 'Music', icon: FaMusic, description: 'Share your favorite tunes', members: 432 },
  { id: 'movies', name: 'Movies & TV', icon: FaFilm, description: 'Discuss films and shows', members: 389 },
  { id: 'travel', name: 'Travel', icon: FaGlobeAmericas, description: 'Share travel experiences', members: 298 },
  { id: 'language', name: 'Language Exchange', icon: FaLanguage, description: 'Practice languages', members: 445 },
];

const Rooms = () => {
  return (
    <>
      <SEO 
        title="Chat Rooms - Join Free Online Chat Rooms"
        description="Browse and join free online chat rooms on OmagleChat. Find chat rooms for friendship, dating, gaming, music, movies, travel, language exchange and more."
        url="/rooms"
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
                <Link to="/rooms" className="text-primary-600 dark:text-primary-400 font-medium">Rooms</Link>
                <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">About</Link>
                <Link to="/login" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">Login</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Free Online <span className="text-primary-600">Chat Rooms</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join topic-based chat rooms and connect with like-minded people from around the world. Free to use, no registration required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {rooms.map((room) => (
              <Link key={room.id} to={`/chat?room=${room.id}`} className="block">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <room.icon className="w-10 h-10 text-primary-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{room.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{room.description}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {room.members.toLocaleString()} online
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Why Use OmagleChat Rooms?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Topic-Focused</h3>
                <p className="text-gray-600 dark:text-gray-300">Find rooms that match your interests</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Active Community</h3>
                <p className="text-gray-600 dark:text-gray-300">Thousands of active users daily</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Free Access</h3>
                <p className="text-gray-600 dark:text-gray-300">No fees, no subscriptions</p>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
            <p>&copy; 2024 OmagleChat. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Rooms;
