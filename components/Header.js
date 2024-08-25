import { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const activeTab = router.query.tab || 'news';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-primary-light dark:bg-primary-dark text-white p-4 transition-colors duration-200 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:underline">
          HN Enhanced
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 right-0 md:top-auto bg-primary-light dark:bg-primary-dark md:bg-transparent`}>
          <Link href="/?tab=news" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`block md:inline-block py-2 px-4 md:p-0 md:mr-4 ${activeTab === 'news' ? 'font-bold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              News
            </motion.a>
          </Link>
          <Link href="/?tab=jobs" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`block md:inline-block py-2 px-4 md:p-0 md:mr-4 ${activeTab === 'jobs' ? 'font-bold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Jobs
            </motion.a>
          </Link>
          <Link href="/saved" passHref>
            <motion.a
              className="block md:inline-block py-2 px-4 md:p-0 md:mr-4 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Saved
            </motion.a>
          </Link>
          <div className="py-2 px-4 md:p-0">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}