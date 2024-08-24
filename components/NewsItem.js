
import { motion } from 'framer-motion';
import SaveButton from './SaveButton';
import ShareButton from './ShareButton';

export default function NewsItem({ story }) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 mb-4 rounded shadow transition-colors duration-200"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-2">
        <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
          {story.title}
        </a>
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        {story.score} points by {story.by} | {story.descendants} comments
      </p>
      <div className="mt-2">
        <SaveButton item={story} />
        <ShareButton item={story} />
      </div>
    </motion.div>
  );
}
