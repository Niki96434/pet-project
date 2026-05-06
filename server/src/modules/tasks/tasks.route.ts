import express from 'express';
import TaskController from './tasks.controller.ts';
import TaskService from './tasks.service.ts';
import TaskRepository from './tasks.repository.ts';

const route = express.Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

route.get('/tasks', taskController.getTasks);

route.get('/tasks/:id', taskController.getTaskById);

route.post('/tasks', taskController.createTask);

route.put('/tasks/:id', taskController.updateTask);

route.delete('/tasks/:id', taskController.deleteTask);

export default route;