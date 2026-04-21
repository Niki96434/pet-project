import type { Request, Response } from 'express';
import TaskService from './tasks.service.ts';

class TaskController {

    static getAllTasks(req: Request, res: Response) {
        try {
            const tasks = TaskService.getAllTasks();
            res.status(200).json({ data: tasks });
        } catch (e) {
            res.status(500).json({ error: 'Server error' });

        }
    }

    static getTaskById(req: Request, res: Response) {
        const { id } = req.params;
        if (!Number(id)) {
            return res.status(404).json({ error: 'task not found' })
        }
        try {
            const task = TaskService.getTaskById(Number(id));
            res.status(200).json({ data: task });
        } catch (e) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    static createTask(req: Request, res: Response) {
        const task = req.body;
        if (task.title.trim() === '' || task.title.length > 30) {
            return res.status(400).json({ error: 'task have invalid data' });
        }
        try {
            const newTask = TaskService.createTask(task);
            res.status(200).json({ data: newTask });
        } catch (e) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    static updateTask(req: Request, res: Response) {
        const { id } = req.params;
        const task = req.body;
        if (!Number(id)) {
            return res.status(400).json({ error: 'id is not valid' });
        }
        try {
            const updatedTask = TaskService.updateTask(Number(id), task);
            res.status(200).json({ data: updatedTask });
        } catch (e) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    static deleteTask(req: Request, res: Response) {
        const { id } = req.params;
        if (!Number(id)) {
            return res.status(400).json({ error: 'task not exist' })
        }
        try {
            TaskService.deleteTask(Number(id));
            res.status(204).json({ message: 'Task deleted successfully' });
        } catch (e) {
            res.status(500).json({ error: 'Server error' });
        }
    }
}

export default TaskController