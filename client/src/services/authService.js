
let userURL = 'http://localhost:3030/users/';

export const register = user => {
    return fetch(`${userURL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(res => res.json())
        .then(user => user);
};

export const login = user => {
    return fetch(`${userURL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(res => res.json())
        .then(user => user);
};

export const logout = () => {
    localStorage.clear();
};

