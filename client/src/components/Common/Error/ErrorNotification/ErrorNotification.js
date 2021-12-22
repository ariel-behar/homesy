import React, { useState } from 'react'

import Toast from 'react-bootstrap/Toast';
import styles from './ErrorNotification.module.scss';

function ErrorNotification({
    error,
}) {
    const [show, setShow] = useState(true);

    return (
        <Toast bg={'warning'} onClose={() => setShow(false)} show={show} className={styles.toastCustomStyles}>
            <Toast.Header>
                <strong className="me-auto">An error has occurred</strong>
                <small className="text-muted">{error.code ? `Code: ${error.code}` : ''}</small>
            </Toast.Header>
            <Toast.Body className={styles.toastBodyCustomStyles}>{error.message}</Toast.Body>
        </Toast>
    );
}

export default ErrorNotification
