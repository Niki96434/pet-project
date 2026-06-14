import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../api/taskApi";
import { type Task } from "./types";

const TASK_STALE_TIME = 5 * 60 * 1000;

export function useAllTasksQuery() {

    const { data: tasks = [], status, error } = useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: () => taskApi.getTasks(),
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: TASK_STALE_TIME,
    });

    return {
        status, tasks, error
    }
}

