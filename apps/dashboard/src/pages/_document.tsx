/* eslint-disable @next/next/no-css-tags */
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <html lang="en" />

          <meta charSet="utf-8" />

          <link
            rel="preload"
            href="/fonts/Poppins-Regular.ttf"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Poppins-Medium.ttf"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Poppins-SemiBold.ttf"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Poppins-Bold.ttf"
            as="font"
            crossOrigin="anonymous"
          />

          <meta
            name="keywords"
            content="Discord, Bot, Discord Bot, Moderation Discord Bot, Music Bot, Music, Moderation"
          />
          <meta property="og:title" content="Quanty - Discord Bot" />
          <meta
            property="og:description"
            content="Serving quality of life discord features with Quanty."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.quanty.xyz" />

          <link rel="icon" href="/quanty-64.png" />
        </Head>
        <body className="font-poppins">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
