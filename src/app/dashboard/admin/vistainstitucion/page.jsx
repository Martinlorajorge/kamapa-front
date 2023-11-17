'use client';
import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import Link from 'next/link';
import Modal2 from '../../../components/Modal';
import { ModalType } from '../../../../utils/const';

const VistaInstitucionPage = () => {
const [instituciones, setInstitucion] = useState([]);
const [activo, setActivo] = useState(false);
const [confirmar, setConfirmar] = useState(false);
const [type, setType] = useState('');

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
				setInstitucion(data);
				console.log(data);
			} catch (error) {
				console.error('Error al obtener institucion:', error.message);
			}
		};

		fetchData();
	}, []);

	const handleConsultar = (id) => {
		// 	// Lógica para manejar la acción de consultar
		console.log(`Consultar institucion con ID ${id}`);
	};

	const handleModificar = (id) => {
		// 	// Lógica para manejar la acción de modificar
		console.log(`Modificar institucion con ID ${id}`);
		setActivo(true);
		setType(ModalType.Edit);
	};

	const handleEliminar = (id) => {
		// Lógica para manejar la acción de eliminar
		setActivo(true);
		setType(ModalType.Delete);
	};

	return (
		<div className='p-3'>
			<Link href='/dashboard/admin/vistainstitucion/reginstitucion'>
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
						<th>Logo</th>
						<th>CUE</th>
						<th>Nombre</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(instituciones) && instituciones.length > 0 ? (
						instituciones.map((institucion) => (
							<tr key={institucion.id}>
								{/* Accede a las propiedades del objeto institucion de acuerdo a la estructura */}
								<td><img src={institucion.logo} alt="" style={{width:'50px'}}/></td>
								<td>
									   {institucion &&
										`${institucion.cue}`}
								</td>
								<td>
									{institucion &&
										institucion.nombre}
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
    		{type && <Modal2 type={type} isActive={activo} />}

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
