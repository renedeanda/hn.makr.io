import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />

          {/* Primary Meta Tags */}
          <meta name="title" content="HN Enhanced - A Better Hacker News Experience" />
          <meta name="description" content="Explore the latest tech news and job opportunities with HN Enhanced - a modern, feature-rich Hacker News client. Stay updated with curated content, easy navigation, and a seamless reading experience." />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://hn.makr.io/" />
          <meta property="og:title" content="HN Enhanced - A Better Hacker News Experience" />
          <meta property="og:description" content="Explore the latest tech news and job opportunities with HN Enhanced - a modern, feature-rich Hacker News client. Stay updated with curated content, easy navigation, and a seamless reading experience." />
          <meta property="og:image" content="https://hn.makr.io/og-image.png" />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://hn.makr.io/" />
          <meta property="twitter:title" content="HN Enhanced - A Better Hacker News Experience" />
          <meta property="twitter:description" content="Explore the latest tech news and job opportunities with HN Enhanced - a modern, feature-rich Hacker News client. Stay updated with curated content, easy navigation, and a seamless reading experience." />
          <meta property="twitter:image" content="https://hn.makr.io/og-image.png" />

          {/* Theme Color for mobile browsers */}
          <meta name="theme-color" content="#ff6600" />

          {/* Viewport for responsive design */}
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

          {/* Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;