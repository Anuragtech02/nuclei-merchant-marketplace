// this will house all the axios base config

import axios from 'axios';

const headers = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`
};

export const API_LANDING = axios.create({
	baseURL: import.meta.env.VITE_API_URI_LANDING_SERVICE,
	headers
});

export const API_COMMON = axios.create({
	baseURL: import.meta.env.VITE_API_URI_COMMON_SERVICE,
	headers
});

export const API_FLIGHT_TICKET = axios.create({
	baseURL: import.meta.env.VITE_API_URI_FLIGHT_TICKET_SERVICE,
	headers
});

export const API_LISTING = axios.create({
	baseURL: import.meta.env.VITE_API_URI_LISTING_SERVICE,
	headers
});

// export default API;
