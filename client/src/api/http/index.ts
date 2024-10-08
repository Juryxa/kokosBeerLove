import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {store} from "../../index";
import {IUser} from "../models/IUser";

export const API_URL = `http://localhost:8000/api/auth`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    // Проверка, если это не запрос на регистрацию
    if (config.url !== '/signup/' && config.url !== '/login/' && config.url !== '/verify-email/') {
        // @ts-ignore
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/refresh/`, {withCredentials: true})
            localStorage.setItem('token', response.data.access);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $api;