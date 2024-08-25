export function getAttributedUrl(url) {
  if (!url) return '#';
  try {
    const attributedUrl = new URL(url);
    attributedUrl.searchParams.append('utm_source', 'hn.makr.io');
    return attributedUrl.toString();
  } catch (error) {
    console.error('Invalid URL:', url);
    return url; // Return original URL if it's invalid
  }
}