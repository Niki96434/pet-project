import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../api/taskApi";
import { type TaskType } from "./types";
// import { filterTasksByDay } from "./filterTasksByDay";
// import type { DateValue } from "@chakra-ui/react";

export function useAllTasksQuery() {
    const { data: tasks, status, error } = useQuery<TaskType[]>({
        queryKey: ['todos'],
        queryFn: taskApi.getTasks,
        retry: 1
    });

    // const filteredTasks = filterTasksByDay(tasks ?? [], value);

    return {
        status, error, tasks
    }
}

