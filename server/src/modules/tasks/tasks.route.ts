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

route.get('/', getTasks);

route.get('/:id', getTask);

route.post('/', createTask);

route.put('/:id', updateTask);

route.delete('/:id', deleteTask);

export default route;