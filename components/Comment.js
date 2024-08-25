import { useState } from 'react';

const colors = [
  'border-blue-400',
  'border-green-400',
  'border-yellow-400',
  'border-red-400',
  'border-purple-400',
];

export default function Comment({ comment, depth = 0 }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const borderColor = colors[depth % colors.length];

  return (
    <div className={`bg-gray-800 p-2 rounded-lg shadow mb-2 border-l-2 ${borderColor}`}>
      <div className="text-xs text-gray-400 mb-1">
        {comment.by} | {new Date(comment.time * 1000).toLocaleString()}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-400 hover:underline text-xs mb-1"
      >
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      {isExpanded && (
        <>
          <div dangerouslySetInnerHTML={{ __html: comment.text }} className="mb-2 text-sm" />
          {comment.kids && comment.kids.map(kid => (
            <Comment key={kid.id} comment={kid} depth={depth + 1} />
          ))}
        </>
      )}
    </div>
  );
}