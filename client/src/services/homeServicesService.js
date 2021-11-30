import request from "../utils/request.js"; // request = (url, method, contentType, body);

const homeServicesUrl = 'http://localhost:3030/home-services'

export const create = (homeService) => {
    return request(`${homeServicesUrl}/create`, 'POST', 'application/json', homeService);
};

export const getAll = () => request(homeServicesUrl, 'GET');

export const getOne = (homeServiceId) => request(`${homeServicesUrl}/${homeServiceId}`, 'GET');