// this will house all the axios base config

import axios from 'axios';

const API = axios.create({
	baseURL: 'https://ik.imagekit.io/yvflq1adj/',
	headers: {
		'Content-Type': 'application/json'
	}
});

export default API;
