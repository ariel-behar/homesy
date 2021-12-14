import request from "../utils/request.js"; // request = (url, method, contentType, body);

let usersUrl = 'http://localhost:3030/users';

export const register = user => request(`${usersUrl}/register`, 'POST', 'application/json', user);

export const login = user => request(`${usersUrl}/login`, 'POST', 'application/json', user);

export const logout = (authToken) => request(`${usersUrl}/logout`, 'GET', authToken);

