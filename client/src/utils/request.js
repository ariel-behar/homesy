const request = (url, method, contentType, body) => {
    if(method === 'GET') {
        return fetch(`${url}`)
            .then(res => res.json())
            .then(result => result);
    } 

    return fetch(`${url}`, {
        method: `${method}`,
        headers: {
            'Content-Type': `${contentType}`,
        },
        body: JSON.stringify(body),
    })
        .then(res => res.json())
        .then(result => result);
};

export default request;
