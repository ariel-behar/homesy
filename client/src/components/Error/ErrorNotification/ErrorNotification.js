import React from 'react'

import Toast from 'react-bootstrap/Toast';


function ErrorNotification({
    error
}) {
    return (
        <Toast bg={'warning'}>
            <Toast.Header>
                <strong className="me-auto">An error has occurred</strong>
                <small className="text-muted">{error.code ? `Code: ${error.code}` : ''}</small>
            </Toast.Header>
            <Toast.Body>{error.message}</Toast.Body>
        </Toast>
    );
}

export default ErrorNotification
