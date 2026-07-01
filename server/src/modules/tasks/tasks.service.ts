import type TaskType from "./types.ts";
import ITaskRepository from './tasks.repository.ts'
import { isExistTaskError } from "./customErrors.ts";

interface ITaskRepository {
    repo: {
        getTasks(user_id: number): TaskType[];
        getTaskById(id: number, user_id: number): TaskType | undefined;
        createTask(task: TaskType, user_id: number): TaskType;
        updateTask(id: number, task: TaskType, user_id: number): TaskType;
        deleteTask(id: number, user_id: number): boolean | undefined;
    }
}

function TaskService({ repo }: ITaskRepository) {

    const getTasks = (user_id: number) => {
        const tasks = repo.getTasks(user_id);
        return tasks
    }

    const getTask = (id: number, user_id: number) => {
        const task = repo.getTaskById(id, user_id);
        if (!task) {
            throw new isExistTaskError(`no task with ${id}`);
        }
        return task
    }

    const createTask = (task: TaskType, user_id: number) => {
        const newTask = repo.createTask(task, user_id);
        return newTask
    }

    const updateTask = (id: number, task: TaskType, user_id: number) => {
        const existedTask = repo.getTaskById(id, user_id);
        if (!existedTask) {
            throw new isExistTaskError(`no task with ${id}`);
        }
        const updatedTask = repo.updateTask(id, task, user_id);
        return updatedTask
    }

    const deleteTask = (id: number, user_id: number) => {
        const existedTask = repo.getTaskById(id, user_id);
        if (!existedTask) {
            throw new isExistTaskError(`no task with ${id}`);
        }
        repo.deleteTask(id, user_id);
        return true
    }

    return { getTasks, getTask, createTask, updateTask, deleteTask }
}

export default TaskService