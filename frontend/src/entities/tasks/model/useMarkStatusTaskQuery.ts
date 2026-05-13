import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../api/taskApi";
import type { TaskType } from "./types";

export function useMarkStatusQuery(task: TaskType) {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (task: TaskType) => taskApi.updateTask(task.id.toString(), task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todo', task.id] });
        },
        onError: () => console.log('задачу не удалось изменить')
    });

    const changeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        const status = checked === true ? 'Completed' : 'Not completed';
        mutation.mutate({ ...task, status: status });
    }

    return { changeCheckbox }

}