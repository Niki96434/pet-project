import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../api/taskApi";
import type { TaskType } from "./types";
import { useState } from "react";

export function useMarkStatusQuery(task: TaskType) {

    const [valueCheckbox, setValueCheckbox] = useState<boolean>(task.status === 'Completed' ? true : false);
    const changeValueCheckbox = (checked: boolean) => setValueCheckbox(checked);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (task: TaskType) => taskApi.updateTask(task.id.toString(), task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todo', task.id] });
        }
    });

    const changeCheckbox = () => {
        changeValueCheckbox(!valueCheckbox);
        const status = !valueCheckbox === true ? 'Completed' : 'Not completed';
        mutation.mutate({ ...task, status: status });
    }

    return { changeCheckbox, valueCheckbox }

}
