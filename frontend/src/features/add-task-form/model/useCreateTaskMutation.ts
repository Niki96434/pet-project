import { taskApi } from '../../../entities/tasks';
import { useMutation } from '@tanstack/react-query';
import { toaster } from "../../../shared/lib/ui/toaster";
import { type CreateTaskDto } from '../../../entities/tasks/model/types';
import { queryClient } from '../../../shared/api/queryClient';

interface CreateTaskProps {
    handleModal: () => void;
}

export function useCreateTaskMutation({ handleModal }: CreateTaskProps) {

    const mutationCreateTask = useMutation({
        mutationFn: (newTask: CreateTaskDto) => taskApi.createTask(newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
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