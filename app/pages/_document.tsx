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
          <meta name="keywords" content="Zoo Labs, exotic animals, AI agents, NFT, marketplace, decentralized science, DeSci, ZenLM, conservation" />

          {/* Favicon */}
          <link rel="shortcut icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

          {/* Open Graph */}
          <meta property="og:title" content="Zoo Labs - Exotic Animals x AI Agents" />
          <meta property="og:description" content="Collect, hatch, breed, and trade exotic animal AI agents. NFT marketplace powered by decentralized science." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://zoolabs.io" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Zoo Labs - Exotic Animals x AI Agents" />
          <meta name="twitter:description" content="Collect, hatch, breed, and trade exotic animal AI agents." />
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
