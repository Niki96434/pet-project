import type TaskType from "./types.ts";
import ITaskRepository from './tasks.repository.js'
import { isExistTaskError, ForbiddenError } from "./customErrors.js";
import Database from "better-sqlite3";

interface ITaskRepository {
    repo: {
        getTasks(user_id: number): TaskType[];
        getTask(id: number, user_id: number): TaskType | undefined;
        createTask(task: TaskType, user_id: number): TaskType;
        updateTask(id: number, task: TaskType, user_id: number): TaskType;
        deleteTask(id: number, user_id: number): Database.RunResult;
    }
}

function TaskService({ repo }: ITaskRepository) {

    const getTasks = (user_id: number) => {
        const tasks = repo.getTasks(user_id);
        return tasks
    }

    const getTask = (task_id: number, user_id: number) => {

        const task = repo.getTask(task_id, user_id);

        if (!task) {
            throw new isExistTaskError(`no task with ${task_id}`, 404);
        }

        if (task.user_id !== user_id) {
            throw new ForbiddenError('access denied', 403);
        }

        return task
    }

    const createTask = (task: TaskType, user_id: number) => {
        const newTask = repo.createTask(task, user_id);
        return newTask
    }

    const updateTask = (id: number, task: TaskType, user_id: number) => {
        const existedTask = repo.getTask(id, user_id);

        if (!existedTask) {
            throw new isExistTaskError(`no task with ${id}`, 404);
        }

        if (existedTask.user_id !== user_id) {
            throw new ForbiddenError('access denied', 403)
        }

        const updatedTask = repo.updateTask(id, task, user_id);
        return updatedTask
    }

    const deleteTask = (id: number, user_id: number) => {
        const existedTask = repo.getTask(id, user_id);

        if (!existedTask) {
            throw new isExistTaskError(`no task with ${id}`, 404);
        }

        if (existedTask.user_id !== user_id) {
            throw new ForbiddenError('access denied', 403)
        }

        const result = repo.deleteTask(id, user_id);
        if (result) {
            throw new isExistTaskError(`no task with ${id}`, 404);
        }
        return;
    }

    return { getTasks, getTask, createTask, updateTask, deleteTask }
}

export default TaskService