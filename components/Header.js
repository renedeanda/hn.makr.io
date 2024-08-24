
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="bg-orange-500 dark:bg-orange-700 text-white p-4 transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">HN Enhanced</h1>
        <nav className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mr-4 ${activeTab === 'news' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            News
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mr-4 ${activeTab === 'jobs' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Jobs
          </motion.button>
          <Link href="/saved">
            <a className="mr-4">Saved</a>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
