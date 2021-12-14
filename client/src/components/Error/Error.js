import uniqid from "uniqid";

import { useErrorContext } from "../../contexts/ErrorContext.js";

function Error() {
    const { error } = useErrorContext();

    return (
        <>
            {error ? (
                <>
                    <h3>Oops!</h3>

                    {error.map(error => {
                        return (
                            <p key={uniqid()}>
                                {error.code ? `${error.code} : ` : ''} {error.message}{' '}
                            </p>
                        );
                    })}
                </>
            ) : (
                ''
            )}
        </>
    );
}

export default Error;
