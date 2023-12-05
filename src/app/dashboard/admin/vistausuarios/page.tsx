'use client';
import { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import Link from 'next/link';

const VistaEmpleadosPage = () => {
	const [empleados, setEmpleados] = useState([]);
	const [selectedEmpleado, setSelectedEmpleado] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);

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

	const handleConsultar = (empleado) => {
		setSelectedEmpleado(empleado);
		setShowModal(true);
	};

	const handleEliminar = (empleado) => {
		setSelectedEmpleado(empleado);
		setShowConfirmModal(true); // Muestra el modal de confirmación
	};

	const handleConfirmDelete = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/empleado/${selectedEmpleado}`,
				{
					method: 'DELETE',
				},
			);
			console.log(selectedEmpleado);
			if (!response.ok) {
				const errorData = await response.json();
				console.log('Error status:', response.status);
				console.log('Error data:', errorData);
				throw new Error('Error en la eliminación');
			}

			setEmpleados(empleados.filter((emp) => emp.id !== selectedEmpleado));
			setShowConfirmModal(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleModificar = (empleado) => {
		setSelectedEmpleado(empleado);
		setShowEditModal(true);
	};

	const handleSave = () => {
		// Muestra el modal de confirmación de guardado en lugar de guardar directamente
		setShowSaveConfirmModal(true);
	};

	const handleConfirmSave = async () => {
		try {
			// Obtén los valores de los campos del formulario
			const legajo = (document.getElementById('formLegajo') as HTMLInputElement)
				.value;
			const nombre = (document.getElementById('formNombre') as HTMLInputElement)
				.value;
			const apellido = (
				document.getElementById('formApellido') as HTMLInputElement
			).value;
			// Agrega más campos según sea necesario


			// console.log(selectedEmpleado)
			// Crea el objeto empleado actualizado

			
			const updatedEmpleado = {
				...selectedEmpleado,
				usuario: {
					usuarioId : selectedEmpleado.id,
					legajo: legajo,
					nombre: nombre,
					apellido: apellido,
					// Agrega más campos según sea necesario
				},
			};

			console.log(updatedEmpleado);
			// Realiza la solicitud PUT a la API
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/empleado/${selectedEmpleado.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json', // Asegúrate de que el servidor sepa que estás enviando JSON
					},
					body: JSON.stringify(updatedEmpleado),
				},
			)
			
			// Actualiza el estado de los empleados
			const data = await response.json();
			console.log(data);

			if (!response.ok) {
				const errorData = await response.json();
				console.log('Error status:', response.status);
				console.log('Error data:', errorData);
				throw new Error('Error en la modificación');
			}

			setEmpleados((prevEmpleados) =>
				prevEmpleados.map((empleado) =>
					empleado.id === updatedEmpleado ? data : empleado,
				),
			);

			// Cierra el modal
			setShowEditModal(false);
			setShowSaveConfirmModal(false);
		} catch (error) {
			console.error('Error al actualizar empleado:', error.message);
		}
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
								<td>{empleado?.UsuarioEmpleado?.legajo}</td>
								<td>
									{empleado.UsuarioEmpleado &&
										`${empleado?.UsuarioEmpleado?.nombre}, ${empleado?.UsuarioEmpleado?.apellido}`}
								</td>
								<td>
									{empleado.UsuarioEmpleado &&
										empleado?.UsuarioEmpleado?.telefono}
								</td>
								<td>
									<Button
										variant='link'
										onClick={() => handleConsultar(empleado)}
										title='Consultar Empleado'>
										<BsEye />
									</Button>
									<Button
										variant='link'
										onClick={() => handleModificar(empleado)}
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

			<Modal
				show={showModal}
				onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Detalles del Empleado</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedEmpleado && (
						<>
							<p>Legajo: {selectedEmpleado?.UsuarioEmpleado?.legajo}</p>
							<p>
								Fecha de ingreso:{' '}
								{new Date(
									selectedEmpleado?.UsuarioEmpleado?.fecha_ingreso,
								).toLocaleDateString()}
							</p>
							<p>
								Fecha de egreso:{' '}
								{selectedEmpleado?.UsuarioEmpleado?.fecha_egreso
									? new Date(
											selectedEmpleado?.UsuarioEmpleado?.fecha_egreso,
									  ).toLocaleDateString()
									: 'N/A'}
							</p>
							<p>Nombre: {selectedEmpleado?.UsuarioEmpleado?.nombre}</p>
							<p>Apellido: {selectedEmpleado?.UsuarioEmpleado?.apellido}</p>
							<p>DNI: {selectedEmpleado?.UsuarioEmpleado?.dni}</p>
							<p>CUIL: {selectedEmpleado?.UsuarioEmpleado?.cuil}</p>
							<p>
								Fecha de nacimiento:{' '}
								{new Date(
									selectedEmpleado?.UsuarioEmpleado?.fechaNacimiento,
								).toLocaleDateString()}
							</p>
							<p>Teléfono: {selectedEmpleado?.UsuarioEmpleado?.telefono}</p>
							<p>
								Estado:{' '}
								{selectedEmpleado?.UsuarioEmpleado?.is_active
									? 'Activo'
									: 'Inactivo'}
							</p>
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={() => setShowModal(false)}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				show={showEditModal}
				onHide={() => setShowEditModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Editar Empleado</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedEmpleado && (
						<Form>
							<Form.Group controlId='formLegajo'>
								<Form.Label>Legajo</Form.Label>
								<Form.Control
									type='text'
									defaultValue={selectedEmpleado?.UsuarioEmpleado?.legajo}
								/>
							</Form.Group>
							<Form.Group controlId='formNombre'>
								<Form.Label>Nombre</Form.Label>
								<Form.Control
									type='text'
									defaultValue={selectedEmpleado?.UsuarioEmpleado?.nombre}
								/>
							</Form.Group>
							<Form.Group controlId='formApellido'>
								<Form.Label>Apellido</Form.Label>
								<Form.Control
									type='text'
									defaultValue={selectedEmpleado?.UsuarioEmpleado?.apellido}
								/>
							</Form.Group>
							{/* Agrega más campos de formulario según sea necesario */}
						</Form>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={() => setShowEditModal(false)}>
						Cancelar
					</Button>
					<Button
						variant='primary'
						onClick={handleSave}>
						Guardar
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				show={showSaveConfirmModal}
				onHide={() => setShowSaveConfirmModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Confirmar cambios</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					¿Estás seguro de que quieres guardar los cambios?
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={() => setShowSaveConfirmModal(false)}>
						Cancelar
					</Button>
					<Button
						variant='primary'
						onClick={handleConfirmSave}>
						Confirmar
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				show={showConfirmModal}
				onHide={() => setShowConfirmModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Confirmar eliminación</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					¿Estás seguro de que quieres eliminar a este empleado?
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={() => setShowConfirmModal(false)}>
						No
					</Button>

					<Button
						variant='danger'
						onClick={handleConfirmDelete}>
						Sí, eliminar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default VistaEmpleadosPage;
