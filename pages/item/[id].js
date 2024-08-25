import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchItem, fetchComments } from '../../utils/api';
import Header from '../../components/Header';
import SEO from '../../components/SEO';
import LoadingIndicator from '../../components/LoadingIndicator';
import Comment from '../../components/Comment';

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
    <div className="min-h-screen bg-gray-900 text-white">
      <SEO 
        title={item ? item.title : 'Loading...'}
        description={item ? `View details and comments for "${item.title}" on HN Enhanced.` : 'Loading item details...'}
      />
      <Header />
      <main className="container mx-auto px-4 py-4">
        {item && (
          <>
            <h1 className="text-xl font-bold mb-2">{item.title}</h1>
            <div className="bg-gray-800 p-4 rounded-lg shadow mb-4">
              <p className="text-sm text-gray-400 mb-2">
                {item.score} points by {item.by} | {new Date(item.time * 1000).toLocaleString()}
              </p>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
                  {item.url}
                </a>
              )}
              {item.text && <div className="mt-2 text-sm" dangerouslySetInnerHTML={{ __html: item.text }} />}
            </div>
            <h2 className="text-lg font-semibold mb-2">Comments</h2>
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