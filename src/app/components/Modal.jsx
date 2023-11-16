'use client';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Modal2({titulo,descripcion, primerboton,segundoboton,valor, activo}) {
  return (
    <div
      className="modal show"
      style={{ display: activo?'block':'none', position: 'absolute', margin:'auto'}}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{descripcion}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={valor=false}>{primerboton}</Button>
          <Button variant="primary" onClick={valor=true}>{segundoboton}</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default Modal2;
