import express from 'express';
import { Router } from 'express';
import { getTaskById, getAllTasks, createTask, updateTask, deleteTask } from './tasks.route';

const app = express();
const route = Router();
app.use(express.json());

const PORT = '3000';

route.get('/tasks', getTaskById);

route.get('/tasks/:id', getAllTasks);

route.post('/tasks', createTask);

route.put('/tasks/:id', updateTask);

route.delete('/tasks/:id', deleteTask);

app.listen(PORT, () => {
    console.log('The server is running on port=3000')
});