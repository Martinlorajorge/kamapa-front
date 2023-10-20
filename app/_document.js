import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html lang='es'>
        <Head>
          <title>KAMAPA</title>
          <link
            href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
            rel='stylesheet'
            integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN'
            crossOrigin='anonymous'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Scripts de React y React Bootstrap */}
          <script src='https://cdn.jsdelivr.net/npm/react@17/umd/react.production.min.js' crossOrigin='anonymous' />
          <script src='https://cdn.jsdelivr.net/npm/react-dom@17/umd/react-dom.production.min.js' crossOrigin='anonymous' />
          <script src='https://cdn.jsdelivr.net/npm/react-bootstrap@2/dist/react-bootstrap.min.js' crossOrigin='anonymous' />
        </body>
      </Html>
    )
  }
}

export default MyDocument
