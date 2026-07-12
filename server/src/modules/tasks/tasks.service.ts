import type TaskType from "./types.ts";
import ITaskRepository from './tasks.repository.js'
import { TaskNotFoundError, AccessDeniedError } from "./customErrors.js";

interface ITaskRepository {
    repo: {
        getTasks(user_id: number): Promise<TaskType[]>;
        getTask(id: number, user_id: number): Promise<TaskType | undefined>;
        createTask(task: TaskType, user_id: number): Promise<TaskType>;
        updateTask(id: number, task: TaskType, user_id: number): Promise<TaskType>;
        deleteTask(id: number, user_id: number): Promise<TaskType>;
    }
}

function TaskService({ repo }: ITaskRepository) {

    const _getTaskAndCheckAccess = async (task_id: number, user_id: number) => {

        const task = await repo.getTask(task_id, user_id);

        if (!task) {
            throw new TaskNotFoundError(`Task not found`, 404);
        }

        if (task.user_id !== user_id) {
            throw new AccessDeniedError('You do not have permission to access this task', 403);
        }

        return task;
    };

    const getTasks = async (user_id: number): Promise<TaskType[]> => {
        return await repo.getTasks(user_id);
    }

    const getTask = async (task_id: number, user_id: number) => {
        return await _getTaskAndCheckAccess(task_id, user_id)
    }

    const createTask = async (task: TaskType, user_id: number) => {
        return await repo.createTask(task, user_id);
    }

    const updateTask = async (task_id: number, task: TaskType, user_id: number): Promise<TaskType> => {
        await _getTaskAndCheckAccess(task_id, user_id);

        return await repo.updateTask(task_id, task, user_id);
    }

    const deleteTask = async (task_id: number, user_id: number): Promise<TaskType> => {
        await _getTaskAndCheckAccess(task_id, user_id);

        const res = await repo.deleteTask(task_id, user_id);
        return res
    }

    return { getTasks, getTask, createTask, updateTask, deleteTask }
}

export default TaskService