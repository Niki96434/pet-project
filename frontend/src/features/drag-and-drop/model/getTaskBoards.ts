import { type Task } from "../../../entities/tasks";
import { getFilteredTasks } from './getFilteredTasks';
import { statuses } from "../../../entities/tasks";

export const getTaskBoards = (tasks: Task[] | null = []) => {
    return statuses.map((status: Task['status'], index: number) => {
        return ({
            id: index + 1, title: status, items: getFilteredTasks(tasks, status)
        })
    })
}