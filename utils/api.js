const API_BASE = 'https://hacker-news.firebaseio.com/v0';

export async function fetchTopStories() {
  const response = await fetch(`${API_BASE}/topstories.json`);
  return response.json();
}

export async function fetchJobStories() {
  const response = await fetch(`${API_BASE}/jobstories.json`);
  return response.json();
}

export async function fetchItem(id) {
  const response = await fetch(`${API_BASE}/item/${id}.json`);
  return response.json();
}

export async function fetchComments(kidIds) {
  const comments = await Promise.all(kidIds.map(fetchItem));
  const commentsWithReplies = await Promise.all(comments.map(async (comment) => {
    if (comment.kids) {
      comment.kids = await fetchComments(comment.kids);
    }
    return comment;
  }));
  return commentsWithReplies;
}