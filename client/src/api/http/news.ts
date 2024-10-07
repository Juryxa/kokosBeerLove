import axios from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";

export const NEWS_API_URL = `http://localhost:8000/api/news`;

const newsApi = axios.create({
    withCredentials: true,
    baseURL: NEWS_API_URL
});

newsApi.interceptors.request.use((config) => {
    // Добавляем токен в заголовки
    if (localStorage.getItem('token')) {
        // @ts-ignore
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
});

newsApi.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`http://localhost:8000/api/auth/refresh/`, { withCredentials: true });
            localStorage.setItem('token', response.data.access);
            return newsApi.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН');
        }
    }
    throw error;
});

export default newsApi;
