
import { useInfiniteQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTopStories, fetchItem } from '../utils/api';
import NewsItem from './NewsItem';
import LoadingIndicator from './LoadingIndicator';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function NewsFeed({ keyword }) {
  const { data, fetchNextPage, hasNextPage, isLoading, error } = useInfiniteQuery(
    'topStories',
    async ({ pageParam = 0 }) => {
      const topStoryIds = await fetchTopStories();
      const pageSize = 30;
      const start = pageParam * pageSize;
      const end = start + pageSize;
      return Promise.all(topStoryIds.slice(start, end).map(fetchItem));
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
  const filteredStories = allStories.filter(
    (story) =>
      story.title.toLowerCase().includes(keyword.toLowerCase()) ||
      (story.text && story.text.toLowerCase().includes(keyword.toLowerCase()))
  );

  return (
    <InfiniteScroll
      dataLength={filteredStories.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<LoadingIndicator />}
    >
      <AnimatePresence>
        {filteredStories.map((story) => (
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
