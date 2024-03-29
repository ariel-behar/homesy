const request = (url, method, authToken, body) => {
    if(method === 'GET') {
        return fetch(`${url}`, {
            headers: {
                'Auth-Token': authToken,
            },
        })
        .then(res => {
            if (!res.ok) {
                throw res.json();
            }
            return res.json();
        });
    } 
    
    else if (method === 'DELETE'){
        return fetch(`${url}`, {
            method: 'DELETE',
            headers: {
                'Auth-Token': authToken,
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw res.json();
                }
                return res.json();
            });
    }

    return fetch(`${url}`, {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
            'Auth-Token': authToken,
        },
        body: JSON.stringify(body),
    }).then(res => {
        if (!res.ok) {
            throw res.json();
        }
        return res.json();
    });

};

export default request;
