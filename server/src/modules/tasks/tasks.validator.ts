import { isValidIdError, isValidTaskFields } from './customErrors.ts';
import type TaskType from './types.ts';

export class TasksValidator {

    static checkTaskId(id: number) {
        if (id > 0) {
            return true
        }
        throw new isValidIdError('ID is invalid')
    }

    static isValidTaskFields(task: TaskType) {
        if (task.title.trim() === '' || task.title.length > 30 && task.title.length < 5) {
            throw new isValidTaskFields('Title empty or more 30')
        }

    }

}