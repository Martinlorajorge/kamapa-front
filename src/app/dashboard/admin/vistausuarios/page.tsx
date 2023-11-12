'use client';
import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import Link from 'next/link';

const VistaEmpleadosPage = () => {
	const [empleados, setEmpleados] = useState([]);

	// console.log(empleados);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/empleado`,
				);

				if (!response.ok) {
					throw new Error(`Error ${response.status}: ${response.statusText}`);
				}

				const data = await response.json();
				setEmpleados(data.empleados);
				console.log(data);
			} catch (error) {
				console.error('Error al obtener empleados:', error.message);
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
					Registrar Empleado
				</Button>
			</Link>

			<Table
				striped
				bordered
				hover>
				<thead>
					<tr>
						<th>Legajo</th>
						<th>Nombre</th>
						<th>Telefono</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(empleados) && empleados.length > 0 ? (
						empleados.map((empleado) => (
							<tr key={empleado.id}>
								{/* Accede a las propiedades del objeto empleado de acuerdo a la estructura */}
								<td>{empleado.UsuarioEmpleado.legajo}</td>
								<td>
									{empleado.UsuarioEmpleado &&
										`${empleado.UsuarioEmpleado.nombre}, ${empleado.UsuarioEmpleado.apellido}`}
								</td>
								<td>
									{empleado.UsuarioEmpleado &&
										empleado.UsuarioEmpleado.telefono}
								</td>
								<td>
									<Button
										variant='link'
										onClick={() => handleConsultar(empleado.id)}
										title='Consultar Empleado'>
										<BsEye />
									</Button>
									<Button
										variant='link'
										onClick={() => handleModificar(empleado.id)}
										title='Modificar Empleado'>
										<BsPencil />
									</Button>
									<Button
										variant='link'
										onClick={() => handleEliminar(empleado.id)}
										title='Eliminar Empleado'>
										<BsTrash />
									</Button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan='4'>No hay empleados disponibles</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default VistaEmpleadosPage;

<td>
	<Button
		variant='link'
		onClick={() => handleConsultar(empleado.id)}
		title='Consultar Empleado'>
		<BsEye />
	</Button>
	<Button
		variant='link'
		onClick={() => handleModificar(empleado.id)}
		title='Modificar Empleado'>
		<BsPencil />
	</Button>
	<Button
		variant='link'
		onClick={() => handleEliminar(empleado.id)}
		title='Eliminar Empleado'>
		<BsTrash />
	</Button>
</td>;
