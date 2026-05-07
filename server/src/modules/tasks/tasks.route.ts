import express from 'express';
import TaskController from './tasks.controller.ts';
import TaskService from './tasks.service.ts';
import TaskRepository from './tasks.repository.ts';

const route = express.Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

route.get('/tasks', taskController.getTasks.bind(taskController));

route.get('/tasks/:id', taskController.getTaskById.bind(taskController));

route.post('/tasks', taskController.createTask.bind(taskController));

route.put('/tasks/:id', taskController.updateTask.bind(taskController));

route.delete('/tasks/:id', taskController.deleteTask.bind(taskController));

export default route;