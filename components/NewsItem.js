import { motion } from 'framer-motion';
import Link from 'next/link';
import SaveButton from './SaveButton';

export default function NewsItem({ story }) {
  const storyDate = new Date(story.time * 1000);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow transition-colors duration-200"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-2">
        <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
          {story.title}
        </a>
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {story.score} points by {story.by} | {storyDate.toLocaleString()} | {story.descendants} comments
      </p>
      <div className="mt-2 flex items-center">
        <SaveButton item={story} />
        <Link href={`/item/${story.id}`} className="ml-4 text-blue-500 hover:underline">
          View Discussion
        </Link>
      </div>
    </motion.div>
  );
}