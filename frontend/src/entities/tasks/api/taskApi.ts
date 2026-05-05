import type { CreateTaskDto, UpdateTaskDto, TaskType } from '../model/types';
import { apiClient } from '../../../shared/api/apiClient';

export const taskApi = {
    getTasks: async () => {
        const { data } = await apiClient.get<Promise<TaskType[]>>('/tasks');
        return data
    },
    createTask: (task: CreateTaskDto) => apiClient.post<Promise<TaskType>>('/tasks', task),
    getTaskById: async (id: string) => {
        const { data } = await apiClient.get<Promise<TaskType>>(`/tasks/${id}`);
        return data
    },
    updateTask: (id: string, task: UpdateTaskDto) => apiClient.put<Promise<TaskType>>(`/tasks/${id}`, task),
    deleteTask: (id: string) => apiClient.delete(`/tasks/${id}`),
    filterByDay: async (deadlineDate: string) => {
        const { data } = await apiClient.get<Promise<TaskType[]>>('/tasks', {
            params: { deadlineDate }
        });
        return data
    },
}

