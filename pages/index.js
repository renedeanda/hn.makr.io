
import { useState } from 'react';
import Header from '../components/Header';
import NewsFeed from '../components/NewsFeed';
import JobsFeed from '../components/JobsFeed';
import ErrorBoundary from '../components/ErrorBoundary';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

export default function Home() {
  const [activeTab, setActiveTab] = useState('news');
  const [keyword, setKeyword] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <SEO 
        title="Home" 
        description="Enhanced Hacker News with job listings and improved UX"
      />
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Filter by keyword..."
            className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </motion.div>
        <ErrorBoundary>
          {activeTab === 'news' ? (
            <NewsFeed keyword={keyword} />
          ) : (
            <JobsFeed keyword={keyword} />
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
}
