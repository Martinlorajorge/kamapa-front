import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
        <meta name='description' content='Sistemas de gestión de escuelas' />
        <meta name='keywords' content='KAMAPA, educación, gestor de Escuelas' />
        <meta name='author' content='KAMAPA' />
        {/* Asegúrate de tener una imagen cuadrada de alta resolución para compartir en redes sociales */}
        <meta property='og:title' content='KAMAPA' />
        <meta property='og:description' content='Sistema de Gestión de escuelas' />
        <meta property='og:url' content='KAMAPA' />
        <meta property='og:type' content='webapp' />
        <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
        {/* Otros metadatos y enlaces a CSS */}
      </head>
      {children}
    </html>
  )
}
