import type { NextFunction, Request, Response } from 'express';
import type ITaskService from './tasks.service.ts';
import { TasksValidator } from './tasks.validator.ts';

class TaskController {

    private taskService: ITaskService;

    constructor(taskService: ITaskService) {
        this.taskService = taskService;
    }

    getTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const tasks = this.taskService.getTasks();
            res.status(200).json(tasks);
        } catch (e) {
            next(e);
        }
    }

    getTaskById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            TasksValidator.checkTaskId(Number(id));

            const task = this.taskService.getTaskById(Number(id));
            res.status(200).json(task);
        } catch (e) {
            next(e);
        }
    }

    createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const task = req.body;
            TasksValidator.isValidTaskFields(task);

            const newTask = this.taskService.createTask(task);
            res.status(200).json(newTask);
        } catch (e) {
            next(e);
        }
    }

    updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const task = req.body;

            TasksValidator.checkTaskId(Number(id));
            TasksValidator.isValidTaskFields(task);

            const updatedTask = this.taskService.updateTask(Number(id), task);
            res.status(200).json(updatedTask);
        } catch (e) {
            next(e);
        }
    }

    deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            TasksValidator.checkTaskId(Number(id));

            this.taskService.deleteTask(Number(id));
            res.status(204).json({ message: 'Task deleted successfully' });
        } catch (e) {
            next(e);
        }
    }
}

export default TaskController