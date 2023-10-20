import React from 'react'
import { Navigation } from '../components/Navigation'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <head>
        <title>KAMAPA</title>
        {/* Enlace a Bootstrap */}
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN'
          crossOrigin='anonymous'
        />
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
