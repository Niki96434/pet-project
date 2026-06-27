export interface UserEntity {
    id: number;
    username: string;
    password_hash: string;
    refresh_token: string;
}

export interface IUserPayload {
    id: number;
    username: string;
}

export interface CookieType {
    [key: string]: string;
}

