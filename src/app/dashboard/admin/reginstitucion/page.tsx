'use client'
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormStatus } from 'react-dom';


interface Provincia {
  id: number;
  nombre: string;
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
    provinciaId: number;
  };
  contacto: {
    contacto: string;
    correo: string;
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
      provinciaId: 0,
    },
    contacto: {
      contacto: '',
      correo: '',
    },
  });

  const [provincias, setProvincias] = useState([]); // Estado para almacenar las provincias obtenidas de la API
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

  // Efecto para obtener las provincias al cargar el componente
  useEffect(() => {
    // Función para obtener las provincias desde la API
    const fetchProvincias = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/provincia');
        if (response.ok) {
          const data = await response.json();
          setProvincias(data); // Almacena las provincias en el estado local
          // console.log(data)
        } else {
          console.error('Error al cargar las provincias');
        }
      } catch (error) {
        console.error('Error al cargar las provincias:', error);
      }
    };

    // Llama a la función para obtener las provincias cuando el componente se monta
    fetchProvincias();
  }, []); // El segundo argumento [] asegura que este efecto se ejecute solo una vez después del montaje inicial

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/institucion', {
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
                value={formState.domicilio.provincia}
                onChange={handleChange}
                required
              >
                <option value=''>Selecciona una provincia</option>
                {provincias.map((provincia) => (
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
        <Button
          variant='flat'
          size='xxl'
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
        {status && <p>Estado del formulario: {status}</p>}
      </Form>
    </Container>
  );
};

export default RegInstitucionPage;
