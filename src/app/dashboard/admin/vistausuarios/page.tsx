'use client'
import { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import Link from 'next/link';

const VistaEmpleadosPage = () => {
  const [empleados, setEmpleados] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleModificar = (empleado) => {
    setSelectedEmpleado(empleado);
    setShowEditModal(true);
  };

  const handleEliminar = (id) => {
    console.log(`Eliminar empleado con ID ${id}`);
  };

  
  const handleSave = async () => {
	try {
	  // Obtén los valores del formulario
	  const legajo = document.getElementById('formLegajo').value;
	  // Agrega más campos según sea necesario
  
	  // Crea el objeto con los datos actualizados
	  const updatedEmpleado = {
		...selectedEmpleado,
		UsuarioEmpleado: {
		  ...selectedEmpleado.UsuarioEmpleado,
		  legajo: legajo,
		  // Agrega más campos según sea necesario
		},
	  };
  
	  // Haz la solicitud HTTP para actualizar los datos
	  const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/empleado/${selectedEmpleado.id}`,
		{
		  method: 'PUT', // o 'PATCH' si solo estás actualizando algunos campos
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(updatedEmpleado),
		}
	  );
  
	  if (!response.ok) {
		throw new Error(`Error ${response.status}: ${response.statusText}`);
	  }
  
	  // Actualiza el estado de los empleados con los datos actualizados
	  setEmpleados(empleados.map(empleado =>
		empleado.id === selectedEmpleado.id ? updatedEmpleado : empleado
	  ));
  
	  console.log(`Empleado con ID ${selectedEmpleado.id} actualizado`);
	  setShowEditModal(false);
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

      <Table striped bordered hover>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmpleado && (
            <>
              <p>Legajo: {selectedEmpleado.UsuarioEmpleado.legajo}</p>
              <p>Fecha de ingreso: {new Date(selectedEmpleado.UsuarioEmpleado.fecha_ingreso).toLocaleDateString()}</p>
              <p>Fecha de egreso: {selectedEmpleado.UsuarioEmpleado.fecha_egreso ? new Date(selectedEmpleado.UsuarioEmpleado.fecha_egreso).toLocaleDateString() : 'N/A'}</p>
              <p>Nombre: {selectedEmpleado.UsuarioEmpleado.nombre}</p>
              <p>Apellido: {selectedEmpleado.UsuarioEmpleado.apellido}</p>
              <p>DNI: {selectedEmpleado.UsuarioEmpleado.dni}</p>
              <p>CUIL: {selectedEmpleado.UsuarioEmpleado.cuil}</p>
              <p>Fecha de nacimiento: {new Date(selectedEmpleado.UsuarioEmpleado.fechaNacimiento).toLocaleDateString()}</p>
              <p>Teléfono: {selectedEmpleado.UsuarioEmpleado.telefono}</p>
              <p>Estado: {selectedEmpleado.UsuarioEmpleado.is_active ? 'Activo' : 'Inactivo'}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmpleado && (
            <Form>
              <Form.Group controlId="formLegajo">
                <Form.Label>Legajo</Form.Label>
                <Form.Control type="text" defaultValue={selectedEmpleado.UsuarioEmpleado.legajo} />
              </Form.Group>
              {/* Agrega más campos de formulario según sea necesario */}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VistaEmpleadosPage;
