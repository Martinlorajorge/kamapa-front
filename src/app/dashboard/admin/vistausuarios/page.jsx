'use client';
import { Button, Table } from 'react-bootstrap';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import Link from 'next/link';

const VistaUsuariosPage = () => {
	// Supongamos que tienes una lista de usuarios llamada 'usuarios'
	const usuarios = [
		{ id: 1, nombre: 'Usuario 1', correo: 'usuario1@example.com' },
		{ id: 2, nombre: 'Usuario 2', correo: 'usuario2@example.com' },
		// ... otros usuarios
	];

	return (
		<div className='p-3'>
			{/* Botón para registrar nuevo usuario */}
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

			{/* Tabla de usuarios */}
			<Table
				striped
				bordered
				hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Correo</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{usuarios.map((usuario) => (
						<tr key={usuario.id}>
							<td>{usuario.id}</td>
							<td>{usuario.nombre}</td>
							<td>{usuario.correo}</td>
							<td>
								{/* Botones de acciones */}
								<Button
									variant='link'
									onClick={() => handleConsultar(usuario.id)}
									title='Consultar Usuario'>
									<BsEye />
								</Button>
								<Button
									variant='link'
									onClick={() => handleModificar(usuario.id)}
									title='Modificar Usuario'>
									<BsPencil />
								</Button>
								<Button
									variant='link'
									onClick={() => handleEliminar(usuario.id)}
									title='Eliminar Usuario'>
									<BsTrash />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default VistaUsuariosPage;
