import { db } from './db.ts';
import type Task from './types.ts';


class TaskRepository {

    static getAllTasks() {
        const tasks = db.prepare('SELECT * FROM tasks').all();
        if (!tasks) {
            throw new Error('No tasks found')
        }
        return tasks
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
        const postState = db.prepare('INSERT INTO tasks (title, description) VALUES (?,?) RETURNING id, title, description')
            .get(task.title, task.description);
        if (!postState) {
            throw new Error('network error')
        }
        return postState
    }

    static updateTask(id: number, taskProperty: Task) {
        const updatedTask = db.prepare('UPDATE tasks SET title = ?, description = ? WHERE id = ? RETURNING id, title, description')
            .get(taskProperty.title, taskProperty.description, Number(id));
        console.log(updatedTask);
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