import { useState } from 'react';

const colors = [
  'border-blue-500',
  'border-green-500',
  'border-yellow-500',
  'border-red-500',
  'border-purple-500',
];

export default function Comment({ comment, depth = 0 }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const borderColor = colors[depth % colors.length];

  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 border-l-4 ${borderColor}`}>
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
            <Comment key={kid.id} comment={kid} depth={depth + 1} />
          ))}
        </>
      )}
    </div>
  );
}