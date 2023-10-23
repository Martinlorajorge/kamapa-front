'use client'
import React from 'react'

const Loading = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.5)'
    }}
    >
      <div style={{
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <img src="./Loading KAMAPA.gif" alt="Loading..." style={{
          maxWidth: '90%', // Establece el valor máximo del ancho de la imagen
          maxHeight: '90%', // Establece el valor máximo de la altura de la imagen
          objectFit: 'cover' // Hace que la imagen se ajuste completamente al contenedor
        }}
        />
      </div>
    </div>
  )
}

export default Loading;