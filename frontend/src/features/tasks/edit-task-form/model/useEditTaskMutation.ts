import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toaster } from '../../../../shared/lib/ui/toaster';
import { type UpdateTaskDto, taskApi } from '../../../../entities/tasks';

interface EditTaskMutationProps {
    closeEditModal: () => void;
}

export function useEditTaskMutation({ closeEditModal }: EditTaskMutationProps) {

    const queryClient = useQueryClient();

    const updateTaskMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: UpdateTaskDto }) => taskApi.updateTask(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            toaster.create({
                title: 'Задача успешно сохранилась',
                type: 'success'
            });
            closeEditModal();
        },
        onError: () => {
            toaster.create({
                title: 'Задачу не удалось сохранить',
                type: 'error'
            })
        }
    });

    return { updateTaskMutation }
}
