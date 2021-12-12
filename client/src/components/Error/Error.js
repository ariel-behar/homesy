function Error({
    error
}) {
    return (
        <>
            <h3> Oops!</h3>

            {error.map(error => {
                return (
                    <p>
                        {error.code ? `${error.code} : ` : ''} {error.message}{' '}
                    </p>
                );
            })}
        </>
    );
}

export default Error;
