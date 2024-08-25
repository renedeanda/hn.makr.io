import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeTab = router.query.tab || 'news';

  return (
    <header className="bg-primary-light dark:bg-primary-dark text-white transition-colors duration-200 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          HN Enhanced
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 right-0 md:top-auto bg-primary-light dark:bg-primary-dark md:bg-transparent`}>
          <div className="flex flex-col md:flex-row items-center">
            <Link href="/?tab=news" className={`block py-2 px-4 md:inline-block md:mt-0 hover:text-white mr-4 ${activeTab === 'news' ? 'font-bold' : ''}`}>
              News
            </Link>
            <Link href="/?tab=jobs" className={`block py-2 px-4 md:inline-block md:mt-0 hover:text-white mr-4 ${activeTab === 'jobs' ? 'font-bold' : ''}`}>
              Jobs
            </Link>
            <Link href="/saved" className="block py-2 px-4 md:inline-block md:mt-0 hover:text-white mr-4">
              Saved
            </Link>
            <div className="py-2 px-4 md:p-0">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}