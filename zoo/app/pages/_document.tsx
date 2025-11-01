import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {/* Meta tags */}
          <meta name="keywords" content="AI, artificial intelligence, local AI, private AI, language models, ZenLM, NVIDIA, DGX" />
          <meta name="description" content="Zoo AI - Local private AI research platform with desktop app, NVIDIA DGX Sparks integration, and cutting-edge language models" />

          {/* Favicon */}
          <link rel="shortcut icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

          {/* Open Graph */}
          <meta property="og:title" content="Zoo AI - Local Private AI Research Platform" />
          <meta property="og:description" content="Run state-of-the-art AI models locally with complete privacy. Powered by ZenLM models and NVIDIA DGX infrastructure." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://zoolabs.io" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Zoo AI - Local Private AI Research Platform" />
          <meta name="twitter:description" content="Run state-of-the-art AI models locally with complete privacy." />
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