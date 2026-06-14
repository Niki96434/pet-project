import { type Task } from "../../../../entities/tasks";

export const getFilteredTasks = (tasks: Task[], status: Task['status']) => tasks.filter((task) => task.status === status);
