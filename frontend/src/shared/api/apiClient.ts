import axios from 'axios';
export const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:5000',
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