import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import NewsFeed from '../components/NewsFeed';
import JobsFeed from '../components/JobsFeed';
import ErrorBoundary from '../components/ErrorBoundary';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.query.tab || 'news');
  const [keyword, setKeyword] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score');

  useEffect(() => {
    setActiveTab(router.query.tab || 'news');
  }, [router.query.tab]);

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <SEO 
        title={activeTab === 'news' ? "Latest Tech News" : "Tech Job Listings"}
        description={`Explore ${activeTab === 'news' ? 'the latest tech news' : 'tech job opportunities'} from Hacker News with enhanced features. Filter, sort, and save your favorite posts with HN Enhanced.`}
      />
      <Header activeTab={activeTab} />
      <main className="container mx-auto px-4 pt-2 pb-8">
        <div className="text-center mt-2 mb-4">
          <a 
            href="https://renedeanda.com?utm_source=hn.makr.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-700 dark:text-gray-300 hover:underline"
          >
            Created with 🧡 + 🤖 by René DeAnda
          </a>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 mb-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <select
              value={dateFilter}
              onChange={handleDateFilterChange}
              className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <option value="all">All time</option>
              <option value="day">Past 24 hours</option>
              <option value="week">Past week</option>
              <option value="month">Past month</option>
            </select>
            <select
              value={sortBy}
              onChange={handleSortByChange}
              className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <option value="score">Sort by Score</option>
              <option value="date">Sort by Date</option>
              <option value="comments">Sort by Comments</option>
            </select>
          </div>
        </motion.div>
        <ErrorBoundary>
          {activeTab === 'news' ? (
            <NewsFeed keyword={keyword} dateFilter={dateFilter} sortBy={sortBy} />
          ) : (
            <JobsFeed keyword={keyword} dateFilter={dateFilter} sortBy={sortBy} />
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
}