import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../api/taskApi";
import { type TaskType } from "./types";

export function useAllTasksQuery() {
    const { data: tasks, status, error } = useQuery<TaskType[]>({
        queryKey: ['todos'],
        queryFn: taskApi.getTasks,
        retry: 1
    });
    return { tasks, status, error }
}