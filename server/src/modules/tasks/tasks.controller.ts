import type { Request, Response } from 'express';
import type ITaskService from './tasks.service.ts';

class TaskController {

    private taskService: ITaskService;

    constructor(taskService: ITaskService) {
        this.taskService = taskService;
    }

    getTasks(req: Request, res: Response) {
        try {
            const tasks = this.taskService.getTasks();
            res.status(200).json(tasks);
        } catch (e) {
            res.status(500).json({ error: (e instanceof Error) ? e.message : 'Server error' });
        }
    }

    getTaskById(req: Request, res: Response) {
        const { id } = req.params;
        if (!Number(id)) {
            return res.status(404).json({ error: 'task not found' })
        }
        try {
            const task = this.taskService.getTaskById(Number(id));
            res.status(200).json(task);
        } catch (e) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    createTask(req: Request, res: Response) {
        const task = req.body;
        if (task.title.trim() === '' || task.title.length > 30) {
            return res.status(400).json({ error: 'task have invalid data' });
        }
        try {
            const newTask = this.taskService.createTask(task);
            res.status(200).json(newTask);
        } catch (e) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    updateTask(req: Request, res: Response) {
        const { id } = req.params;
        const task = req.body;
        if (!Number(id)) {
            return res.status(400).json({ error: 'id is not valid' });
        }
        try {
            const updatedTask = this.taskService.updateTask(Number(id), task);
            res.status(200).json(updatedTask);
        } catch (e) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    deleteTask(req: Request, res: Response) {
        const { id } = req.params;
        if (!Number(id)) {
            return res.status(400).json({ error: 'task not exist' })
        }
        try {
            this.taskService.deleteTask(Number(id));
            res.status(204).json({ message: 'Task deleted successfully' });
        } catch (e) {
            res.status(500).json({ error: 'Server error' });
        }
    }
}

export default TaskController