import express from 'express';
import { getTaskById, getAllTasks, createTask, updateTask, deleteTask } from './tasks.controller.ts';

const route = express.Router();

route.get('/tasks', getAllTasks);

route.get('/tasks/:id', getTaskById);

route.post('/tasks', createTask);

route.put('/tasks/:id', updateTask);

route.delete('/tasks/:id', deleteTask);

export default route;