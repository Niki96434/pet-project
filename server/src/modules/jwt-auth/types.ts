export interface UserEntity {
    id: number;
    username: string;
    password_hash: string;
}

export interface IUserPayload {
    id: number;
    username: string;
}