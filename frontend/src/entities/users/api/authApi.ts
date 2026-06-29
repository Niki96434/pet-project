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
    register: async ({ username, password }: UserEntity) => await apiClient.post('/auth/register', { username, password }),
    login: async (credentials: UserEntity) => {
        const response = await apiClient.post('/auth/login', credentials);
        const token = await response.data;
        return token
    },
    getUsers: async () => await apiClient.get('/auth/users'),
    getUserByName: async (id: string) => await apiClient.get(`/auth/users/${id}`),
    logout: async () => {
        return axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
            withCredentialds: true
        })
    },
    refreshTokens: async () => {
        return axios.get(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
            withCredentials: true
        });
    }
}

