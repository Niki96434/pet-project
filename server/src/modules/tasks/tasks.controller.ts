import type { NextFunction, Request, Response } from 'express';
import type ITaskService from './tasks.service.ts';
import { TasksValidator } from './tasks.validator.ts';
import type TaskType from './types/types.ts';

interface ITaskService {
    taskService: {
        getTasks(user_id: number): TaskType[];
        getTaskById(id: number, user_id: number): TaskType | undefined;
        createTask(task: TaskType, user_id: number): TaskType;
        updateTask(id: number, task: TaskType, user_id: number): TaskType | undefined;
        deleteTask(id: number, user_id: number): boolean;
    }
}

function TaskController({ taskService }: ITaskService) {

    const getTasksByIDUser = (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id = req.user.id;
            const tasks = taskService.getTasks(user_id);
            res.status(200).json(tasks ?? []);
        } catch (e) {
            next(e);
        }
    }

    const getTaskById = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user_id = req.user.id;

            TasksValidator.checkTaskId(Number(id));

            const task = taskService.getTaskById(Number(id), Number(user_id));
            res.status(200).json(task);
        } catch (e) {
            next(e);
        }
    }

    const createTask = (req: Request, res: Response, next: NextFunction) => {
        try {
            const task = req.body;
            const user_id = req.user.id;

            TasksValidator.isValidTaskFields(task);

            const newTask = taskService.createTask(task, user_id);
            res.status(201).json(newTask);
        } catch (e) {
            next(e);
        }
    }

    const updateTask = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const task = req.body;
            const user_id = req.user.id;

            TasksValidator.checkTaskId(Number(id));
            TasksValidator.isValidTaskFields(task);

            const updatedTask = taskService.updateTask(Number(id), task, Number(user_id));
            res.status(200).json(updatedTask);
        } catch (e) {
            next(e);
        }
    }

    const deleteTask = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user_id = req.user.id;

            TasksValidator.checkTaskId(Number(id));

            taskService.deleteTask(Number(id), user_id);
            res.status(204).json({ message: 'Task deleted successfully' });
        } catch (e) {
            next(e);
        }
    }
    return { getTasksByIDUser, getTaskById, createTask, updateTask, deleteTask }
}

export default TaskController