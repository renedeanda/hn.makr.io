import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header({ activeTab, setActiveTab }) {
  const router = useRouter();

  const handleTabChange = (tab) => {
    if (setActiveTab) {
      setActiveTab(tab);
    } else {
      router.push(tab === 'news' ? '/' : '/jobs');
    }
  };

  return (
    <header className="bg-primary-light dark:bg-primary-dark text-white p-4 transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">HN Enhanced</h1>
        <nav className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mr-4 ${activeTab === 'news' ? 'font-bold' : ''}`}
            onClick={() => handleTabChange('news')}
          >
            News
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mr-4 ${activeTab === 'jobs' ? 'font-bold' : ''}`}
            onClick={() => handleTabChange('jobs')}
          >
            Jobs
          </motion.button>
          <Link href="/saved" className="mr-4 hover:underline">
            Saved
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}