import axios from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";

export const NEWS_API_URL = 'http://localhost:9000/api/news';

const newsApi = axios.create({
    withCredentials: true,
    baseURL: NEWS_API_URL
});

newsApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const deleteRegex = /^\/\d+\/delete\/$/;
    const updateRegex = /^\/\d+\/update\/$/;

    // Проверка для создания, удаления или обновления новостей
    if ((config.url === '/create/' || deleteRegex.test(config.url) || updateRegex.test(config.url)) && token) {
        // @ts-ignore
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

newsApi.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;

        try {
            const response = await axios.post<AuthResponse>('http://localhost:8000/api/auth/refresh/', {}, {
                withCredentials: true
            });
            localStorage.setItem('token', response.data.access);
            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
            return newsApi.request(originalRequest);
        } catch (e) {
            console.log('Ошибка авторизации при обновлении токена');
        }
    }
    return Promise.reject(error);
});

export default newsApi;
