import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface ModalUpdateInstitucionProps {
    id: number;
    showEditModal: boolean;
    setShowEditModal: any;
    institucion: any;
    handleSave: any;
}

const ModalUpdateInstitucion: React.FC<ModalUpdateInstitucionProps> = ({id,showEditModal,setShowEditModal,institucion,handleSave}) => {
    // Lógica del componente

    return (
        // JSX del componente
        <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Editar Empleado</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {institucion && (
                <Form>
                    <Form.Group controlId='formLegajo'>
                        <Form.Label>Cue</Form.Label>
                        <Form.Control
                            type='text'
                            defaultValue={institucion.cue}
                        />
                    </Form.Group>

                    <Form.Group controlId='formNombre'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type='text'
                            defaultValue={institucion.nombre}
                        />
                    </Form.Group>

                    <Form.Group controlId='formApellido'>
                        <Form.Label>Localidad</Form.Label>
                        <Form.Control
                            type='text'
                            defaultValue={institucion.domicilioInstitucion?.localidad}
                        />
                    </Form.Group>

                    <Form.Group controlId='formApellido'>
                        <Form.Label>Barrio</Form.Label>
                        <Form.Control
                            type='text'
                            defaultValue={institucion.domicilioInstitucion?.barrio}
                        />
                    </Form.Group>

                    <Form.Group controlId='formApellido'>
                        <Form.Label>Calle</Form.Label>
                        <Form.Control
                            type='text'
                            defaultValue={institucion.domicilioInstitucion?.calle}
                        />
                    </Form.Group>

                    <Form.Group controlId='formApellido'>
                        <Form.Label>Numero</Form.Label>
                        <Form.Control
                            type='text'
                            defaultValue={institucion.domicilioInstitucion?.numero}
                        />
                    </Form.Group>

                    <Form.Group controlId='formApellido'>
                        <Form.Label>Logo</Form.Label>
                        <Form.Control
                            type='file'
                        />
                    </Form.Group>
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

    );
};

export default ModalUpdateInstitucion;
