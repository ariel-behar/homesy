import uniqid from "uniqid";
import ToastContainer from 'react-bootstrap/ToastContainer';

import { useErrorContext } from "../../../contexts/ErrorContext.js";
import ErrorNotification from "./ErrorNotification/ErrorNotification.js";

import styles from './Error.module.css';

function Error() {
    const { error } = useErrorContext();

    return (
        <>
            {error ? (
                <>
                    <ToastContainer position={'top-end'} className='mt-2' className={styles.zIndex}>
                        {error.map(error => {
                            return (
                                <ErrorNotification key={uniqid()} error={error} />
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
