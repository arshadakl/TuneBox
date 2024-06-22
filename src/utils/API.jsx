import axios from "axios";
import { getToken } from "./tokenService";
// import.meta.env.VITE_BASE_API_URL
export const USER_API = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
    withCredentials: true
});


USER_API.interceptors.request.use(
    (config) => {
        const token = getToken()
      if (token) {
        config.headers['Authorization'] = `${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


export const _signup = async (data) => {
    try {
        const response = await USER_API.post('/signup', data)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const _login = async (data) => {
    try {
        const response = await USER_API.post('/login', data)
        console.log('Cookies:', document.cookie) 
        return response.data
    } catch (error) {
        throw error;
    }
}

export const _logout = async () => {
    try {
        const response = await USER_API.post('/logout')
        return response.data
    } catch (error) {
        throw error;
    }
}

export const _addMusic = async (data) => {
    try {
        const response = await USER_API.post('/addmusic', data)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const _getPlaylist = async (data) => {
    try {
        const response = await USER_API.get('/getplaylist')
        return response.data
    } catch (error) {
        throw error;
    }
}

