
import Head from 'next/head';

export default function SEO({ title, description }) {
  return (
    <Head>
      <title>{title} | HN Enhanced</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="HN Enhanced" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </Head>
  );
}
