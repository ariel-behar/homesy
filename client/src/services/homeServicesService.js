import request from "../utils/request.js"; // request = (url, method, contentType, body);

const homeServicesUrl = 'http://localhost:3030/home-services'
const myProfileUrl = 'http://localhost:3030/my-profile';

export const create = (homeService, authToken) => request(`${homeServicesUrl}/create`, 'POST', authToken, homeService);

export const getOne = homeServiceId => request(`${homeServicesUrl}/${homeServiceId}`, 'GET');

export const getAll = () => request(homeServicesUrl, 'GET');

export const getAllbyUser = user => request(`${myProfileUrl}/`, 'GET', user.AUTH_TOKEN, user.userId);


export const updateOne = (homeServiceId, homeService, authToken) => request(`${homeServicesUrl}/${homeServiceId}`, 'PUT', authToken, homeService);

export const deleteOne = (homeServiceId, authToken) => request(`${homeServicesUrl}/${homeServiceId}`, 'DELETE', authToken);

export const addToFavorites = (homeServiceId, user) => request(`${homeServicesUrl}/${homeServiceId}/favorites/add`, 'PUT', user.AUTH_TOKEN, user);

export const removeFromFavorites = (homeServiceId, user) => request(`${homeServicesUrl}/${homeServiceId}/favorites/remove`, 'PUT', user.AUTH_TOKEN, user);

export const getAllUserFavorites = user => request(`${homeServicesUrl}/`, 'GET', user.AUTH_TOKEN, user.userId);

