import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Card } from '../components/ui';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import api from '../services/api';

const Support = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEO 
        title="Contact Support" 
        description="Get help and support from OmagleChat. Contact our support team for any questions or issues."
        url="/support"
      />
      
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-purple-600">OmagleChat</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-purple-600">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Support</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Have questions? We're here to help!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Card className="p-6 text-center">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">support@omaglechat.com</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Response Time</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">We respond within 24 hours</p>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input name="name" label="Your Name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
              <Input name="email" type="email" label="Email Address" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
            </div>
            <Input name="subject" label="Subject" placeholder="How can we help you?" value={formData.subject} onChange={handleChange} required />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea name="message" rows={5} placeholder="Describe your issue..." value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
            </div>
            <Button type="submit" size="lg" loading={sending} className="w-full">Send Message</Button>
          </form>
        </Card>
      </div>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <span className="text-xl font-bold text-purple-600 mb-4 md:mb-0">OmagleChat</span>
            <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
              <Link to="/privacy" className="hover:text-purple-600">Privacy</Link>
              <Link to="/terms" className="hover:text-purple-600">Terms</Link>
              <Link to="/contact" className="hover:text-purple-600">Contact</Link>
            </div>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">© 2024 OmagleChat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Support;
