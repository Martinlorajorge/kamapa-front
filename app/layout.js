import { Navigation } from '../components/Navigation'

export const metadata = {
  title: 'KAMAPA',
  description: 'La solición a tus ideas'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <head>
        <title>KAMAPA</title>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN'
          crossorigin='anonymous'
        />
      </head>
      <body>
        <Navigation />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var script = document.createElement('script');
              script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
              script.crossOrigin = 'anonymous';
              document.body.appendChild(script);
            `
          }}
        />
      </body>
    </html>
  )
}
