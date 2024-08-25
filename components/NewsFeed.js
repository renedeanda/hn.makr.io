import { useInfiniteQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTopStories, fetchItem } from '../utils/api';
import NewsItem from './NewsItem';
import LoadingIndicator from './LoadingIndicator';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function NewsFeed({ keyword, dateFilter, sortBy }) {
  const { data, fetchNextPage, hasNextPage, isLoading, error } = useInfiniteQuery(
    ['topStories', dateFilter, sortBy],
    async ({ pageParam = 0 }) => {
      const topStoryIds = await fetchTopStories();
      const pageSize = 30;
      const start = pageParam * pageSize;
      const end = start + pageSize;
      const items = await Promise.all(topStoryIds.slice(start, end).map(fetchItem));
      return filterAndSortItems(items, keyword, dateFilter, sortBy);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length === 30 ? pages.length : undefined;
      },
    }
  );

  if (isLoading) return <LoadingIndicator />;
  if (error) return <div>Error loading stories: {error.message}</div>;

  const allStories = data ? data.pages.flat() : [];

  return (
    <InfiniteScroll
      dataLength={allStories.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<LoadingIndicator />}
    >
      <AnimatePresence>
        {allStories.map((story) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <NewsItem story={story} />
          </motion.div>
        ))}
      </AnimatePresence>
    </InfiniteScroll>
  );
}

function filterAndSortItems(items, keyword, dateFilter, sortBy) {
  let filteredItems = items.filter((item) => 
    item.title.toLowerCase().includes(keyword.toLowerCase()) ||
    (item.text && item.text.toLowerCase().includes(keyword.toLowerCase()))
  );

  if (dateFilter !== 'all') {
    const now = Date.now();
    const filterTime = {
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
    }[dateFilter];

    filteredItems = filteredItems.filter((item) => now - item.time * 1000 < filterTime);
  }

  filteredItems.sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'date') return b.time - a.time;
    if (sortBy === 'comments') return (b.descendants || 0) - (a.descendants || 0);
    return 0;
  });

  return filteredItems;
}