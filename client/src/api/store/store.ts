import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
    user_id: number;
    exp: number;
    is_superuser: boolean;
}

const isUserSuperuser = (): boolean => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
            return decoded.is_superuser;
        } catch (error) {
            console.error('Ошибка при декодировании токена:', error);
            return false;
        }
    }
    return false;
};

export default class Store {
    user = {} as IUser;
    code = 0;
    isAuth = false;
    isSuperUser = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setCode(code: number) {
        this.code = code;
    }
    getCode() {
        return this.code;
    }
    setSuperUser(bool:boolean){
        this.isSuperUser = bool;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.access);
            this.setAuth(true);
            this.setSuperUser(isUserSuperuser());
            this.setUser(response.data.user);
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message);
        }
    }

    async verify(email: string) {
        try {
            const response = await AuthService.verify(email);
            this.setCode(response.data.code);
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message);
        }
    }

    async registration(username: string, email: string, password: string) {
        try {
            const response = await AuthService.registration(username, email, password);
            localStorage.setItem('token', response.data.access);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.post<AuthResponse>(
                `${API_URL}/refresh/`,
                {},  // Передаем пустой объект, так как refresh_token находится в куки
                {
                    withCredentials: true
                }
            );
            localStorage.setItem('token', response.data.access);
            this.setAuth(true);
            this.setSuperUser(isUserSuperuser()); // Обновляем статус суперпользователя после получения токена
            this.setUser(response.data.user);
        } catch (e) {
            // @ts-ignore
            console.log('Ошибка авторизации:', e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

}