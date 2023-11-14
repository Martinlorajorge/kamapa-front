'use client';
import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import Link from 'next/link';

const VistaInstitucionPage = () => {
	const [instituciones, setInstitucion] = useState([]);

	// console.log(institucion);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/institucion`,
				);

				if (!response.ok) {
					throw new Error(`Error ${response.status}: ${response.statusText}`);
				}

				const data = await response.json();
				setInstitucion(data.institucion);
				console.log(data);
			} catch (error) {
				console.error('Error al obtener institucion:', error.message);
			}
		};

		fetchData();
	}, []);

	const handleConsultar = (id) => {
		// 	// Lógica para manejar la acción de consultar
		console.log(`Consultar empleado con ID ${id}`);
	};

	const handleModificar = (id) => {
		// 	// Lógica para manejar la acción de modificar
		console.log(`Modificar empleado con ID ${id}`);
	};

	const handleEliminar = (id) => {
		// Lógica para manejar la acción de eliminar
		console.log(`Eliminar empleado con ID ${id}`);
	};

	return (
		<div className='p-3'>
			<Link href='/dashboard/admin/vistausuarios/regempleado'>
				<Button
					variant='flat'
					style={{
						backgroundColor: 'purple',
						color: 'white',
						padding: '0.4rem 1rem',
						fontSize: '1rem',
						marginBottom: '1rem',
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
					Registrar Institucion
				</Button>
			</Link>

			<Table
				striped
				bordered
				hover>
				<thead>
					<tr>
						<th>CUE</th>
						<th>Logo</th>
						<th>Nombre</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(instituciones) && instituciones.length > 0 ? (
						instituciones.map((institucion) => (
							<tr key={institucion.id}>
								{/* Accede a las propiedades del objeto institucion de acuerdo a la estructura */}
								<td>{institucion.cue}</td>
								<td>
									{institucion &&
										`${institucion.nombre}`}
								</td>
								<td>
									{institucion &&
										institucion.logo}
								</td>
								<td>
									<Button
										variant='link'
										onClick={() => handleConsultar(institucion.id)}
										title='Consultar Institucion'>
										<BsEye />
									</Button>
									<Button
										variant='link'
										onClick={() => handleModificar(institucion.id)}
										title='Modificar Institucion'>
										<BsPencil />
									</Button>
									<Button
										variant='link'
										onClick={() => handleEliminar(institucion.id)}
										title='Eliminar Institucion'>
										<BsTrash />
									</Button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan='4'>No hay instituciones disponibles</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default VistaInstitucionPage;

<td>
	<Button
		variant='link'
		onClick={() => handleConsultar(empleado.id)}
		title='Consultar Institucion'>
		<BsEye />
	</Button>
	<Button
		variant='link'
		onClick={() => handleModificar(empleado.id)}
		title='Modificar Institucion'>
		<BsPencil />
	</Button>
	<Button
		variant='link'
		onClick={() => handleEliminar(empleado.id)}
		title='Eliminar Institucion'>
		<BsTrash />
	</Button>
</td>;
