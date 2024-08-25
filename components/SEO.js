import Head from 'next/head';

export default function SEO({ title, description }) {
  const fullTitle = `${title ? `${title} | ` : ''}HN Enhanced`;
  const defaultDescription = "Explore the latest tech news and job opportunities with HN Enhanced - a modern, feature-rich Hacker News client. Stay updated with curated content, easy navigation, and a seamless reading experience.";
  const siteUrl = "https://hn.makr.io";
  const imageUrl = "https://hn.makr.io/og-image.png"; // Ensure this image exists in your public folder

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={imageUrl} />

      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    </Head>
  );
}