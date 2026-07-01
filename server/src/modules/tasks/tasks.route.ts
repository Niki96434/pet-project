import express from 'express';
import TaskController from './tasks.controller.ts';
import TaskService from './tasks.service.ts';
import TaskRepository from './tasks.repository.ts';
import { checkAuth, checkUserData } from '../auth/auth.middleware.ts';

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