import { useMutation } from "@tanstack/react-query";
import { taskApi } from "../api/taskApi";
import type { UpdateTaskDto } from "./types";
import { queryClient } from "../../../shared/api/queryClient";

export function useUpdateTaskStatus() {

    const updateTaskMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: UpdateTaskDto }) => taskApi.updateTask(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });

    return { updateTaskMutation }
}
