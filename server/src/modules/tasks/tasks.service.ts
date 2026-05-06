import type TaskType from "./types.ts";
import ITaskRepository from './tasks.repository.ts'

export interface ITaskService {
    getTasks(): TaskType[];
    getTaskById(id: number): TaskType | undefined;
    createTask(task: TaskType): TaskType;
    updateTask(id: number, task: TaskType): TaskType;
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
        const existedTask = this.taskRepository.getTaskById(id);
        if (!existedTask) {
            throw new Error(`task with ${id} not found`);
        }
        try {
            const updatedTask = this.taskRepository.updateTask(id, task);
            console.log(updatedTask);
            return updatedTask
        } catch (e) {
            throw e
        }
    }

    deleteTask(id: number) {
        const existedTask = this.taskRepository.getTaskById(id);
        if (!existedTask) {
            throw new Error('deleteTask function error')
        }
        this.taskRepository.deleteTask(id);
        return true
    }
}

export default TaskService