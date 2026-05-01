import type { CreateTaskDto, UpdateTaskDto, TaskType } from '../model/types';
import { apiClient } from '../../../shared/api/apiClient';

export const taskApi = {
    getTasks: async () => {
        const response = await apiClient.get<Promise<TaskType[]>>('/tasks');
        return response.data
    },
    createTask: (task: CreateTaskDto) => apiClient.post<Promise<TaskType>>('/tasks', task),
    getTaskById: async (id: string) => {
        const response = await apiClient.get<Promise<TaskType>>(`/tasks/${id}`);
        return response.data
    },
    updateTask: (id: string, task: UpdateTaskDto) => apiClient.put<Promise<TaskType>>(`/tasks/${id}`, task),
    deleteTask: (id: string) => apiClient.delete(`/tasks/${id}`),
}

