import axios from 'axios';

const BASE_URL = 'https://iqb-backend2.onrender.com';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials:true
});

export default api;