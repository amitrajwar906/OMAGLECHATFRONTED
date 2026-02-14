import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import api from '../services/api';
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Contact = () => {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setSending(true);
    try {
      await api.post('/contact', formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with OmagleChat. We'd love to hear from you!"
        url="/contact"
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
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full top-20 left-10" style={{ animation: 'float 8s ease-in-out infinite' }}></div>
          <div className="absolute w-64 h-64 bg-pink-500/20 rounded-full top-1/3 right-20" style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '1s' }}></div>
          <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full bottom-20 left-1/3" style={{ animation: 'float 7s ease-in-out infinite', animationDelay: '2s' }}></div>
        </div>

        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-2xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-white">OmagleChat</span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/login" className="text-gray-300 hover:text-white transition-all duration-300">Chat Now</Link>
                <Link to="/about" className="text-gray-300 hover:text-white transition-all duration-300">About</Link>
                <Link to="/contact" className="text-white font-medium">Contact</Link>
                <Link to="/login" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all">Login</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-40 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center px-5 py-2 bg-purple-500/20 rounded-full mb-8 border border-purple-500/30">
              <span className="text-purple-300 text-sm font-medium">Get in Touch</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              We'd Love to
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Hear From You
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Have questions or feedback? Our team is here to help you with anything you need.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FaEnvelope className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-gray-400">contact@omaglechat.com</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 hover:border-pink-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FaMapMarkerAlt className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                <p className="text-gray-400">Worldwide</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FaClock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Hours</h3>
                <p className="text-gray-400">24/7 Support</p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-10 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="John Doe" 
                        value={formData.name} 
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="john@example.com" 
                        value={formData.email} 
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <input 
                      type="text" 
                      name="subject" 
                      placeholder="What is this about?" 
                      value={formData.subject} 
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea 
                      name="message" 
                      rows={5} 
                      placeholder="Your message..." 
                      value={formData.message} 
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                      required 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={sending}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {sending ? 'Sending...' : <>Send Message <FaPaperPlane /></>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 border-t border-white/10 bg-black/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-10">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="text-white font-bold text-lg">OmagleChat</span>
                </div>
                <p className="text-gray-400">Free online chat connecting the world.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><Link to="/login" className="hover:text-purple-400 transition-colors">Chat Now</Link></li>
                  <li><Link to="/rooms" className="hover:text-purple-400 transition-colors">Chat Rooms</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><Link to="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                  <li><Link to="/blog" className="hover:text-purple-400 transition-colors">Blog</Link></li>
                  <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 mt-10 pt-8 text-center text-gray-500">
              <p>© 2024 OmagleChat. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Contact;
