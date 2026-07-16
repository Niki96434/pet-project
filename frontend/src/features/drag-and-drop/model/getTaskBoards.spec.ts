import { mockTasks } from "../../../entities/tasks"
import { createExpectedBoards } from "./createExpectedBoards";
import { getTaskBoards } from "./getTaskBoards"

describe('get task boards', () => {

    const testData = [
        { description: 'should return [] if tasks array is empty', tasks: [], boards: createExpectedBoards() },
        { description: 'should return [] if tasks array is null', tasks: null, boards: createExpectedBoards() },
        { description: 'should return tasks by status', tasks: mockTasks, boards: createExpectedBoards([mockTasks[0], mockTasks[1]], [mockTasks[2]], []) },
    ];

    test.each(testData)('$description', ({ tasks, boards }) => {

        const taskBoards = getTaskBoards(tasks);

        expect(taskBoards).toEqual(boards);
    });
});
