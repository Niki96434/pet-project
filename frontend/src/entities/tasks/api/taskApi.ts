import type { CreateTaskDto, UpdateTaskDto, Task } from '../model/types';
import { apiClient } from '../../../shared/api/apiClient';

export const taskApi = {
    getTasks: async () => {
        const response = await apiClient.get<Task[]>('/api/tasks');
        if (response.status === 401) {
            return [];
        } else {
            return response.data
        }
    },
    createTask: async (task: CreateTaskDto) => {
        const response = await apiClient.post<Task>('/api/tasks', task);
        return response.data
    },
    getTaskById: async (id: string) => {
        const { data } = await apiClient.get<Task>(`/api/tasks/${id}`);
        return data
    },
    updateTask: (id: string, task: UpdateTaskDto) => apiClient.put<Task>(`/api/tasks/${id}`, task),
    deleteTask: (id: string) => apiClient.delete(`/api/tasks/${id}`),
    filterTaskByDay: async (deadline_date: string) => {
        const { data } = await apiClient.get<Task[]>('/api/tasks', {
            params: { deadline_date }
        });
        return data
    },
}

