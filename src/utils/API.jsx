import axios from "axios";
// import.meta.env.VITE_BASE_API_URL
export const USER_API = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
    withCredentials: true
});

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
        return response.data
    } catch (error) {
        throw error;
    }
}