import { motion } from 'framer-motion';
import Link from 'next/link';
import SaveButton from './SaveButton';

export default function NewsItem({ story, isSaved }) {
  const storyDate = new Date(story.time * 1000);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow transition-colors duration-200"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-2">
        <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-words">
          {story.title}
        </a>
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {story.score} points by {story.by} | {storyDate.toLocaleString()} | {' '}
        <Link href={`/item/${story.id}`} className="hover:underline">
          {story.descendants} comments
        </Link>
      </p>
      {story.url && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 break-words">
          <a href={story.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {new URL(story.url).hostname}
          </a>
        </p>
      )}
      <div className="mt-2">
        <SaveButton item={story} isSaved={isSaved} />
      </div>
    </motion.div>
  );
}