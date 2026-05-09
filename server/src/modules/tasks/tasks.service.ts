import type TaskType from "./types.ts";
import ITaskRepository from './tasks.repository.ts'
import { isExistTaskError } from "./customErrors.ts";

interface ITaskRepository {
    repo: {
        getTasks(): TaskType[];
        getTaskById(id: number): TaskType | undefined;
        createTask(task: TaskType): TaskType;
        updateTask(id: number, task: TaskType): TaskType;
        deleteTask(id: number): boolean | undefined;
    }
}

function TaskService({ repo }: ITaskRepository) {

    const getTasks = () => {
        const tasks = repo.getTasks();
        return tasks
    }

    const getTaskById = (id: number) => {
        const task = repo.getTaskById(id);
        if (!task) {
            throw new isExistTaskError(`no task with ${id}`);
        }
        return task
    }

    const createTask = (task: TaskType) => {
        const newTask = repo.createTask(task);
        return newTask
    }

    const updateTask = (id: number, task: TaskType) => {
        const existedTask = repo.getTaskById(id);
        if (!existedTask) {
            throw new isExistTaskError(`no task with ${id}`);
        }
        const updatedTask = repo.updateTask(id, task);
        return updatedTask
    }

    const deleteTask = (id: number) => {
        const existedTask = repo.getTaskById(id);
        if (!existedTask) {
            throw new isExistTaskError(`no task with ${id}`);
        }
        repo.deleteTask(id);
        return true
    }

    return { getTasks, getTaskById, createTask, updateTask, deleteTask }
}

export default TaskService