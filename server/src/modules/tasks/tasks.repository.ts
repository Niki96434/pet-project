import { db } from '../app/db.ts';
import type TaskType from './types/types.ts';
import { DBError } from './customErrors.ts';

function TaskRepository() {

    const getTasks = (user_id: number) => {
        try {
            const tasks = db.prepare('SELECT * FROM tasks WHERE user_id = ?').get(user_id) as TaskType[] | [];
            return tasks
        } catch {
            throw new DBError('Ошибка получения всех задач')
        }
    }

    const getTaskById = (id: number, user_id: number) => {
        try {
            const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?')
                .get(id, user_id) as TaskType;
            return task
        } catch {
            throw new DBError('Ошибка получения задачи по id')
        }
    }

    const createTask = (task: TaskType, user_id: number) => {
        try {
            const postState = db.prepare('INSERT INTO tasks (title, description, category, deadlineDate, user_id) VALUES (?,?,?,?) RETURNING id, title, description, category, deadlineDate')
                .get(task.title, task.description, task.category, task.deadlineDate, user_id) as TaskType;
            return postState
        } catch {
            throw new DBError('Ошибка создания задачи')
        }
    }

    const updateTask = (id: number, taskProperty: TaskType, user_id: number) => {
        try {
            const updatedTask = db.prepare('UPDATE tasks SET title = ?, description = ?, category = ?, deadlineDate = ?, status = ? WHERE id = ? AND user_id = ? RETURNING id, title, description, category, deadlineDate, status')
                .get(taskProperty.title, taskProperty.description, taskProperty.category, taskProperty.deadlineDate, taskProperty.status, id, user_id) as TaskType;
            return updatedTask
        } catch {
            throw new DBError('Ошибка обновления задачи');
        }
    }

    const deleteTask = (id: number, user_id: number) => {
        try {
            const delState = db.prepare('DELETE FROM tasks WHERE id = ? AND user_id = ?');
            delState.run(id, user_id);
            return true
        } catch (e) {
            throw new DBError('Ошибка удаления задачи');
        }
    }
    return { getTasks, getTaskById, createTask, updateTask, deleteTask }
}

export default TaskRepository

