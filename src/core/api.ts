import axios from 'axios';
import { useHeaders } from '../hooks';

const api = axios.create({
	// baseURL: 'http://172.21.5.166:8000'
	baseURL: 'https://geoloc1-api.herokuapp.com'
});


api.interceptors.request.use(async (config) => {

	const headers = await useHeaders();

	if(!config.url?.endsWith('login')) {
		config.headers.token = headers.headers.token;
	}
	// console.log('interceptado', headers);
	// console.log('axios config', JSON.stringify(config,null,'\t'));
	
	return config;
	
}); 

export default api;