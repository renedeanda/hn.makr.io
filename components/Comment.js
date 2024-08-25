import { useState } from 'react';

export default function Comment({ comment }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {comment.by} | {new Date(comment.time * 1000).toLocaleString()}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-500 hover:underline mb-2"
      >
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      {isExpanded && (
        <>
          <div dangerouslySetInnerHTML={{ __html: comment.text }} className="mb-4" />
          {comment.kids && comment.kids.map(kid => (
            <Comment key={kid.id} comment={kid} />
          ))}
        </>
      )}
    </div>
  );
}