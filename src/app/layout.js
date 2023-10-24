'use client'
import React, { Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Loading from './components/Loading' // Importa el componente de carga
import SessionAuthProvider from '../../contexts/SessionAuthProvider'

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
        <main className='container mx-0'>
          <SessionAuthProvider>
            <Suspense fallback={<Loading />}>
            {children}
            </Suspense>
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  )
}
