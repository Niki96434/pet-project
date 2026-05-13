import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../api/taskApi";
import type { TaskType } from "./types";
import { toaster } from "../../../shared/lib/ui/toaster";

export function useMarkStatusQuery(task: TaskType) {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (task: TaskType) => taskApi.updateTask(task.id.toString(), task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todo', task.id] });
            toaster.create({
                title: 'Поздравляю с выполнением!',
                type: 'success'
            });
        }
    });

    const changeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        const status = checked === true ? 'Completed' : 'Not completed';
        mutation.mutate({ ...task, status: status });
    }

    return { changeCheckbox }

}