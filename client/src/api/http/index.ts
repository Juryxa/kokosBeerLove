import axios from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";

export const API_URL = 'http://localhost:8000/api/auth'; // Проверьте правильность кавычек

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.url !== '/signup/' && config.url !== '/login/' && config.url !== '/verify-email/') {
        // @ts-ignore
        config.headers.Authorization = `Bearer ${token}`;  // Обновляем заголовок с токеном
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;

        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/refresh/`, {}, {
                withCredentials: true
            });
            localStorage.setItem('token', response.data.access);
            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Пользователь не авторизован.');
        }
    }

    return Promise.reject(error);
});

export default $api;
