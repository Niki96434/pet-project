import { apiClient } from "../../../shared/api/apiClient";

export interface UserEntity {
    username: string;
    password: string;
}

export interface RegisterUserDto {
    username: UserEntity['username'];
    password: UserEntity['password'];
    confirmPassword?: string;
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
    logout: () => { },
}

