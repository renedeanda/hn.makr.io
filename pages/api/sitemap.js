import { fetchTopStories, fetchItem } from '../../utils/api';

const generateSitemap = (stories) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://hn.makr.io</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://hn.makr.io/saved</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      ${stories.map((story) => `
        <url>
          <loc>https://hn.makr.io/item/${story.id}</loc>
          <lastmod>${new Date(story.time * 1000).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.6</priority>
        </url>
      `).join('')}
    </urlset>
  `;
};

export default async function handler(req, res) {
  try {
    const topStoryIds = await fetchTopStories();
    const stories = await Promise.all(topStoryIds.slice(0, 100).map(fetchItem));
    
    const sitemap = generateSitemap(stories);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Error generating sitemap' });
  }
}