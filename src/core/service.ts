import api from "./api";
import { useHeaders } from "../hooks";


export const Service = {

    welcome: async () => {
        try {
            await api.get('/');
        } catch (error) {
			return Promise.reject(error);
        }
    },

    login: async (credenciais: any) => {
        try {
            const response = await api.post('/auth', credenciais);
            return response;
        } catch (error) {            
			return Promise.reject(error);
        }
    },

    novaRota: async (id: string) => {

        try {
            const response = await api.post('/rotas', {usuarioId: id});
            return response;
        } catch (error) {
			return Promise.reject(error);
        }
    }, 

    apagarRota: async (id: number) => {
        try {
            const response = await api.delete('/rotas', {});
            return response;
        } catch (error) {
			return Promise.reject(error);
        }

    },

    novaCoordenada: async (coord: any)  => {
        try {
            const response = await api.post('/coords', coord);
            return response
        } catch (error) {
			return Promise.reject(error);
        }
    },

    apagarDatabase: async ()  => {
        try {
            await api.delete('/database');

        } catch (error) {
			return Promise.reject(error);
        }
    }


}