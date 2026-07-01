import type { CreateTaskDto, UpdateTaskDto, Task } from '../model/types';
import { apiClient } from '../../../shared/api/apiClient';

export const taskApi = {
    getTasks: async (): Promise<Task[]> => {
        const response = await apiClient.get<Task[]>('/api/tasks');
        if (response.status === 401) {
            return [];
        } else {
            return response.data
        }
    },
    createTask: async (task: CreateTaskDto, user_id: number): Promise<Task> => {
        const response = await apiClient.post<Task>('/api/tasks', { ...task, user_id: user_id });
        return response.data
    },
    getTaskById: async (id: string) => {
        const { data } = await apiClient.get<Promise<Task>>(`/api/tasks/${id}`);
        return data
    },
    updateTask: (id: string, task: UpdateTaskDto) => apiClient.put<Promise<Task>>(`/api/tasks/${id}`, task),
    deleteTask: (id: string) => apiClient.delete(`/api/tasks/${id}`),
    filterTaskByDay: async (deadlineDate: string) => {
        const { data } = await apiClient.get<Promise<Task[]>>('/api/tasks', {
            params: { deadlineDate }
        });
        return data
    },
}

