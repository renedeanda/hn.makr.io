import { useQuery } from 'react-query';
import { getSavedItems } from '../utils/offlineStorage';
import NewsItem from '../components/NewsItem';
import JobItem from '../components/JobItem';
import Header from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';
import EmptyState from '../components/EmptyState';
import SEO from '../components/SEO';

export default function SavedItems() {
  const { data: savedItems, isLoading, error } = useQuery('savedItems', getSavedItems);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <div>Error loading saved items: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <SEO 
        title="Saved Items"
        description="Access your curated collection of saved articles and job listings from HN Enhanced. Easily manage and revisit your favorite tech news and opportunities."
      />
      <Header />
      <main className="container mx-auto px-4 py-8 mt-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Saved Items</h1>
        {savedItems && savedItems.length > 0 ? (
          savedItems.map((item) => (
            item.type === 'job' 
              ? <JobItem key={item.id} job={item} isSaved={true} /> 
              : <NewsItem key={item.id} story={item} isSaved={true} />
          ))
        ) : (
          <EmptyState message="No saved items yet. Start saving interesting stories and jobs!" />
        )}
      </main>
    </div>
  );
}