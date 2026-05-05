import { db } from './db.ts';
import type Task from './types.ts';


class TaskRepository {

    static getTasks() {
        try {
            const tasks = db.prepare('SELECT * FROM tasks').all();
            return tasks
        } catch (e) {
            throw e
        }
    }

    static getTaskById(id: number) {
        const task = db.prepare('SELECT * FROM tasks WHERE id = ?')
            .get(Number(id));
        if (!task) {
            throw new Error('Task not found')
        }
        return task
    }

    static createTask(task: Task) {
        const postState = db.prepare('INSERT INTO tasks (title, description, category, deadlineDate) VALUES (?,?,?,?) RETURNING id, title, description, category, deadlineDate')
            .get(task.title, task.description, task.category, task.deadlineDate);
        if (!postState) {
            throw new Error('network error')
        }
        return postState
    }

    static updateTask(id: number, taskProperty: Task) {
        const updatedTask = db.prepare('UPDATE tasks SET title = ?, description = ?, category = ?, deadlineDate = ? WHERE id = ? RETURNING id, title, description, category, deadlineDate')
            .get(taskProperty.title, taskProperty.description, taskProperty.category, taskProperty.deadlineDate, Number(id));
        if (!updatedTask) {
            throw new Error('network error')
        }
        return updatedTask
    }

    static deleteTask(id: number) {
        const delState = db.prepare('DELETE FROM tasks WHERE id = ?');
        delState.run(Number(id));
        return true
    }
}

export default TaskRepository