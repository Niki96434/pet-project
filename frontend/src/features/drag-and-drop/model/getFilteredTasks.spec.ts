import { getFilteredTasks } from './getFilteredTasks';
import { mockTasks, type Task } from './../../../entities/tasks';

interface TestDataType {
    tasks: Task[] | null,
    status: Task['status'],
    filteredTasks: Task[]
}

describe('get filtered tasks by status', () => {
    const testData: TestDataType[] = [
        { tasks: [], status: 'Not completed', filteredTasks: [] },
        { tasks: mockTasks, status: 'Completed', filteredTasks: [] },
        { tasks: mockTasks, status: 'Not completed', filteredTasks: [mockTasks[0], mockTasks[1]] },
        { tasks: null, status: 'Not completed', filteredTasks: [] },
    ];

    test.each(testData)('getFilteredTasks($tasks, $status) -> $filteredTasks', ({ tasks, status, filteredTasks }: TestDataType) => {

        const data = getFilteredTasks(tasks, status);

        expect(data).toEqual(filteredTasks);
    });
});
