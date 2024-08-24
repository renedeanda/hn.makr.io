
import { useInfiniteQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchJobStories, fetchItem } from '../utils/api';
import JobItem from './JobItem';
import LoadingIndicator from './LoadingIndicator';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function JobsFeed({ keyword }) {
  const { data, fetchNextPage, hasNextPage, isLoading, error } = useInfiniteQuery(
    'jobStories',
    async ({ pageParam = 0 }) => {
      const jobStoryIds = await fetchJobStories();
      const pageSize = 30;
      const start = pageParam * pageSize;
      const end = start + pageSize;
      return Promise.all(jobStoryIds.slice(start, end).map(fetchItem));
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length === 30 ? pages.length : undefined;
      },
    }
  );

  if (isLoading) return <LoadingIndicator />;
  if (error) return <div>Error loading jobs: {error.message}</div>;

  const allJobs = data ? data.pages.flat() : [];
  const filteredJobs = allJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(keyword.toLowerCase()) ||
      (job.text && job.text.toLowerCase().includes(keyword.toLowerCase()))
  );

  return (
    <InfiniteScroll
      dataLength={filteredJobs.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<LoadingIndicator />}
    >
      <AnimatePresence>
        {filteredJobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <JobItem job={job} />
          </motion.div>
        ))}
      </AnimatePresence>
    </InfiniteScroll>
  );
}
