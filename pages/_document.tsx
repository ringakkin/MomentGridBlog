import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO 和社交 meta 标签 */}
        <meta name="description" content="Noah Buscher is a web developer and designer based in Denver, CO." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Noah Buscher" />
        <meta property="og:site_name" content="Noah Buscher" />
        <meta property="og:description" content="Noah Buscher is a web developer and designer based in Denver, CO." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en-US" />
        <meta name="twitter:title" content="Noah Buscher" />
        <meta name="twitter:description" content="Noah Buscher is a web developer and designer based in Denver, CO." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="https://noahbuscher.com/social-image.jpg" />
        <meta name="twitter:image" content="https://noahbuscher.com/social-image.jpg" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="alternate" type="application/atom+xml" title="noahbuscher.com" href="https://noahbuscher.com/feed.xml" />
        {/* 移除旧的 Inter 字体，统一使用 Typekit */}
      </Head>
      <body style={{ fontFamily: "aktiv-grotesk, ui-sans-serif, system-ui, sans-serif", backgroundColor: "#FFFFFF" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
