'use client'
import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import Link from 'next/link';
function DarkVariantExample() {
  return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-evenly', zIndex:'-1'}}>
      <Image
        src="/backLogin.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
      />
      <Carousel data-bs-theme="dark" style={{backgroundColor:'transparent', width:'50vw', height:'50vh'}}>
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
    <style type='text/css'>
            {`
                .btn-flat {
                  background-color: purple;
                  color: white;
                }

                .btn-xxl {
                  padding: 0.4rem 1rem;
                  font-size: 1rem;
                }
              `}
          </style>
    <Link variant='flat' size='xxl' className='btn-flat' href='/Login' type='text'> Comencemos </Link>
    </div>
  );
}

export default DarkVariantExample;
