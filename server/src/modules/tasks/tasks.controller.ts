import type { Request, Response } from 'express';
import { db } from './db.ts';

export function getAllTasks(req: Request, res: Response) {
    try {
        const getState = db.prepare('SELECT * FROM tasks');
        const tasks = getState.all();
        res.status(200).json({ data: tasks });
    } catch (e) {
        res.status(500).json({ error: 'Server error' });

    }
}

export function getTaskById(req: Request, res: Response) {
    const { id } = req.params;
    if (Number(id)) {
        try {
            const getState = db.prepare('SELECT * FROM tasks WHERE id = ?');
            const task = getState.get(Number(id));
            if (task) {
                res.status(200).json({ data: task });
            } else {
                res.status(404).json({ error: 'tasks not exist' });
            }
        } catch (e) {
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.status(404).json({ error: 'task not found' })
    }
}

export function createTask(req: Request, res: Response) {
    const task = req.body;
    if (task.title.trim() !== '') {
        try {
            const postState = db.prepare('INSERT INTO tasks (title, description) VALUES (?,?)');
            postState.run(task.title, task.description);
            res.status(200).json({ data: task });
        } catch (e) {
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.status(400).json({ error: 'tasks have invalid data' });
    }
}

export function updateTask(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description } = req.body;
    if (Number(id)) {
        const getTaskState = db.prepare('SELECT * FROM tasks WHERE id = ?');
        const task = getTaskState.get(Number(id));
        if (task) {
            try {
                const putTaskState = db.prepare('UPDATE tasks SET title = ?, description = ? WHERE id = ?');
                putTaskState.run(title, description, Number(id));
                const updatedTask = getTaskState.get(Number(id));
                res.status(200).json({ data: updatedTask });
            } catch (e) {
                res.status(500).json({ error: 'Server error' });
            }
        } else {
            res.status(404).json({ error: 'task is not found' })
        }
    } else {
        res.status(400).json({ error: 'id is not valid' })
    }
}

export function deleteTask(req: Request, res: Response) {
    const { id } = req.params;
    if (Number(id)) {
        const getState = db.prepare('SELECT * FROM tasks WHERE id = ?');
        const existedTask = getState.get(Number(id));
        if (existedTask) {
            try {
                const delState = db.prepare('DELETE FROM tasks WHERE id = ?');
                delState.run(Number(id));
                res.status(204).json({ message: 'Task deleted successfully' });
            } catch (e) {
                res.status(500).json({ error: 'Server error' });
            }
        } else {
            res.status(404).json({ error: 'task is not exist' });
        }
    } else {
        res.status(400).json({ error: 'task not exist' })
    }
}