 
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <html lang="en" />

          <meta charSet="utf-8" />

          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body className="font-poppins text-primary-white antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
