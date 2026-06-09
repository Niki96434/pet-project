import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../api/taskApi";
import { type TaskType } from "./types";

export function useAllTasksQuery() {

    const { data: tasks, status, error } = useQuery<TaskType[] | undefined>({
        queryKey: ['todos'],
        queryFn: () => taskApi.getTasks(),
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 5 * 60 * 1000,
    });

    return {
        status, tasks, error
    }
}

