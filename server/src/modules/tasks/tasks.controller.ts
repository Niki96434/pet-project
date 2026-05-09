import type { NextFunction, Request, Response } from 'express';
import type ITaskService from './tasks.service.ts';
import { TasksValidator } from './tasks.validator.ts';
import type TaskType from './types.ts';

interface ITaskService {
    taskService: {
        getTasks(): TaskType[];
        getTaskById(id: number): TaskType | undefined;
        createTask(task: TaskType): TaskType;
        updateTask(id: number, task: TaskType): TaskType | undefined;
        deleteTask(id: number): boolean;
    }
}

function TaskController({ taskService }: ITaskService) {

    const getTasks = (req: Request, res: Response, next: NextFunction) => {
        try {
            const tasks = taskService.getTasks();
            res.status(200).json(tasks);
        } catch (e) {
            next(e);
        }
    }

    const getTaskById = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            TasksValidator.checkTaskId(Number(id));

            const task = taskService.getTaskById(Number(id));
            res.status(200).json(task);
        } catch (e) {
            next(e);
        }
    }

    const createTask = (req: Request, res: Response, next: NextFunction) => {
        try {
            const task = req.body;
            TasksValidator.isValidTaskFields(task);

            const newTask = taskService.createTask(task);
            res.status(200).json(newTask);
        } catch (e) {
            next(e);
        }
    }

    const updateTask = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const task = req.body;

            TasksValidator.checkTaskId(Number(id));
            TasksValidator.isValidTaskFields(task);

            const updatedTask = taskService.updateTask(Number(id), task);
            res.status(200).json(updatedTask);
        } catch (e) {
            next(e);
        }
    }

    const deleteTask = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            TasksValidator.checkTaskId(Number(id));

            taskService.deleteTask(Number(id));
            res.status(204).json({ message: 'Task deleted successfully' });
        } catch (e) {
            next(e);
        }
    }
    return { getTasks, getTaskById, createTask, updateTask, deleteTask }
}

export default TaskController