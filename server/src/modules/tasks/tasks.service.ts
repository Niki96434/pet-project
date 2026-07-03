import type TaskType from "./types.ts";
import ITaskRepository from './tasks.repository.js'
import { TaskNotFoundError, AccessDeniedError } from "./customErrors.js";

interface ITaskRepository {
    repo: {
        getTasks(user_id: number): TaskType[];
        getTask(id: number, user_id: number): TaskType | undefined;
        createTask(task: TaskType, user_id: number): TaskType;
        updateTask(id: number, task: TaskType, user_id: number): TaskType;
        deleteTask(id: number, user_id: number): boolean;
    }
}

function TaskService({ repo }: ITaskRepository) {

    const _getTaskAndCheckAccess = (task_id: number, user_id: number) => {

        const task = repo.getTask(task_id, user_id);

        if (!task) {
            throw new TaskNotFoundError(`Task not found`, 404);
        }

        if (task.user_id !== user_id) {
            throw new AccessDeniedError('You do not have permission to access this task', 403);
        }

        return task;
    };

    const getTasks = (user_id: number) => {
        return repo.getTasks(user_id);
    }

    const getTask = (task_id: number, user_id: number) => {
        return _getTaskAndCheckAccess(task_id, user_id)
    }

    const createTask = (task: TaskType, user_id: number) => {
        return repo.createTask(task, user_id);
    }

    const updateTask = (task_id: number, task: TaskType, user_id: number) => {
        _getTaskAndCheckAccess(task_id, user_id);

        return repo.updateTask(task_id, task, user_id);
    }

    const deleteTask = (task_id: number, user_id: number) => {
        _getTaskAndCheckAccess(task_id, user_id);

        return repo.deleteTask(task_id, user_id);
    }

    return { getTasks, getTask, createTask, updateTask, deleteTask }
}

export default TaskService