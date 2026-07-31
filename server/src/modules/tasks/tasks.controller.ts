import type { NextFunction, Response, Request } from "express";
import type ITaskService from "./tasks.service.ts";
import { TasksValidator } from "./tasks.validator.js";
import type TaskType from "./types.ts";

interface ITaskService {
  taskService: {
    getTasks(user_id: number): Promise<TaskType[]>;
    getTask(id: number, user_id: number): Promise<TaskType | undefined>;
    createTask(task: TaskType, user_id: number): Promise<TaskType>;
    updateTask(id: number, task: TaskType, user_id: number): Promise<TaskType>;
    deleteTask(id: number, user_id: number): Promise<TaskType>;
  };
}

function TaskController({ taskService }: ITaskService) {
  const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user?.id as number;

      const tasks = await taskService.getTasks(user_id);
      res.status(200).json(tasks);
    } catch (e) {
      next(e);
    }
  };

  const getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user?.id as number;
      const task_id = req.params["id"];

      TasksValidator.checkTaskId(Number(task_id));
      const task = await taskService.getTask(Number(task_id), Number(user_id));
      res.status(200).json(task);
    } catch (e) {
      next(e);
    }
  };

  const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const task = req.body;
      const user_id = req.user?.id as number;

      TasksValidator.isValidTaskFields(task);

      const newTask = await taskService.createTask(task, user_id);
      res.status(201).json(newTask);
    } catch (e) {
      next(e);
    }
  };

  const updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const task_id = req.params["id"];
      const task = req.body;

      const user_id = req.user?.id as number;

      TasksValidator.checkTaskId(Number(task_id));
      TasksValidator.isValidTaskFields(task);

      const updatedTask = await taskService.updateTask(
        Number(task_id),
        task,
        Number(user_id),
      );
      res.status(200).json(updatedTask);
    } catch (e) {
      next(e);
    }
  };

  const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const task_id = req.params["id"];

      const user_id = req.user?.id as number;

      TasksValidator.checkTaskId(Number(task_id));

      await taskService.deleteTask(Number(task_id), user_id);
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  };
  return { getTasks, getTask, createTask, updateTask, deleteTask };
}

export default TaskController;
