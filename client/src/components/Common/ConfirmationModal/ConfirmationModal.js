import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ConfirmationModal({
    showModal,
    onClose,
    onSave,
}) {
    return (
        <>
            <Modal backdrop="static" keyboard={false} show={showModal} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletion Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this service?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onClose}>
                        Cancel
                        <FontAwesomeIcon icon="times" size="lg" pull="right" />
                    </Button>
                    <Button variant="danger" onClick={onSave}>
                        Delete
                        <FontAwesomeIcon icon="eraser" size="lg" pull="right" />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmationModal;