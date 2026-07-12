import { apiClient } from "../../../shared/api/apiClient";
import axios from 'axios';

export interface UserEntity {
    username: string;
    password: string;
}

export interface RegisterUserDto {
    username: UserEntity['username'];
    password: UserEntity['password'];
    confirmPassword: string;
}

export interface LoginUserDto {
    username: UserEntity['username'];
    password: UserEntity['password'];
}

export const authApi = {
    register: async ({ username, password }: UserEntity) => await apiClient.post('/api/auth/register', { username, password }),
    login: async (credentials: UserEntity) => {
        const response = await apiClient.post('/api/auth/login', credentials);
        const token = await response.data;
        return token
    },
    logout: async () => {
        return axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, {}, {
            withCredentials: true
        })
    },
    refreshTokens: async () => {
        return axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/refresh`, {}, {
            withCredentials: true
        });
    }
}

