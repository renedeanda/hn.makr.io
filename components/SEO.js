import Head from 'next/head';

export default function SEO({ title, description }) {
  const siteUrl = 'https://hn.makr.io';
  const fullTitle = `${title} | HN Enhanced`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="HN Enhanced" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@hnmakrio" />
      <link rel="canonical" href={siteUrl} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </Head>
  );
}