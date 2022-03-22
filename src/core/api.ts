import axios from 'axios';

const api = axios.create({
	baseURL: 'http://172.21.5.166:8000'
	// baseURL: 'https://geoloc1-api.herokuapp.com'
});

export default api;