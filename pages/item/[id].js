import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchItem, fetchComments } from '../../utils/api';
import Header from '../../components/Header';
import SEO from '../../components/SEO';
import LoadingIndicator from '../../components/LoadingIndicator';
import Comment from '../../components/Comment';
import { addUtmSource } from '../../utils/linkUtils';

export default function ItemPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: item, isLoading: itemLoading, error: itemError } = useQuery(
    ['item', id],
    () => fetchItem(id),
    { enabled: !!id }
  );

  const { data: comments, isLoading: commentsLoading, error: commentsError } = useQuery(
    ['comments', id],
    () => fetchComments(item?.kids || []),
    { enabled: !!item?.kids }
  );

  if (itemLoading) return <LoadingIndicator />;
  if (itemError) return <div>Error loading item: {itemError.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <SEO 
        title={item ? item.title : 'Loading...'}
        description={item ? `View details and comments for "${item.title}" on HN Enhanced.` : 'Loading item details...'}
      />
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16 overflow-x-hidden">
        {item && (
          <>
            <h1 className="text-2xl font-bold mb-4 break-words">{item.title}</h1>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-8 overflow-hidden">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 break-words">
                {item.score} points by {item.by} | {new Date(item.time * 1000).toLocaleString()}
              </p>
              {item.url && (
                <a href={addUtmSource(item.url)} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm break-words block">
                  {item.url}
                </a>
              )}
              {item.text && <div className="mt-4 text-sm break-words" dangerouslySetInnerHTML={{ __html: item.text }} />}
            </div>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            {commentsLoading ? (
              <LoadingIndicator />
            ) : commentsError ? (
              <div>Error loading comments: {commentsError.message}</div>
            ) : (
              comments && comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))
            )}
          </>
        )}
      </main>
    </div>
  );
}