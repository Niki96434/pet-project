import { renderHook, waitFor } from '@testing-library/react';
import { mockTasks } from '../../../features/drag-and-drop/model/tasks.mock';
import { taskApi } from '../api/taskApi';
import { useGetTasks } from './useGetTasks';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

describe('useGetTasks', () => {

    // const handlerGetTasks = http.get('/home/tasks', () => {
    //     return HttpResponse.json({

    //     });
    // });

    const getTasks = vi.spyOn(taskApi, 'getTasks');

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return tasks if promise resolved', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
        const wrapper = ({ children }: { children: React.ReactNode }) => (<QueryClientProvider client={queryClient} > {children} </QueryClientProvider>);

        getTasks.mockResolvedValue(mockTasks);
        const { result } = renderHook(() => useGetTasks(), { wrapper });
        await waitFor(() => {
            // инкапсулировать результат в один объект и сравнивать с помощью toStrictEqual/toEqual
            expect(result.current.status).toBe('success');
            expect(result.current.tasks).toEqual(mockTasks);
        });
    });

    it('should return error if promise rejected', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
        const wrapper = ({ children }: { children: React.ReactNode }) => (<QueryClientProvider client={queryClient} > {children} </QueryClientProvider>);

        const mockError = new Error('User is not authorized');
        getTasks.mockRejectedValue(mockError);
        const { result } = renderHook(() => useGetTasks(), { wrapper });
        await waitFor(() => {
            expect(result.current.status).toBe('error');
            expect(result.current.error?.message).toBe('Request failed with status code 401');
        });
    });

    it('should return empty array because user is not authorized or have no tasks', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
        const wrapper = ({ children }: { children: React.ReactNode }) => (<QueryClientProvider client={queryClient} > {children} </QueryClientProvider>);

        getTasks.mockResolvedValue([]);
        const { result } = renderHook(() => useGetTasks(), { wrapper });
        await waitFor(() => expect(result.current.tasks).toEqual([]));
    });
});