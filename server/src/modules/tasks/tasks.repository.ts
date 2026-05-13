import { db } from './db.ts';
import type TaskType from './types.ts';
import { DBError } from './customErrors.ts';

function TaskRepository() {

    const getTasks = () => {
        try {
            const tasks = db.prepare('SELECT * FROM tasks').all() as TaskType[] | [];
            return tasks
        } catch {
            throw new DBError('Ошибка получения всех задач')
        }
    }

    const getTaskById = (id: number) => {
        try {
            const task = db.prepare('SELECT * FROM tasks WHERE id = ?')
                .get(Number(id)) as TaskType;
            return task
        } catch {
            throw new DBError('Ошибка получения задачи по id')
        }
    }

    const createTask = (task: TaskType) => {
        try {
            const postState = db.prepare('INSERT INTO tasks (title, description, category, deadlineDate) VALUES (?,?,?,?) RETURNING id, title, description, category, deadlineDate')
                .get(task.title, task.description, task.category, task.deadlineDate) as TaskType;
            return postState
        } catch {
            throw new DBError('Ошибка создания задачи')
        }
    }

    const updateTask = (id: number, taskProperty: TaskType) => {
        try {
            const updatedTask = db.prepare('UPDATE tasks SET title = ?, description = ?, category = ?, deadlineDate = ?, status = ? WHERE id = ? RETURNING id, title, description, category, deadlineDate, status')
                .get(taskProperty.title, taskProperty.description, taskProperty.category, taskProperty.deadlineDate, taskProperty.status, Number(id)) as TaskType;
            return updatedTask
        } catch {
            throw new DBError('Ошибка обновления задачи');
        }
    }

    const deleteTask = (id: number) => {
        try {
            const delState = db.prepare('DELETE FROM tasks WHERE id = ?');
            delState.run(id);
            return true
        } catch (e) {
            throw new DBError('Ошибка удаления задачи');
        }
    }
    return { getTasks, getTaskById, createTask, updateTask, deleteTask }
}

export default TaskRepository

