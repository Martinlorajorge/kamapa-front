'use client'
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import useFormStatus from './../../../../components/useFormStatus';

interface Provincia {
  id: number;
  provincia: string;
}

interface FormData {
  institucion: {
    cue: string;
    logo: string;
    nombre: string;
    descripcion: string;
  };
  domicilio: {
    calle: string;
    numero: string;
    barrio: string;
    localidad: string;
    provinciaId: string;
  };
  contacto: {
    contacto: string;
    // correo: string;
  };
}

const RegInstitucionPage = () => {
  const [formState, setFormState] = useState<FormData>({
    institucion: {
      cue: '',
      logo: '',
      nombre: '',
      descripcion: '',
    },
    domicilio: {
      calle: '',
      numero: '',
      barrio: '',
      localidad: '',
      provinciaId: '',
    },
    contacto: {
      contacto: '',
      // correo: '',
    },
  });

  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const { status, setStatus, resetStatus } = useFormStatus();

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => {
      const updatedFormState = {
        ...prevFormState,
        institucion: { ...prevFormState.institucion },
        domicilio: { ...prevFormState.domicilio },
        contacto: { ...prevFormState.contacto },
      };

      const propertyPath = name.split('.');
      let currentState: any = updatedFormState;

      for (let i = 0; i < propertyPath.length - 1; i++) {
        currentState = currentState[propertyPath[i]];
      }

      currentState[propertyPath[propertyPath.length - 1]] = value;
      return updatedFormState;
    });
  };

  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provincia`);
        if (response.ok) {
          const data = await response.json();
          setProvincias(data);
        } else {
          console.error('Error al cargar las provincias');
        }
      } catch (error) {
        console.error('Error al cargar las provincias:', error);
      }
    };

    fetchProvincias();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/institucion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          datos: {
            institucion: formState.institucion,
            domicilio: formState.domicilio,
            contacto: formState.contacto,
          },
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setStatus('error');
    }
  };

  return (
    <Container className='p-3'>
      <Form onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Col sm={6}>
            <Form.Group controlId='cue'>
              <Form.Label>CUE</Form.Label>
              <Form.Control
                type='text'
                name='institucion.cue'
                value={formState.institucion.cue}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId='logo'>
              <Form.Label>Logo</Form.Label>
              <Form.Control
                type='text'
                name='institucion.logo'
                value={formState.institucion.logo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col sm={6}>
            <Form.Group controlId='nombre'>
              <Form.Label>Nombre de la Institución</Form.Label>
              <Form.Control
                type='text'
                name='institucion.nombre'
                value={formState.institucion.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId='descripcion'>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type='text'
                name='institucion.descripcion'
                value={formState.institucion.descripcion}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col sm={6}>
            <Form.Group controlId='calle'>
              <Form.Label>Calle</Form.Label>
              <Form.Control
                type='text'
                name='domicilio.calle'
                value={formState.domicilio.calle}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId='numero'>
              <Form.Label>Número del domicilio</Form.Label>
              <Form.Control
                type='text'
                name='domicilio.numero'
                value={formState.domicilio.numero}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col sm={6}>
            <Form.Group controlId='barrio'>
              <Form.Label>Barrio</Form.Label>
              <Form.Control
                type='text'
                name='domicilio.barrio'
                value={formState.domicilio.barrio}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId='localidad'>
              <Form.Label>Localidad</Form.Label>
              <Form.Control
                type='text'
                name='domicilio.localidad'
                value={formState.domicilio.localidad}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col sm={6}>
            <Form.Group controlId='provinciaId'>
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                as='select'
                name='domicilio.provinciaId'
                value={formState.domicilio.provinciaId}
                onChange={handleChange}
                required
              >
                <option value=''>Selecciona una provincia</option>
                {Array.isArray(provincias) &&
                    provincias.map((provincia) => (
                    <option key={provincia.id} value={provincia.id}>
                      {provincia.provincia}
                    </option>
                ))}

              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col sm={6}>
            <Form.Group controlId='contacto'>
              <Form.Label>Contacto</Form.Label>
              <Form.Control
                type='text'
                name='contacto.contacto'
                value={formState.contacto.contacto}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          {/* <Col sm={6}>
            <Form.Group controlId='correo'>
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type='email'
                name='contacto.correo'
                value={formState.contacto.correo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col> */}
        </Row>
        <Button
          variant='flat'
          // size='xxl'
          type='submit'
          style={{
            backgroundColor: 'purple',
            color: 'white',
            padding: '0.4rem 1rem',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'black';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'purple';
            e.currentTarget.style.color = 'white';
          }}
        >
          Registrar Institución
        </Button>


        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Institución registrada con éxito</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant='primary' onClick={() => setShowModal(false)}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>


        {status && <p>Estado del formulario: {status}</p>}
        


      </Form>
    </Container>
  );
};

export default RegInstitucionPage;
