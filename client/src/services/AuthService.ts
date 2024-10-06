import $api from "../http";

import {AuthResponse} from "../models/response/AuthResponse";
import {CodeResponse} from "../models/response/CodeResponse";

export default class AuthService {
    static async login(email: string, password: string) {
        return $api.post<AuthResponse>('/login/', {email, password})
    }

    static async registration(username: string, email: string, password: string) {
        return $api.post<AuthResponse>('/signup/', {username, email, password})
    }

    static async logout(): Promise<unknown> {
        return $api.post('/logout/')
    }

    static verify(email: string) {
        return $api.post<CodeResponse>('/verify-email/', {email})
    }

}