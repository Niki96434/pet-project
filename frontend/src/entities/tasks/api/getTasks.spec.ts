import { vi, it, describe, expect, afterEach } from 'vitest';
import axios from 'axios';
import { getTasks } from './getTasks';
import type { TaskProp } from '../model/types';
vi.mock('axios');

describe('check getTasks function', () => {
    let response: TaskProp[] | undefined[];
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return resolved promise', async () => {
        response = [{ id: 3, title: "text", description: "" },
        { id: 4, title: "text", description: "fjehjfhe" },
        { id: 7, title: "text", description: "bjhj" },
        { id: 8, title: "text", description: "bjhj" }]

        vi.mocked(axios.get).mockResolvedValue(response);
        const data = await getTasks();
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(data).toEqual(response);
        expect(axios.get).toMatchSnapshot();
    });

    it('should return null', async () => {
        response = null;
        vi.mocked(axios.get).mockRejectedValue(response);
        const data = await getTasks();
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(data).toEqual(response);
    });
});
