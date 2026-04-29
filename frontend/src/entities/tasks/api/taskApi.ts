import type { CreateTaskDto, TaskType } from '../model/types';
import { apiClient } from '../../../shared/api/apiClient';

export const taskApi = {
    getTasks: async () => {
        const response = await apiClient.get<Promise<TaskType[]>>('/tasks');
        return response.data
    },
    createTask: async (task: CreateTaskDto) => apiClient.post('/tasks', task),
    deleteTask: async (id: string) => apiClient.delete(`/tasks/${id}`),
}

