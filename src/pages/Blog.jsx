import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const blogPosts = [
  {
    slug: 'how-to-chat-safely',
    title: 'How to Chat Safely with Strangers Online',
    excerpt: 'Essential tips for maintaining your privacy and security while chatting with strangers on OmagleChat and other platforms.',
    date: 'February 10, 2026',
    readTime: '5 min read',
    category: 'Safety'
  },
  {
    slug: 'tips-for-meeting-strangers-online',
    title: 'Best Tips for Meeting Strangers Online in 2026',
    excerpt: 'Discover the best practices for meeting and connecting with new people through random chat and video chat platforms.',
    date: 'February 5, 2026',
    readTime: '7 min read',
    category: 'Tips'
  },
  {
    slug: 'random-chat-etiquette',
    title: 'Random Chat Etiquette: Do\'s and Don\'ts',
    excerpt: 'Learn the unwritten rules of random chat that will help you have better conversations and make more connections.',
    date: 'January 28, 2026',
    readTime: '4 min read',
    category: 'Guides'
  },
  {
    slug: 'video-chat-vs-text-chat',
    title: 'Video Chat vs Text Chat: Which is Right for You?',
    excerpt: 'Compare the benefits of video chat and text chat to find the best communication method for your needs.',
    date: 'January 20, 2026',
    readTime: '6 min read',
    category: 'Comparison'
  },
  {
    slug: 'making-friends-through-online-chat',
    title: 'How to Make Long-Lasting Friends Through Online Chat',
    excerpt: 'Building genuine friendships through anonymous chat platforms. Tips for turning casual conversations into meaningful connections.',
    date: 'January 15, 2026',
    readTime: '8 min read',
    category: 'Social'
  },
  {
    slug: 'online-chat-statistics-2026',
    title: 'Online Chat Statistics and Trends in 2026',
    excerpt: 'The latest statistics on online chat usage, random video chat growth, and the future of anonymous communication.',
    date: 'January 10, 2026',
    readTime: '5 min read',
    category: 'Statistics'
  }
];

const Blog = () => {
  return (
    <>
      <SEO 
        title="Blog - Tips, Guides & News about Online Chat"
        description="Read the latest articles about online chat safety, tips for meeting strangers, random chat etiquette, and making friends through OmagleChat."
        url="/blog"
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
                <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">About</Link>
                <Link to="/blog" className="text-primary-600 dark:text-primary-400 font-medium">Blog</Link>
                <Link to="/login" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">Login</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              OmagleChat <span className="text-primary-600">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Tips, guides, and insights about online chat, video conversations, and making meaningful connections with strangers worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                    <Link to={`/blog/${post.slug}`} className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 bg-primary-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Chatting?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Put these tips into practice and have amazing conversations on OmagleChat today!
            </p>
            <Link to="/login" className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition">
              Start Free Chat
            </Link>
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
                  <li><Link to="/login" className="hover:text-white transition">Chat Now</Link></li>
                  <li><Link to="/rooms" className="hover:text-white transition">Chat Rooms</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                  <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
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

export default Blog;
