import { db } from './db.ts';
import type TaskType from './types.ts';

export interface ITaskRepository {
    getTasks(): TaskType[];
    getTaskById(id: number): TaskType | undefined;
    createTask(task: TaskType): TaskType;
    updateTask(id: number, task: TaskType): TaskType;
    deleteTask(id: number): boolean;
}

class TaskRepository implements ITaskRepository {

    getTasks() {
        try {
            const tasks = db.prepare('SELECT * FROM tasks').all() as TaskType[] | [];
            return tasks
        } catch (e) {
            throw e
        }
    }

    getTaskById(id: number) {
        try {
            const task = db.prepare('SELECT * FROM tasks WHERE id = ?')
                .get(Number(id)) as TaskType;
            return task
        } catch (e) {
            throw e
        }
    }

    createTask(task: TaskType) {
        try {
            const postState = db.prepare('INSERT INTO tasks (title, description, category, deadlineDate) VALUES (?,?,?,?) RETURNING id, title, description, category, deadlineDate')
                .get(task.title, task.description, task.category, task.deadlineDate) as TaskType;
            return postState
        } catch (e) {
            throw e
        }
    }

    updateTask(id: number, taskProperty: TaskType) {
        try {
            const updatedTask = db.prepare('UPDATE tasks SET title = ?, description = ?, category = ?, deadlineDate = ? WHERE id = ? RETURNING id, title, description, category, deadlineDate')
                .get(taskProperty.title, taskProperty.description, taskProperty.category, taskProperty.deadlineDate, Number(id)) as TaskType;
            return updatedTask
        } catch (e) {
            throw e
        }
    }

    deleteTask(id: number) {
        try {
            const delState = db.prepare('DELETE FROM tasks WHERE id = ?');
            delState.run(Number(id));
            return true
        } catch (e) {
            throw e
        }
    }
}

export default TaskRepository