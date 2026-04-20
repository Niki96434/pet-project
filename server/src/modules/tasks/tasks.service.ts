import TaskRepository from "./tasks.repository.ts";
import type Task from "./types.ts";

class TaskService {

    static getAllTasks() {
        try {
            const tasks = TaskRepository.getAllTasks();
            return tasks
        } catch (e) {
            throw e
        }
    }

    static getTaskById(id: number) {
        try {
            const task = TaskRepository.getTaskById(id);
            return task
        } catch (e) {
            throw e
        }
    }

    static createTask(task: Task) {
        try {
            const createdTask = TaskRepository.createTask(task);
            return createdTask
        } catch (e) {
            throw e
        }
    }

    static updateTask(id: number, task: Task) {
        const existedTask = TaskRepository.getTaskById(id);
        if (!existedTask) {
            throw new Error(`task with ${id} not found`);
        }
        try {
            const updatedTask = TaskRepository.updateTask(id, task);
            console.log(updatedTask);
            return updatedTask
        } catch (e) {
            throw e
        }
    }

    static deleteTask(id: number) {
        const existedTask = TaskRepository.getTaskById(id);
        if (!existedTask) {
            throw new Error('deleteTask function error')
        }
        TaskRepository.deleteTask(id);
        return true
    }
}

export default TaskService