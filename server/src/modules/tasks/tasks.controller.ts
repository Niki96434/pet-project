import type { NextFunction, Response, Request } from 'express';
import type ITaskService from './tasks.service.ts';
import { TasksValidator } from './tasks.validator.ts';
import type TaskType from './types.ts';

interface ITaskService {
    taskService: {
        getTasks(user_id: number): TaskType[];
        getTask(id: number, user_id: number): TaskType | undefined;
        createTask(task: TaskType, user_id: number): TaskType;
        updateTask(id: number, task: TaskType, user_id: number): TaskType | undefined;
        deleteTask(id: number, user_id: number): boolean;
    }
}

function TaskController({ taskService }: ITaskService) {

    const getTasks = (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id = req.user?.id as number;

            const tasks = taskService.getTasks(user_id);
            res.status(200).json(tasks ?? []);
        } catch (e) {
            next(e);
        }
    }

    const getTask = (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id = req.user?.id as number;
            const { task_id } = req.params;

            TasksValidator.checkTaskId(Number(task_id));

            const task = taskService.getTask(Number(task_id), Number(user_id));
            res.status(200).json(task);
        } catch (e) {
            next(e);
        }
    }

    const createTask = (req: Request, res: Response, next: NextFunction) => {
        try {
            const task = req.body;
            const user_id = req.user?.id as number;

            TasksValidator.isValidTaskFields(task);

            const newTask = taskService.createTask(task, user_id);
            res.status(201).json(newTask);
        } catch (e) {
            next(e);
        }
    }

    const updateTask = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { task_id } = req.params;
            const task = req.body;

            const user_id = req.user?.id as number;

            TasksValidator.checkTaskId(Number(task_id));
            TasksValidator.isValidTaskFields(task);

            const updatedTask = taskService.updateTask(Number(task_id), task, Number(user_id));
            res.status(200).json(updatedTask);
        } catch (e) {
            next(e);
        }
    }

    const deleteTask = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { task_id } = req.params;

            const user_id = req.user?.id as number;

            TasksValidator.checkTaskId(Number(task_id));

            taskService.deleteTask(Number(task_id), user_id);
            res.status(204).json({ message: 'Task deleted successfully' });
        } catch (e) {
            next(e);
        }
    }
    return { getTasks, getTask, createTask, updateTask, deleteTask }
}

export default TaskController