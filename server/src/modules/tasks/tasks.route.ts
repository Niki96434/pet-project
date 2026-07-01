import express from 'express';
import TaskController from './tasks.controller.js';
import TaskService from './tasks.service.js';
import TaskRepository from './tasks.repository.js';
import { checkAuth, checkUserData } from '../auth/auth.middleware.js';

const route = express.Router();

const repo = TaskRepository();
const taskService = TaskService({ repo });
const { getTasks, getTask, createTask, updateTask, deleteTask } = TaskController({ taskService });

route.use(checkAuth);
route.use(checkUserData);

route.get('/tasks', getTasks);

route.get('/tasks/:id', getTask);

route.post('/tasks', createTask);

route.put('/tasks/:id', updateTask);

route.delete('/tasks/:id', deleteTask);

export default route;