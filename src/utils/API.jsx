import axios from "axios";
// import.meta.env.VITE_BASE_API_URL
export const USER_API = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
    withCredentials: true
});

export const _signup = async (data) => {
    try {
        const response = await USER_API.post('/signup', data)
        const cookie = document.cookie.split('; ').find(row => row.startsWith('token='));
        return response.data
    } catch (error) {
        throw error;
    }
}