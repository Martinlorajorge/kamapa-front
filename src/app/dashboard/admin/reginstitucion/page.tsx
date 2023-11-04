'use client'
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormState, useFormStatus } from 'react-dom';

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
    correo: string;
  };
}

const RegInstitucion = () => {
  const [formState, setFormState] = React.useState<FormData>({
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
      correo: '',
    },
  });

  const { status, setStatus } = useFormStatus();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormState((prevFormState) => {
      // Realiza una copia profunda del estado anterior
      const updatedFormState = {
        ...prevFormState,
        institucion: { ...prevFormState.institucion },
        domicilio: { ...prevFormState.domicilio },
        contacto: { ...prevFormState.contacto },
      };

      // Actualiza solo la propiedad específica que ha cambiado
      const propertyPath = name.split('.');
      let currentState: any = updatedFormState;

      for (let i = 0; i < propertyPath.length - 1; i++) {
        currentState = currentState[propertyPath[i]];
      }

      currentState[propertyPath[propertyPath.length - 1]] = value;

      return updatedFormState;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('URL_DEL_ENDPOINT_DE_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        // Operaciones después de un envío exitoso
        setStatus('success');
      } else {
        // Operaciones en caso de error
        setStatus('error');
      }
    } catch (error) {
      // Manejar errores de la solicitud
      console.error('Error al enviar el formulario:', error);
      setStatus('error');
    }
  };

  return (
    <Container className='p-3'>
      <Form onSubmit={handleSubmit}>
        {/* Datos de la institución */}
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

        {/* Datos de domicilio */}
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
                {/* Opciones de provincia llenadas dinámicamente */}
                {/* Agrega opciones de provincias aquí */}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Datos de contacto */}
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
          <Col sm={6}>
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
          </Col>
        </Row>

        {/* Botón de envío */}
        <Button variant='primary' type='submit'>
          Enviar
        </Button>

        {/* Muestra el estado del formulario */}
        {status && <p>Estado del formulario: {status}</p>}
      </Form>
    </Container>
  );
};

export default RegInstitucion;
