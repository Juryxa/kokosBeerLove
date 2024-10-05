import {IUser} from "../IUser";

export interface AuthResponse {
    access: string;
    refreshToken: string;
    user: IUser;
}