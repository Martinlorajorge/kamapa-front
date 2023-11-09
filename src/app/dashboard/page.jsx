'use client'
import { useSession } from 'next-auth/react'
import Loading from '../components/Loading'
import { Card, Button } from 'react-bootstrap'

const Dashboard = () => {
  const { data: session, status } = useSession()

  // si el estado de la pag esta cargando muestra el componente Loading
  if (status === 'loading') {
    return (
      <Loading />
    )
  }

  // traigo los datos del usuario para mostrarlos al hacer click en el boton (por ahora) y ver si trae el tpken y el beaarer esta bien configurado para que haya persistencia en la session
  const getUsuario = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.token}`
        }
      })
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error)
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
      <Card className='text-center'>
        <Card.Header>Dashboard</Card.Header>
        <Card.Body>
          <Card.Title>Bienvenido, {session?.user?.user?.user?.nombre}</Card.Title>
          <Card.Text>
            Aquí puedes ver información relevante para el usuario.
          </Card.Text>
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
          <Button
            variant='flat'
            size='xxl'
            className='btn-flat'
            onClick={getUsuario}
          >
            Comencemos
          </Button>
        </Card.Body>
        <Card.Footer className='text-muted'>
          {session ? 'Sesión activa' : 'No hay sesión activa'}
        </Card.Footer>
      </Card>
    </div>

  )
}

export default Dashboard
