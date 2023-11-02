'use client'
import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Row, Col, Button } from 'react-bootstrap'

const RegInstitucion = () => {
  const [datos, setDatos] = useState({
    institucion: {
      cue: '',
      logo: '',
      nombre: '',
      descripcion: ''
    },
    domicilio: {
      calle: '',
      numero: '',
      barrio: '',
      localidad: '',
      provinciaId: ''
    },
    contacto: {
      contacto: '',
      tipoContactoId: ''
    }
  })

  const [provincias, setProvincias] = useState([])
  const [errores, setErrores] = useState({
    cue: '',
    logo: '',
    nombre: '',
    descripcion: '',
    calle: '',
    numero: '',
    barrio: '',
    localidad: '',
    provinciaId: '',
    contacto: '',
    tipoContactoId: ''
  })
  useEffect(() => {
    // Hacer la solicitud GET a la API de provincias cuando el componente se monte
    fetch('http://localhost:3001/api/provincia')
      .then(response => response.json())
      .then(data => setProvincias(data))
      .catch(error => console.error('Error al cargar provincias:', error))
  }, []) // El segundo argumento del useEffect es un array vacío, lo que significa que se ejecutará solo una vez después del primer renderizado

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatos((prevDatos) => ({
      ...prevDatos,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Realiza la solicitud POST a la API con los datos del formulario
      const response = await fetch('http://localhost:3001/api/institucion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ datos })
      })

      const data = await response.json()

      if (response.status === 201) {
        // Si la creación fue exitosa, reinicia los datos del formulario y muestra una alerta
        setDatos({
          institucion: {
            cue: '',
            logo: '',
            nombre: '',
            descripcion: ''
          },
          domicilio: {
            calle: '',
            numero: '',
            barrio: '',
            localidad: '',
            provinciaId: ''
          },
          contacto: {
            contacto: '',
            tipoContactoId: ''
          }
        })
        alert('Institución creada correctamente')
      } else {
        // Si hay errores en la respuesta, actualiza el estado de errores para mostrarlos al usuario
        setErrores(data.errors)
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* Datos de la institución */}
      <Row>
        <Col sm={6}>
          <FormGroup>
            <Form.Label htmlFor='cue'>CUE</Form.Label>
            <Form.Control
              type='text'
              name='institucion.cue'
              value={datos.institucion.cue}
              onChange={handleChange}
              placeholder='Ingrese el CUE'
              required
            />
            <span style={{ color: 'red' }}>{errores.cue}</span>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Form.Label htmlFor='logo'>Logo</Form.Label>
            <Form.Control
              type='text'
              name='institucion.logo'
              value={datos.institucion.logo}
              onChange={handleChange}
              placeholder='Ingrese la URL del logo'
              required
            />
            <span style={{ color: 'red' }}>{errores.logo}</span>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <Form.Label htmlFor='nombre'>Nombre de la Institución</Form.Label>
            <Form.Control
              type='text'
              name='institucion.nombre'
              value={datos.institucion.nombre}
              onChange={handleChange}
              placeholder='Ingrese el nombre de la institución'
              required
            />
            <span style={{ color: 'red' }}>{errores.nombre}</span>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Form.Label htmlFor='descripcion'>Descripción</Form.Label>
            <Form.Control
              type='text'
              name='institucion.descripcion'
              value={datos.institucion.descripcion}
              onChange={handleChange}
              placeholder='Ingrese una descripción de la institución'
              required
            />
            <span style={{ color: 'red' }}>{errores.descripcion}</span>
          </FormGroup>
        </Col>
      </Row>

      {/* Datos de domicilio */}
      <Row>
        <Col sm={6}>
          <FormGroup>
            <Form.Label htmlFor='calle'>Calle</Form.Label>
            <Form.Control
              type='text'
              name='domicilio.calle'
              value={datos.domicilio.calle}
              onChange={handleChange}
              placeholder='Ingrese la calle'
              required
            />
            <span style={{ color: 'red' }}>{errores.calle}</span>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Form.Label htmlFor='numero'>Número del domicilio</Form.Label>
            <Form.Control
              type='text'
              name='domicilio.numero'
              value={datos.domicilio.numero}
              onChange={handleChange}
              placeholder='Ingrese el número'
              required
            />
            <span style={{ color: 'red' }}>{errores.numero}</span>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <Form.Label htmlFor='barrio'>Barrio</Form.Label>
            <Form.Control
              type='text'
              name='domicilio.barrio'
              value={datos.domicilio.barrio}
              onChange={handleChange}
              placeholder='Ingrese el barrio'
              required
            />
            <span style={{ color: 'red' }}>{errores.barrio}</span>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Form.Label htmlFor='localidad'>Localidad</Form.Label>
            <Form.Control
              type='text'
              name='domicilio.localidad'
              value={datos.domicilio.localidad}
              onChange={handleChange}
              placeholder='Ingrese la localidad'
              required
            />
            <span style={{ color: 'red' }}>{errores.localidad}</span>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <Form.Label htmlFor='provinciaId'>Provincia</Form.Label>
            <Form.Control
              as='select'
              name='domicilio.provinciaId'
              value={datos.domicilio.provinciaId}
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
            <span style={{ color: 'red' }}>{errores.provinciaId}</span>
          </FormGroup>
        </Col>
      </Row>

      {/* Datos de contacto */}
      <Row>
        <Col sm={6}>
          <FormGroup>
            <Form.Label htmlFor='contacto'>Contacto</Form.Label>
            <Form.Control
              type='text'
              name='contacto.contacto'
              value={datos.contacto.contacto}
              onChange={handleChange}
              placeholder='Ingrese el contacto'
              required
            />
            <span style={{ color: 'red' }}>{errores.contacto}</span>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Form.Label htmlFor='tipoContactoId'>ID de Tipo de Contacto</Form.Label>
            <Form.Control
              type='text'
              name='contacto.tipoContactoId'
              value={datos.contacto.tipoContactoId}
              onChange={handleChange}
              placeholder='Ingrese el ID de Tipo de Contacto'
              required
            />
            <span style={{ color: 'red' }}>{errores.tipoContactoId}</span>
          </FormGroup>
        </Col>
      </Row>
      <br />
      <Row>
        <Col className='text-center' sm={12}>
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
          <Button variant='flat' size='xxl' type='submit'>Crear Institución</Button>
        </Col>
      </Row>

    </Form>
  )
}

export default RegInstitucion
