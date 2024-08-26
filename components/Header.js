import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeTab = router.query.tab || 'news';
  const { theme } = useTheme();

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#1F2937' : '#FFA07A');
  }, [theme]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-primary-light dark:bg-gray-800 text-white transition-colors duration-200 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold" onClick={handleLinkClick}>
          HN Enhanced
        </Link>
        <div className="flex items-center">
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 right-0 md:top-auto bg-primary-light dark:bg-gray-800 md:bg-transparent`}>
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <Link href="/?tab=news" onClick={handleLinkClick} className={`block w-full md:w-auto py-2 px-4 md:inline-block md:mt-0 hover:bg-primary-dark dark:hover:bg-gray-700 md:hover:bg-transparent ${activeTab === 'news' ? 'font-bold' : ''}`}>
                News
              </Link>
              <Link href="/?tab=jobs" onClick={handleLinkClick} className={`block w-full md:w-auto py-2 px-4 md:inline-block md:mt-0 hover:bg-primary-dark dark:hover:bg-gray-700 md:hover:bg-transparent ${activeTab === 'jobs' ? 'font-bold' : ''}`}>
                Jobs
              </Link>
              <Link href="/saved" onClick={handleLinkClick} className="block w-full md:w-auto py-2 px-4 md:inline-block md:mt-0 hover:bg-primary-dark dark:hover:bg-gray-700 md:hover:bg-transparent">
                Saved
              </Link>
              <a 
                href="https://rede.io/?utm_source=hn.makr.io" 
                onClick={handleLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full md:w-auto py-2 px-4 md:inline-block md:mt-0 hover:bg-primary-dark dark:hover:bg-gray-700 md:hover:bg-transparent font-bold flex items-center"
              >
                📚 Rede.io - Daily Tech News
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </nav>
          <div className="md:hidden ml-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}