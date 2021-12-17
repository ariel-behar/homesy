import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

function ConfirmationModal({
    showModal,
    onClose,
    onSave,
}) {
    return (
        <>
            <Modal backdrop="static" keyboard={false} show={showModal} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this service?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onSave}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmationModal;