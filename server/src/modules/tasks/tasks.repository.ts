import { pool } from '../app/db.js';
import type TaskType from './types.js';
import { DBError } from './customErrors.js';

function TaskRepository() {

    const getTasks = async (user_id: number) => {
        try {
            const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [user_id]);
            const tasks = result.rows[0] as TaskType[] | [];
            return tasks
        } catch {
            throw new DBError('error receiving tasks', 500);
        }
    }

    const getTask = async (id: number, user_id: number) => {
        try {
            const result = await pool.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, user_id]);
            return result.rows[0] as TaskType
        }
        catch {
            throw new DBError('error receiving task', 500);
        }
    }

    const createTask = async (task: TaskType, user_id: number) => {
        try {
            const query = 'INSERT INTO tasks (title, description, category, deadlineDate, user_id) VALUES ($1,$2,$3,$4,$5) RETURNING id, title, description, category, deadlineDate, user_id';
            const result = await pool.query(query,
                [task.title, task.description, task.category, task.deadlineDate, user_id]);
            return result.rows[0] as TaskType
        } catch {
            throw new DBError('Error creating task', 500)
        }
    }

    const updateTask = async (id: number, taskProperty: TaskType, user_id: number) => {
        try {
            const query = 'UPDATE tasks SET title = $1, description = $2, category = $3, deadlineDate = $4, status = $5 WHERE id = $6 AND user_id = $7 RETURNING id, title, description, category, deadlineDate, status';
            return await pool.query(query,
                [taskProperty.title, taskProperty.description, taskProperty.category, taskProperty.deadlineDate, taskProperty.status, id, user_id]);
        } catch {
            throw new DBError('Error updating task', 500);
        }
    }

    const deleteTask = async (task_id: number, user_id: number) => {
        try {
            const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [task_id, user_id]);
            return result.rows[0];
        } catch {
            throw new DBError('Error deleting task', 500);
        }
    }
    return { getTasks, getTask, createTask, updateTask, deleteTask }
}

export default TaskRepository

