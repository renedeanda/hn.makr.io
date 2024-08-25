import { motion } from 'framer-motion';
import Link from 'next/link';
import SaveButton from './SaveButton';

export default function JobItem({ job, isSaved }) {
  const jobDate = new Date(job.time * 1000);

  const getAttributedUrl = (url) => {
    if (!url) return '#';
    const attributedUrl = new URL(url);
    attributedUrl.searchParams.append('utm_source', 'hn.makr.io');
    return attributedUrl.toString();
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow transition-colors duration-200"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-2">
        <a href={getAttributedUrl(job.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
          {job.title}
        </a>
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Posted by {job.by} | {jobDate.toLocaleString()} | {' '}
        <Link href={`/item/${job.id}`} className="hover:underline">
          View Details
        </Link>
      </p>
      {job.text && <div className="mt-2 text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: job.text }} />}
      <div className="mt-2">
        <SaveButton item={job} isSaved={isSaved} />
      </div>
    </motion.div>
  );
}