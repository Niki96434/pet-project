import { db } from '../app/db.js';
import type TaskType from './types.js';
import { DBError } from './customErrors.js';

function TaskRepository() {

    const getTasks = (user_id: number) => {
        try {
            const tasks = db.prepare('SELECT * FROM tasks WHERE user_id = ?').all(user_id) as TaskType[] | [];
            return tasks
        } catch {
            throw new DBError('error receiving tasks', 500);
        }
    }

    const getTask = (id: number, user_id: number) => {
        try {
            return db.prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?')
                .get(id, user_id) as TaskType;
        }
        catch {
            throw new DBError('error receiving task', 500);
        }
    }

    const createTask = (task: TaskType, user_id: number) => {
        try {
            return db.prepare('INSERT INTO tasks (title, description, category, deadlineDate, user_id) VALUES (?,?,?,?,?) RETURNING id, title, description, category, deadlineDate, user_id')
                .get(task.title, task.description, task.category, task.deadlineDate, user_id) as TaskType;
        } catch {
            throw new DBError('Error creating task', 500)
        }
    }

    const updateTask = (id: number, taskProperty: TaskType, user_id: number) => {
        try {
            return db.prepare('UPDATE tasks SET title = ?, description = ?, category = ?, deadlineDate = ?, status = ? WHERE id = ? AND user_id = ? RETURNING id, title, description, category, deadlineDate, status')
                .get(taskProperty.title, taskProperty.description, taskProperty.category, taskProperty.deadlineDate, taskProperty.status, id, user_id) as TaskType;
        } catch {
            throw new DBError('Error updating task', 500);
        }
    }

    const deleteTask = (id: number, user_id: number) => {
        try {
            return db.prepare('DELETE FROM tasks WHERE id = ? AND user_id = ?').run(id, user_id);
        } catch {
            throw new DBError('Error deleting task', 500);
        }
    }
    return { getTasks, getTask, createTask, updateTask, deleteTask }
}

export default TaskRepository

