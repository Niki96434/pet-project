import type { CreateTaskDto, UpdateTaskDto, TaskType } from '../model/types';
import { apiClient } from '../../../shared/api/apiClient';

export const taskApi = {
    getTasks: async (): Promise<TaskType[] | undefined> => {
        try {
            const response = await apiClient.get<TaskType[]>('/home/tasks');
            console.log(response.data);
            if (response.status === 401) {
                return;
            } else {
                return response.data
            }
        } catch (e) {
            console.log(e);
            throw e
        }
    },
    createTask: async (task: CreateTaskDto, user_id: number): Promise<TaskType | undefined> => {
        const response = await apiClient.post<TaskType>('/home/tasks', { ...task, user_id: user_id });
        return response.data
    },
    getTaskById: async (id: string) => {
        const { data } = await apiClient.get<Promise<TaskType>>(`/home/tasks/${id}`);
        return data
    },
    updateTask: (id: string, task: UpdateTaskDto) => apiClient.put<Promise<TaskType>>(`/home/tasks/${id}`, task),
    deleteTask: (id: string) => apiClient.delete(`/home/tasks/${id}`),
    filterByDay: async (deadlineDate: string) => {
        const { data } = await apiClient.get<Promise<TaskType[]>>('/home/tasks', {
            params: { deadlineDate }
        });
        return data
    },
}

