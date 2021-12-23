// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />

          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <meta
            name="keywords"
            content="Discord, Bot, Discord Bot, Moderation Discord Bot, Music Bot, Music, Moderation"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="og:title"
            property="og:title"
            content="Best Discord Bot"
          />
          <meta name="og:type" property="og:type" content="website" />
          <meta
            name="og:url"
            property="og:url"
            content="https://www.quanty.gg"
          />

          <link rel="icon" href="/quantyIcon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
