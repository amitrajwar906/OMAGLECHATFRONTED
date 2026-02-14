import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';

const blogPostsData = {
  'how-to-chat-safely': {
    title: 'How to Chat Safely with Strangers Online',
    date: 'February 10, 2026',
    category: 'Safety',
    readTime: '5 min read',
    content: `
      <p>Online chat platforms have revolutionized how we connect with people from around the world. Whether you're using random video chat, anonymous chat rooms, or text-based platforms like OmagleChat, it's essential to prioritize your safety while enjoying meaningful conversations.</p>

      <h2>Why Safety Matters in Online Chat</h2>
      <p>While most people use chat platforms for innocent conversations, it's important to be aware of potential risks. By following these safety guidelines, you can enjoy all the benefits of free online chat without compromising your security.</p>

      <h2>Essential Safety Tips</h2>
      
      <h3>1. Never Share Personal Information</h3>
      <p>One of the most important rules is to never share your personal information with strangers. This includes:</p>
      <ul>
        <li>Full name</li>
        <li>Home address</li>
        <li>Phone number</li>
        <li>Email address</li>
        <li>Social media profiles</li>
        <li>Financial information</li>
      </ul>

      <h3>2. Use a Unique Username</h3>
      <p>When using anonymous chat apps like OmagleChat, choose a username that doesn't reveal your identity. Avoid using your real name, birth year, or any identifiable information.</p>

      <h3>3. Be Cautious with Webcam</h3>
      <p>If using video chat:</p>
      <ul>
        <li>Consider what can be seen in your background</li>
        <li>Don't show identifying documents or items</li>
        <li>You can always cover your camera temporarily</li>
      </ul>

      <h3>4. Trust Your Instincts</h3>
      <p>If a conversation makes you uncomfortable, end it immediately. There's no obligation to continue any chat that doesn't feel right.</p>

      <h3>5. Report Bad Behavior</h3>
      <p>Most reputable chat platforms, including OmagleChat, have reporting features. Use them to report users who violate safety guidelines or make you uncomfortable.</p>

      <h2>Recognizing Red Flags</h2>
      <p>Be aware of these warning signs:</p>
      <ul>
        <li>Requests for personal information</li>
        <li>Pressure to continue conversation elsewhere</li>
        <li>Suspicious links or files</li>
        <li>Requests for money or financial information</li>
        <li>Inappropriate or offensive behavior</li>
      </ul>

      <h2>OmagleChat Safety Features</h2>
      <p>OmagleChat is committed to providing a safe environment for users. The platform includes:</p>
      <ul>
        <li>Anonymous chat without registration requirements</li>
        <li>Easy-to-use report and block features</li>
        <li>Moderation to prevent abuse</li>
        <li>No storage of personal chat logs</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Online chat can be a wonderful way to meet new people and make connections from around the world. By following these safety tips and using platforms like OmagleChat responsibly, you can enjoy all the benefits of free online chat while staying safe.</p>
    `
  },
  'tips-for-meeting-strangers-online': {
    title: 'Best Tips for Meeting Strangers Online in 2026',
    date: 'February 5, 2026',
    category: 'Tips',
    readTime: '7 min read',
    content: `
      <p>Meeting strangers online has become increasingly popular, especially with the rise of random video chat platforms. Whether you're looking for casual conversation, language practice, or making new friends, these tips will help you have better experiences.</p>

      <h2>Start with Conversation Starters</h2>
      <p>Avoid awkward silences by having conversation starters ready:</p>
      <ul>
        <li>Ask about their interests or hobbies</li>
        <li>Discuss current events or trending topics</li>
        <li>Share something about yourself to encourage reciprocity</li>
        <li>Ask open-ended questions that require more than yes/no answers</li>
      </ul>

      <h2>Be Open-Minded</h2>
      <p>One of the best aspects of random chat is the unexpected connections you'll make. Be open to talking to people from different backgrounds, cultures, and with different perspectives.</p>

      <h2>Show Genuine Interest</h2>
      <p>People appreciate when others show genuine interest in them. Ask follow-up questions, remember details from earlier in the conversation, and show that you're actively listening.</p>

      <h2>Use Text Chat First</h2>
      <p>If you're new to video chat, start with text chat to build confidence. You can always upgrade to video when you feel comfortable.</p>

      <h2>Be Patient</h2>
      <p>Not every conversation will be a perfect match, and that's okay. If a conversation isn't working, it's perfectly acceptable to move on to the next person.</p>

      <h2>Conclusion</h2>
      <p>Meeting strangers online can lead to meaningful connections and memorable experiences. Follow these tips and enjoy your journey of discovering new people through OmagleChat.</p>
    `
  },
  'random-chat-etiquette': {
    title: 'Random Chat Etiquette: Do\'s and Don\'ts',
    date: 'January 28, 2026',
    category: 'Guides',
    readTime: '4 min read',
    content: `
      <p>Just like in real life, there are unwritten rules of conduct when using random chat platforms. Following these etiquette guidelines will help create better experiences for everyone.</p>

      <h2>Do's of Random Chat</h2>
      <ul>
        <li><strong>Be respectful</strong> - Treat others as you'd like to be treated</li>
        <li><strong>Be patient</strong> - Give people time to respond</li>
        <li><strong>Be honest</strong> - Don't pretend to be someone you're not</li>
        <li><strong>Be friendly</strong> - A little kindness goes a long way</li>
        <li><strong>Have fun</strong> - Enjoy the experience!</li>
      </ul>

      <h2>Don'ts of Random Chat</h2>
      <ul>
        <li><strong>Don't spam</strong> - Repeatedly sending the same messages</li>
        <li><strong>Don't harass</strong> - Bullied or belittled others</li>
        <li><strong>Don't share explicit content</strong> - Keep conversations appropriate</li>
        <li><strong>Don't demand personal information</strong> - Respect others' privacy</li>
        <li><strong>Don't be rude when ending chats</strong> - Simply say goodbye</li>
      </ul>

      <h2>Creating Positive Experiences</h2>
      <p>The key to great random chat experiences is being genuine, respectful, and open to meeting new people. Remember that behind every screen is another human being looking for connection.</p>

      <h2>Conclusion</h2>
      <p>Good etiquette makes everyone's experience better. By following these simple guidelines, you'll make meaningful connections and have more enjoyable conversations on OmagleChat.</p>
    `
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPostsData[slug];

  if (!post) {
    return (
      <>
        <SEO title="Post Not Found" />
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
            <Link to="/blog" className="text-primary-600 hover:underline">Back to Blog</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title={post.title}
        description={`Read about ${post.title.toLowerCase()} on the official OmagleChat blog.`}
        url={`/blog/${slug}`}
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

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/blog" className="text-primary-600 hover:underline mb-8 inline-block">← Back to Blog</Link>
          
          <article>
            <header className="mb-8">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full">
                {post.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </header>

            <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              <Link to="/login" className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900 transition">
                Start Chatting
              </Link>
              <Link to="/rooms" className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900 transition">
                Chat Rooms
              </Link>
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

export default BlogPost;
