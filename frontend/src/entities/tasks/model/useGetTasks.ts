import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../api/taskApi";
import { type Task } from "./types";

const TASK_STALE_TIME = 5 * 60 * 1000;
const TASK_GC_TIME = 10 * 60 * 1000;
const EMPTY_TASKS: Task[] = [];

export function useGetTasks() {

    const { data: tasks = EMPTY_TASKS, status, error } = useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: () => taskApi.getTasks(),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: TASK_STALE_TIME,
        gcTime: TASK_GC_TIME,
    });

    return {
        status, tasks, error
    }
}

