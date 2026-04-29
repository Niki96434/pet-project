import type { CreateTaskDto, UpdateTaskDto, TaskType } from '../model/types';
import { apiClient } from '../../../shared/api/apiClient';

export const taskApi = {
    getTasks: async () => {
        const response = await apiClient.get<Promise<TaskType[]>>('/tasks');
        return response.data
    },
    createTask: async (task: CreateTaskDto) => apiClient.post<Promise<TaskType>>('/tasks', task),
    getTaskById: async (id: string) => apiClient.get<Promise<TaskType>>(`/tasks/${id}`),
    updateTask: async (id: string, task: UpdateTaskDto) => apiClient.put<Promise<TaskType>>(`/tasks/${id}`, task),
    deleteTask: async (id: string) => apiClient.delete(`/tasks/${id}`),
}

