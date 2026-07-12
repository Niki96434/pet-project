import { type Task } from "../../../../entities/tasks";

export const getFilteredTasks = (tasks: Task[] | null, status: Task['status']) => {

    if (!Array.isArray(tasks)) {
        return [];
    }

    return tasks.filter((task) => task.status === status);
}
