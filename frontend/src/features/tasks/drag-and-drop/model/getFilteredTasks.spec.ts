import { it, expect, describe } from 'vitest';
// import { statuses } from '../../../../entities/tasks/model/types';
import { getFilteredTasks } from './getFilteredTasks';
import { type Task } from '../../../../entities/tasks';

const mockData: Task[] = [{
    id: 1,
    title: 'покормить собачку',
    description: '',
    category: 'Life',
    deadlineDate: '',
    status: 'Not completed',
    user_id: 1,
}, {
    id: 2,
    title: 'Помыть голову',
    description: '',
    category: 'Health',
    deadlineDate: '',
    status: 'Not completed',
    user_id: 2,
}, {
    id: 3,
    title: 'Учиться юнит-тестированию',
    description: '',
    category: 'Study',
    deadlineDate: '',
    status: 'In process',
    user_id: 3,
}
];

describe('filtered tasks', () => {

    it('should return [] if task list is empty', () => {
        expect(getFilteredTasks([], 'Not completed')).toHaveLength(0);
    });

    it('should return 2 task when status is "Not completed"', () => {
        const res = getFilteredTasks(mockData, 'Not completed');
        expect(res).toHaveLength(2);
    });

    it('should return 0 tasks if no tasks match the status', () => {
        const res = getFilteredTasks(mockData, 'Completed');
        expect(res).toHaveLength(0);
    })
});