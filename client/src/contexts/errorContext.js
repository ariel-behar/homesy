import { createContext, useState, useContext } from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState('');

    const displayError = newError => {
        if (newError.hasOwnProperty('errors')) {
            let newErrors = [];

            Object.keys(newError.errors).forEach(err => {
                newErrors.push({
                    message: `${newError.errors[err].message}`,
                });
            });

            setError(newErrors);
        } else {
            if (newError.message === 'Failed to fetch') {
                newError.code = 500;
                newError.message = 'Communication with server has failed';
            }
            setError([newError]);
        }

        setTimeout(() => {
            setError('');
        }, 10000);
    };

    return (
        <ErrorContext.Provider value={{error, displayError}}>
            {children}
        </ErrorContext.Provider>
    )
};

export const useErrorContext = () => {
    const errorState = useContext(ErrorContext);

    return errorState;
};

export default ErrorContext;
