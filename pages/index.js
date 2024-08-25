import { useState } from 'react';
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.push(`/?tab=${tab}`, undefined, { shallow: true });
  };

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
        description={`Explore ${activeTab === 'news' ? 'the latest tech news' : 'tech job opportunities'} from Hacker News with enhanced features on HN Enhanced.`}
      />
      <Header activeTab={activeTab} setActiveTab={handleTabChange} />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="flex flex-wrap gap-4">
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