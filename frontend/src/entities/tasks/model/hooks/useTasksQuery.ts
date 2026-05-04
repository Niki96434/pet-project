import { useQuery } from "@tanstack/react-query";
import { type TaskType } from "../types";
import { taskApi } from "../../api/taskApi";

export function useTasksQuery(deadlineDate: string) {

    const { data: tasks, status, error } = useQuery<TaskType[]>({
        queryKey: ['todos', deadlineDate],
        queryFn: () => taskApi.getTasks(deadlineDate),
        retry: 1,
    });
    return { tasks, status, error }
}