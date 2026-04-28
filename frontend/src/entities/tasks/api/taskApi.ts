import type { CreateTaskDto, TaskType } from '../model/types';
import { api } from './index';

export const taskApi = {
    getTasks: async () => {
        const response = await api.get<Promise<TaskType[]>>('/tasks');
        return response.data
    },
    createTask: async (task: CreateTaskDto) => api.post('/tasks', task),
    deleteTask: async (id: string) => api.delete(`/tasks/${id}`),
}

