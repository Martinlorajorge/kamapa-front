'use client';
import { useSession } from 'next-auth/react';
import Loading from '../components/Loading';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const Dashboard = () => {
	const { data: session, status } = useSession();

	// si el estado de la pag esta cargando muestra el componente Loading
	if (status === 'loading') {
		return <Loading />;
	}

	// traigo los datos del usuario para mostrarlos al hacer click en el boton (por ahora) y ver si trae el tpken y el beaarer esta bien configurado para que haya persistencia en la session
	const getUsuario = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${session?.user?.token}`,
					},
				},
			);
			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.error('Error al obtener datos del usuario:', error);
		}
	};

	return (
		<div className='d-flex justify-content-center align-items-center mt-5'>
			<Card className='text-center'>
				<Card.Header>Panel {session.user?.rol?.name}</Card.Header>
				<Card.Body>
					<Card.Title>
						Bienvenido, {session?.user?.user?.nombre}{' '}
						{session?.user?.user?.apellido}
					</Card.Title>
					<Card.Text>
						<strong>Legajo:</strong> {session?.user?.user?.legajo} <br />
						<strong>Teléfono:</strong> {session?.user?.user?.telefono}
					</Card.Text>

					<Link href={`/dashboard/${session.user?.rol?.name}`}>
						<Button
							variant='flat'
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
							}}>
							Comencemos
						</Button>
					</Link>
				</Card.Body>
				<Card.Footer className='text-muted'>
					{session ? 'Sesión activa' : 'No hay sesión activa'}
				</Card.Footer>
			</Card>
		</div>
	);
};

export default Dashboard;
