import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Privacy = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="OmagleChat Privacy Policy. Learn how we protect your data, ensure anonymous chat, and maintain your privacy while using our free online chat platform."
        url="/privacy"
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
                <Link to="/login" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">Login</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">Last updated: February 2026</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At OmagleChat, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our free online chat platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Personal Information</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Username and display name</li>
                <li>Email address (if you create an account)</li>
                <li>Profile information you choose to share</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                <li>Device information (type, operating system, browser)</li>
                <li>Usage data and interaction patterns</li>
                <li>Connection data (IP address for security purposes)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                <li>To provide and maintain our chat services</li>
                <li>To improve and personalize your experience</li>
                <li>To communicate with you about service updates</li>
                <li>To ensure safety and prevent abuse</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Anonymous Chat</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                OmagleChat is designed for anonymous communication. You can use our platform without revealing your identity. We do not require phone numbers or social media accounts to start chatting.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Data Security</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information, including encryption of data in transit and at rest.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Your Rights</h2>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                <li>Right to access your personal information</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about this Privacy Policy, please contact us at support@omaglechat.com.
              </p>
            </section>
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

export default Privacy;
