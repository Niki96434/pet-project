import { type InternalAxiosRequestConfig } from 'axios';
import { apiClient } from "./apiClient";
import { authApi } from './../../entities/users/api/authApi';

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config
});

apiClient.interceptors.response.use(
    (response) => {
        return response
    },

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._isRetry) {

            originalRequest._isRetry = true;

            try {
                const res = await authApi.refreshTokens();

                const newAccessToken = res.data.accessToken;

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                localStorage.setItem('accessToken', newAccessToken);

                return apiClient(originalRequest);

            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);