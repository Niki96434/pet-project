import { useQuery } from "@tanstack/react-query";
import { type TaskType } from "../types";
import { taskApi } from "../../api/taskApi";

export function useTasksQuery() {
    const { data: tasks, status, error } = useQuery<TaskType[]>({
        queryKey: ['todos'],
        queryFn: taskApi.getTasks,
        retry: 1,
    });
    return { tasks, status, error }
}