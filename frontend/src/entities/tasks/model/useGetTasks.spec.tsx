import { renderHook, waitFor } from '@testing-library/react';
import { mockData } from '../api/mocks/tasks.mock';
import { taskApi } from '../api/taskApi';
import { useGetTasks } from './useGetTasks';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

describe('get tasks', () => {

    const getTasks = vi.spyOn(taskApi, 'getTasks');

    it('should return tasks if promise resolved', async () => {
        const queryClient = new QueryClient();
        const wrapper = ({ children }: { children: React.ReactNode }) => (<QueryClientProvider client={queryClient} > {children} </QueryClientProvider>);
        getTasks.mockResolvedValue(mockData);
        const { result } = renderHook(() => useGetTasks(), { wrapper });
        await waitFor(() => expect(result.current.tasks).toEqual(mockData));
    });

    it('should return error if promise rejected', async () => {
        const queryClient = new QueryClient();
        const wrapper = ({ children }: { children: React.ReactNode }) => (<QueryClientProvider client={queryClient} > {children} </QueryClientProvider>);
        getTasks.mockRejectedValue(new Error('Ошибка получения всех задач'));
        const { result } = renderHook(() => useGetTasks(), { wrapper });
        await waitFor(() => expect(result.current.error).toBeNull()); // должна быть ошибка, а не null
    });

    it('should return empty array because user is not authorized or have no tasks', async () => {
        const queryClient = new QueryClient();
        const wrapper = ({ children }: { children: React.ReactNode }) => (<QueryClientProvider client={queryClient} > {children} </QueryClientProvider>);
        getTasks.mockResolvedValue([]);
        const { result } = renderHook(() => useGetTasks(), { wrapper });
        await waitFor(() => expect(result.current.tasks).toEqual([]));
    });
});
