import uniqid from "uniqid";
import ToastContainer from 'react-bootstrap/ToastContainer';

import { useErrorContext } from "../../contexts/ErrorContext.js";
import ErrorNotification from "./ErrorNotification/ErrorNotification.js";

function Error() {
    const { error } = useErrorContext();

    return (
        <>
            {error ? (
                <>
                    <ToastContainer position={'top-end'} className='mt-2'>
                        {error.map(error => {
                            return (
                                <ErrorNotification key={uniqid()} error={error} />
                                // <p key={uniqid()}>
                                //     {error.code ? `${error.code} : ` : ''} {error.message}{' '}
                                // </p>
                            );
                        })}
                    </ToastContainer>
                </>
            ) : (
                ''
            )}
        </>
    );
}

export default Error;
