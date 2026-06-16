import { http, HttpResponse } from 'msw';
import { mockUsers } from './users.mock';

export const handlerGetUsers = [http.get(`${import.meta.env.VITE_BASE_URL}/auth/users`, () => {
    return HttpResponse.json(mockUsers);
})];