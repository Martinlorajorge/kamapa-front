// Importa los componentes necesarios
'use client'
import React, { useState } from 'react'
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Row,
  Col,
  Container
} from 'react-bootstrap'

import SuccessMessage from '../../../components/SuccessMessage'

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
      contacto: ''
    }
  })

  const [errores, setErrores] = useState({
    cue: '',
    logo: '',
    nombre: '',
    descripcion: '',
    calle: '',
    numero: '',
    contacto: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const [section, field] = name.split('.')
    setDatos((prevDatos) => ({
      ...prevDatos,
      [section]: {
        ...prevDatos[section],
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3001/api/institucion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      })

      const data = await response.json()

      if (response.status === 201) {
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
            provinciaIdId: ''
          },
          contacto: {
            contacto: ''
          }
        })
        const message = <SuccessMessage message='Institución creada correctamente' />
        document.body.appendChild(message)
      } else {
        setErrores(data.errors)
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6}>
            <FormGroup>
              <label htmlFor='institucion.cue'>CUE</label>
              <FormControl
                type='text'
                name='institucion.cue'
                value={datos.institucion.cue}
                onChange={handleChange}
                placeholder='Ingrese el CUE'
              />
              <span style={{ color: 'red' }}>{errores.cue}</span>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup>
              <label htmlFor='institucion.logo'>Logo</label>
              <FormControl
                type='text'
                name='institucion.logo'
                value={datos.institucion.logo}
                onChange={handleChange}
                placeholder='Ingrese la URL del logo'
              />
              <span style={{ color: 'red' }}>{errores.logo}</span>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <FormGroup>
              <label htmlFor='institucion.nombre'>Nombre</label>
              <FormControl
                type='text'
                name='institucion.nombre'
                value={datos.institucion.nombre}
                onChange={handleChange}
                placeholder='Ingrese el nombre de la institución'
              />
              <span style={{ color: 'red' }}>{errores.nombre}</span>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup>
              <label htmlFor='institucion.descripcion'>Descripción</label>
              <FormControl
                type='text'
                name='institucion.descripcion'
                value={datos.institucion.descripcion}
                onChange={handleChange}
                placeholder='Ingrese una descripción de la institución'
              />
              <span style={{ color: 'red' }}>{errores.descripcion}</span>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <FormGroup>
              <label htmlFor='domicilio.calle'>Calle</label>
              <FormControl
                type='text'
                name='domicilio.calle'
                value={datos.domicilio.calle}
                onChange={handleChange}
                placeholder='Ingrese la calle'
              />
              <span style={{ color: 'red' }}>{errores.calle}</span>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup>
              <label htmlFor='domicilio.numero'>Número</label>
              <FormControl
                type='text'
                name='domicilio.numero'
                value={datos.domicilio.numero}
                onChange={handleChange}
                placeholder='Ingrese el número'
              />
              <span style={{ color: 'red' }}>{errores.numero}</span>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <FormGroup>
              <label htmlFor='contacto.contacto'>Contacto</label>
              <FormControl
                type='text'
                name='contacto.contacto'
                value={datos.contacto.contacto}
                onChange={handleChange}
                placeholder='Ingrese el contacto'
              />
              <span style={{ color: 'red' }}>{errores.contacto}</span>
            </FormGroup>
          </Col>
        </Row>
        <br />
        <Row>
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
        </Row>
      </Form>
    </Container>
  )
}

export default RegInstitucion
