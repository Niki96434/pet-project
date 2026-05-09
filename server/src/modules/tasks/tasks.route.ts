import express from 'express';
import TaskController from './tasks.controller.ts';
import TaskService from './tasks.service.ts';
import TaskRepository from './tasks.repository.ts';

const route = express.Router();

const repo = TaskRepository();
const taskService = TaskService({ repo });
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = TaskController({ taskService });

route.get('/tasks', getTasks);

route.get('/tasks/:id', getTaskById);

route.post('/tasks', createTask);

route.put('/tasks/:id', updateTask);

route.delete('/tasks/:id', deleteTask);

export default route;