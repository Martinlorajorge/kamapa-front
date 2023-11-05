'use client'
import { Container } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import Image from 'next/image'
import Link from 'next/link'
function DarkVariantExample () {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
      <Image
        src='/backLogin.jpg'
        alt='Background'
        layout='fill'
        objectFit='cover'
      />
      <Carousel data-bs-theme='dark' style={{ backgroundColor: 'transparent', width: '50vw', height: '50vh' }}>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='/bienvenida2.png'
            alt='First slide'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='/bienvenida2.png'
            alt='Second slide'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='/bienvenida2.png'
            alt='Third slide'
          />
        </Carousel.Item>
      </Carousel>

      <Link href='/login' style={{ borderRadius: '10px', backgroundColor: 'purple', color: 'white', padding: '0.2rem 0.8rem', fontSize: '1rem', zIndex: '100' }}>
        <Button
          type='submit'
          style={{ backgroundColor: 'purple', borderColor: 'purple' }}
        >
          Comenzar
        </Button>
      </Link>

    </div>
  )
}

export default DarkVariantExample
