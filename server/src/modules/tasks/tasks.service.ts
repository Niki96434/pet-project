import type TaskType from "./types.ts";
import ITaskRepository from './tasks.repository.ts'
import { isExistTaskError } from "./customErrors.ts";

export interface ITaskService {
    getTasks(): TaskType[];
    getTaskById(id: number): TaskType | undefined;
    createTask(task: TaskType): TaskType;
    updateTask(id: number, task: TaskType): TaskType | undefined;
    deleteTask(id: number): boolean;
}

class TaskService implements ITaskService {

    private taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository
    }

    getTasks() {
        try {
            const tasks = this.taskRepository.getTasks();
            return tasks
        } catch (e) {
            throw e
        }
    }

    getTaskById(id: number) {
        try {
            const task = this.taskRepository.getTaskById(id);
            return task
        } catch (e) {
            throw e
        }
    }

    createTask(task: TaskType) {
        try {
            const newTask = this.taskRepository.createTask(task);
            return newTask
        } catch (e) {
            throw e
        }
    }

    updateTask(id: number, task: TaskType) {
        try {
            const existedTask = this.taskRepository.getTaskById(id);
            if (!existedTask) {
                throw new isExistTaskError(`no task with ${id}`);
            }
            const updatedTask = this.taskRepository.updateTask(id, task);
            return updatedTask

        } catch (e) {
            throw e
        }
    }

    deleteTask(id: number) {
        try {
            const existedTask = this.taskRepository.getTaskById(id);
            if (!existedTask) {
                throw new isExistTaskError(`no task with ${id}`);
            }
            this.taskRepository.deleteTask(id);
            return true
        } catch (e) {
            throw e
        }
    }
}

export default TaskService