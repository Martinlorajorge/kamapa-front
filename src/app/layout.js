import React, { Suspense } from 'react'
import AuthContextProvider from '../contexts/authContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Loading from './components/Loading' // Importa el componente de carga

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
        <Suspense fallback={<Loading />}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </Suspense>
      </body>
    </html>
  )
}
