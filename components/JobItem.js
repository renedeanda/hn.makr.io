import Link from 'next/link';
import SaveButton from './SaveButton';
import { addUtmSource } from '../utils/linkUtils';

export default function JobItem({ job, isSaved }) {
  const jobDate = new Date(job.time * 1000);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow transition-colors duration-200">
      <h2 className="text-lg font-semibold mb-2">
        <a href={addUtmSource(job.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-words">
          {job.title}
        </a>
      </h2>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
        Posted by {job.by} | {jobDate.toLocaleString()}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        <Link href={`/item/${job.id}`} className="hover:underline">
          View Details
        </Link>
      </p>
      {job.url && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 break-words">
          <a href={addUtmSource(job.url)} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {new URL(job.url).hostname}
          </a>
        </p>
      )}
      {job.text && <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 break-words" dangerouslySetInnerHTML={{ __html: job.text }} />}
      <SaveButton item={job} isSaved={isSaved} />
    </div>
  );
}