import type { CreateTaskDto, UpdateTaskDto, TaskType } from '../model/types';
import { apiClient } from '../../../shared/api/apiClient';

export const taskApi = {
    getTasks: async (): Promise<TaskType[] | undefined> => {
        try {
            console.log('перед запросом');
            const response = await apiClient.get<TaskType[]>('/home/tasks');
            if (response.status === 401) {
                console.log('после запроса');
                return;
            } else {
                return response.data
            }
        } catch (e) {
            console.log(e);
            throw e
        }
    },
    createTask: (task: CreateTaskDto) => apiClient.post<Promise<TaskType>>('/home/tasks', task),
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

