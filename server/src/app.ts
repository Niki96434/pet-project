import express from 'express';
import { db } from './db.ts';

const app = express();
app.use(express.json());
const PORT = '3000';

app.get('/tasks', (req, res) => {
    const getState = db.prepare('SELECT * FROM tasks');
    const tasks = getState.all();
    res.status(200).json({ data: tasks });
});

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    if (Number(id)) {
        const getState = db.prepare('SELECT * FROM tasks WHERE id = ?');
        const task = getState.get(Number(id));
        if (task) {
            res.status(200).json({ data: task })
        } else {
            res.status(404).json({ error: 'task not found' })
        }

    }
});

app.post('/tasks', (req, res) => {
    const task = req.body;
    if (task.title.trim() !== '') {
        const postState = db.prepare('INSERT INTO tasks (title, description) VALUES (?,?)');
        postState.run(task.title, task.description);
        res.status(200).json({ data: task });
    } else {
        res.status(400).json({ error: 'tasks have invalid data' });
    }
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    if (Number(id)) {
        const getTaskState = db.prepare('SELECT * FROM tasks WHERE id = ?');
        const task = getTaskState.get(Number(id));
        if (task) {
            const putTaskState = db.prepare('UPDATE tasks SET title = ?, description = ? WHERE id = ?');
            putTaskState.run(title, description, Number(id));
            const updatedTask = getTaskState.get(Number(id));
            res.status(200).json({ data: updatedTask });
        } else {
            res.status(404).json({ error: 'task is not found' })
        }
    } else {
        res.status(400).json({ error: 'id is not valid' })
    }
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    if (Number(id)) {
        const getState = db.prepare('SELECT * FROM tasks WHERE id = ?');
        const existedTask = getState.get(Number(id));
        if (existedTask) {
            const delState = db.prepare('DELETE FROM tasks WHERE id = ?');
            delState.run(Number(id));
            res.status(204);
        } else {
            res.status(404).json({ error: 'task is not exist' });
        }
    } else {
        res.status(400).json({ error: 'task not exist' })
    }
})

app.listen(PORT, () => {
    console.log('The server is running on port=3000')
});