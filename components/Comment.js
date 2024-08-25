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
    <div className={`bg-white dark:bg-gray-800 p-2 rounded-lg shadow mb-2 border-l-2 ${borderColor} overflow-hidden transition-colors duration-200`}>
      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 break-words">
        {comment.by} | {new Date(comment.time * 1000).toLocaleString()}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-500 dark:text-blue-400 hover:underline text-xs mb-1"
      >
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      {isExpanded && (
        <>
          <div 
            dangerouslySetInnerHTML={{ __html: comment.text }} 
            className="mb-2 text-sm break-words overflow-wrap-anywhere text-gray-800 dark:text-gray-200"
          />
          {comment.kids && comment.kids.map(kid => (
            <Comment key={kid.id} comment={kid} depth={depth + 1} />
          ))}
        </>
      )}
    </div>
  );
}