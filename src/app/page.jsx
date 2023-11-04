'use client'
import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
function DarkVariantExample() {
  return (
    <div style={{ width:'100vw', height:'100vh',alignContent:'center'}}>
      <Image
        src="/backLogin.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
      />
      <Carousel data-bs-theme="dark" style={{backgroundColor:'orange', width:'50vw', height:'50vh'}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/bienvenida2.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/bienvenida2.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/bienvenida2.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    <Button type="submit" variant='flat' size='lg' className='btn-flat' href="#"
    style={{backgroundColor:'purple', color:'white', padding:'0.4rem 1rem', fontSize:'1rem'}}>
       Comenzar
    </Button>
    </div>
  );
}

export default DarkVariantExample;
