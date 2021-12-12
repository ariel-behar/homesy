import request from '../utils/request.js'; // request = (url, method, contentType, body);

const homeServicesUrl = 'http://localhost:3030/home-services';

export const addToFavorites = (homeServiceId, user) => request(`${homeServicesUrl}/favorites/${homeServiceId}/add`, 'PUT', user.AUTH_TOKEN, user);

export const removeFromFavorites = (homeServiceId, user) => request(`${homeServicesUrl}/favorites/${homeServiceId}/remove`, 'PUT', user.AUTH_TOKEN, user);

export const getUserFavorites = authToken => request(`${homeServicesUrl}/favorites`, 'GET', authToken);
