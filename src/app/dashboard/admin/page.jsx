'use client';
import React from 'react';
import {
	Container,
	Card,
	Button,
	CardBody,
	CardTitle,
	CardSubtitle,
} from 'react-bootstrap';
import Link from 'next/link';

export default function AdminPage() {
	return (
		<Container>
			<h1 style={{ margin: '2rem 0 1rem 0', textAlign: 'center' }}>
				Panel Admin
			</h1>

			<div className='row'>
				<div className='col-md-3'>
					<Card style={{ backgroundColor: '#b96a8c' }}>
						<CardBody>
							<CardTitle style={{ textAlign: 'center' }}>Usuarios</CardTitle>
							<CardSubtitle>
								Gestiona a los usuarios de tu aplicación
							</CardSubtitle>
							{/* Utiliza el componente Link para los enlaces */}
							<Link href='/dashboard/admin/vistausuarios'>
								<Button
									variant='primary'
									style={{ width: '100%' }}>
									Ir
								</Button>
							</Link>
						</CardBody>
					</Card>
				</div>
				<div className='col-md-3'>
					<Card style={{ backgroundColor: '#a99aff' }}>
						<CardBody>
							<CardTitle style={{ textAlign: 'center' }}>Institución</CardTitle>
							<CardSubtitle>Administra las Instituciones Registradas</CardSubtitle>
							{/* Utiliza el componente Link para los enlaces */}
							<Link href='/dashboard/admin/vistainstitucion'>
								<Button
									variant='primary'
									style={{ width: '100%' }}>
									Ir
								</Button>
							</Link>
						</CardBody>
					</Card>
				</div>
				<div className='col-md-3'>
					<Card style={{ backgroundColor: '#9f8cf6' }}>
						<CardBody>
							<CardTitle style={{ textAlign: 'center' }}>Roles</CardTitle>
							<CardSubtitle>Asignacion de vistas Segun el Rol</CardSubtitle>
							{/* Utiliza el componente Link para los enlaces */}
							<Link href='/admin/roles'>
								<Button
									variant='primary'
									style={{ width: '100%' }}>
									Ir
								</Button>
							</Link>
						</CardBody>
					</Card>
				</div>
				<div className='col-md-3'>
					<Card style={{ backgroundColor: '#8f7cf3' }}>
						<CardBody>
							<CardTitle style={{ textAlign: 'center' }}>Reportes</CardTitle>
							<CardSubtitle>Estadísticas de Usuarios & Instituciones Registrados</CardSubtitle>
							{/* Utiliza el componente Link para los enlaces */}
							<Link href='/admin/reports'>
								<Button
									variant='primary'
									style={{ width: '100%' }}>
									Ir
								</Button>
							</Link>
						</CardBody>
					</Card>
				</div>
			</div>
		</Container>
	);
}
