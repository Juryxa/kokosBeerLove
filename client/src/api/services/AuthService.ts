import {authApi} from "../http/auth";

import {AuthResponse} from "../models/response/AuthResponse";
import {CodeResponse} from "../models/response/CodeResponse";

export default class AuthService {
    static async login(email: string, password: string) {
        // @ts-ignore
        return authApi.post<AuthResponse>('/login/', {email, password})
    }

    static async registration(username: string, email: string, password: string) {
        // @ts-ignore
        return authApi.post<AuthResponse>('/signup/', {username, email, password})
    }

    static async logout(): Promise<unknown> {
        return authApi.post('/logout/')
    }

    static async verify(email: string) {
        // @ts-ignore
        return authApi.post<CodeResponse>('/verify-email/', {email})
    }

}