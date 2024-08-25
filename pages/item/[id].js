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
    () => fetchComments(item.kids),
    { enabled: !!item?.kids }
  );

  if (itemLoading || commentsLoading) return <LoadingIndicator />;
  if (itemError || commentsError) return <div>Error loading item</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <SEO title={item.title} description={`HN item: ${item.title}`} />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{item.title}</h1>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {item.score} points by {item.by} | {new Date(item.time * 1000).toLocaleString()}
          </p>
          {item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {item.url}
            </a>
          )}
          {item.text && <div className="mt-4" dangerouslySetInnerHTML={{ __html: item.text }} />}
        </div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Comments</h2>
        {comments && comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </main>
    </div>
  );
}