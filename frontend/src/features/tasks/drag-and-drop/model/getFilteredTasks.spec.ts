import { it, expect, describe } from 'vitest';
import { getFilteredTasks } from './getFilteredTasks';
import { mockData } from '../../../../entities/tasks';

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
    });
});
