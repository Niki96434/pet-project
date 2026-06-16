import axios from "axios";
import { mockUsers } from "./users.mock";

describe('getUsers', () => {
    it('should response status 200 and all users', async () => {

        const response = await axios.get('/auth/users');

        expect(response.status).toBe(200);

        expect(response.data).toEqual(mockUsers);

    });
});