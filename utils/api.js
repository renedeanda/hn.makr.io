
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
