import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const activeTab = router.query.tab || 'news';

  return (
    <header className="bg-primary-light dark:bg-primary-dark text-white p-4 transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:underline">
          HN Enhanced
        </Link>
        <nav className="flex items-center">
          <Link href="/?tab=news" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mr-4 ${activeTab === 'news' ? 'font-bold' : ''}`}
            >
              News
            </motion.a>
          </Link>
          <Link href="/?tab=jobs" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mr-4 ${activeTab === 'jobs' ? 'font-bold' : ''}`}
            >
              Jobs
            </motion.a>
          </Link>
          <Link href="/saved" className="mr-4 hover:underline">
            Saved
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}