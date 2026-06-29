import axios from 'axios';
import axiosRetry from 'axios-retry'

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000,
    withCredentials: true,
});

axiosRetry(apiClient, {
    retries: 1,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },
    retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 500;
    }
});
