import request from "../utils/request.js"; // request = (url, method, contentType, body);

let usersUrl = 'http://localhost:3030/users';

export const register = user => {
    return request(`${usersUrl}/register`, 'POST', 'application/json', user)
};

export const login = user => {
    return request(`${usersUrl}/login`, 'POST', 'application/json', user);
};

export const logout = () => {
    localStorage.clear();
};

