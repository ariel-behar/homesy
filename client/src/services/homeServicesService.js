import request from "../utils/request.js"; // request = (url, method, contentType, body);

const homeServicesUrl = 'http://localhost:3030/home-services'

export const create = (homeService, authToken) => request(`${homeServicesUrl}/create`, 'POST', authToken, homeService);

export const getOne = homeServiceId => request(`${homeServicesUrl}/${homeServiceId}`, 'GET');

//THIS one needs to be modified
// export const get = (typeOfService, cityOfOperation) => request(homeServicesUrl, 'GET', null, { typeOfService, cityOfOperation });

export const getAll = () => request(homeServicesUrl, 'GET');

export const updateOne = (homeServiceId, homeService, authToken) => request(`${homeServicesUrl}/${homeServiceId}`, 'PUT', authToken, homeService);

export const deleteOne = (homeServiceId, authToken) => request(`${homeServicesUrl}/${homeServiceId}`, 'DELETE', authToken);