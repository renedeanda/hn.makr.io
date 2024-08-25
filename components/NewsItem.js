import Link from 'next/link';
import SaveButton from './SaveButton';
import { addUtmSource } from '../utils/linkUtils';

export default function NewsItem({ story, isSaved }) {
  const storyDate = new Date(story.time * 1000);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow transition-colors duration-200">
      <h2 className="text-lg font-semibold mb-2">
        <a href={addUtmSource(story.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-words">
          {story.title}
        </a>
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {story.score} points by {story.by} | {storyDate.toLocaleString()}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        <Link href={`/item/${story.id}`} className="hover:underline">
          {story.descendants} comments
        </Link>
      </p>
      {story.url && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 break-words">
          <a href={addUtmSource(story.url)} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {new URL(story.url).hostname}
          </a>
        </p>
      )}
      <SaveButton item={story} isSaved={isSaved} />
    </div>
  );
}