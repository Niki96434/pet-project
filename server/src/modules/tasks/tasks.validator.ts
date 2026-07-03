import { isValidIdError, isValidTaskFields } from './customErrors.js';
import type TaskType from './types.ts';

export class TasksValidator {
    // переписать в zod или express-validatore
    static checkTaskId(id: number) {
        if (id > 0) {
            return true
        }
        throw new isValidIdError('ID is invalid', 400)
    }

    static isValidTaskFields(task: TaskType) {
        if (task.title.trim() === '' || task.title.length > 30 || task.title.length < 5) {
            throw new isValidTaskFields('Title empty or more 30', 400)
        }

        if (task.description.trim() === '') {
            throw new isValidTaskFields('Description empty', 400)
        }
    }

}