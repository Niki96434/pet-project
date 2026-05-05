import express from 'express';
import TaskController from './tasks.controller.ts';

const route = express.Router();

route.get('/tasks', TaskController.getTasks);

route.get('/tasks/:id', TaskController.getTaskById);

route.post('/tasks', TaskController.createTask);

route.put('/tasks/:id', TaskController.updateTask);

route.delete('/tasks/:id', TaskController.deleteTask);

export default route;