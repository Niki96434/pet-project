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
        const tasks = this.taskRepository.getTasks();
        return tasks
    }

    getTaskById(id: number) {
        const task = this.taskRepository.getTaskById(id);
        return task
    }

    createTask(task: TaskType) {
        const newTask = this.taskRepository.createTask(task);
        return newTask
    }

    updateTask(id: number, task: TaskType) {
        const existedTask = this.taskRepository.getTaskById(id);
        if (!existedTask) {
            throw new isExistTaskError(`no task with ${id}`);
        }
        const updatedTask = this.taskRepository.updateTask(id, task);
        return updatedTask
    }

    deleteTask(id: number) {
        const existedTask = this.taskRepository.getTaskById(id);
        if (!existedTask) {
            throw new isExistTaskError(`no task with ${id}`);
        }
        this.taskRepository.deleteTask(id);
        return true
    }
}

export default TaskService