import axios from 'axios';
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000,
    withCredentials: true
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);