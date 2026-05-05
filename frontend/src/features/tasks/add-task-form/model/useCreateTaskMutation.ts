import { taskApi } from '../../../../entities/tasks';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { toaster } from "../../../../shared/lib/ui/toaster";
import { type CreateTaskDto } from '../../../../entities/tasks/model/types';

interface CreateTaskProps {
    handleModal: () => void;
}

export function useCreateTaskMutation({ handleModal }: CreateTaskProps) {

    const queryClient = useQueryClient();

    const mutationCreateTask = useMutation({
        mutationFn: (newTask: CreateTaskDto) => taskApi.createTask(newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            handleModal();
            toaster.create({
                title: 'Задача успешно добавилась!',
                type: 'success',
            });
        },
        onError: () => {
            toaster.create({
                title: 'Задачу не удалось добавить',
                type: 'error',
            });
        }
    });

    const createTask = (data: CreateTaskDto) => {
        mutationCreateTask.mutate(data);
    }

    return {
        mutationCreateTask, createTask
    }
}