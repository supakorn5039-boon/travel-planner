import { ROUTES } from '@/constants/RouteConst';
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 180 * 1000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

fetchClient.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers = config.headers ?? {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

fetchClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove('token');
            window.location.href = ROUTES.LOGIN;
            return;
        }

        return Promise.reject(error);
    }
);
