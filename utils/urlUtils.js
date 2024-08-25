export function addUtmSource(url) {
  try {
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.append('utm_source', 'hn.makr.io');
    return parsedUrl.toString();
  } catch (error) {
    console.error('Invalid URL:', url);
    return url;
  }
}