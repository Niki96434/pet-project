import express from 'express';
import TaskController from './tasks.controller.ts';
import TaskService from './tasks.service.ts';
import TaskRepository from './tasks.repository.ts';
import type { NextFunction, Request, Response } from 'express';
import { protectMiddleware } from '../auth/auth.middleware.ts';

const route = express.Router();

const repo = TaskRepository();
const taskService = TaskService({ repo });
const { getTasksByIDUser, getTaskById, createTask, updateTask, deleteTask } = TaskController({ taskService });

route.use(protectMiddleware);

route.get('/tasks', (req: Request, res: Response, next: NextFunction) => getTasksByIDUser(req, res, next));

route.get('/tasks/:id', (req: Request, res: Response, next: NextFunction) => getTaskById(req, res, next));

route.post('/tasks', (req: Request, res: Response, next: NextFunction) => createTask(req, res, next));

route.put('/tasks/:id', (req: Request, res: Response, next: NextFunction) => updateTask(req, res, next));

route.delete('/tasks/:id', (req: Request, res: Response, next: NextFunction) => deleteTask(req, res, next));

export default route;