import { setupServer } from 'msw/node';
import { handlerGetUsers } from '../../../users/api/mocks/handlers';

export const server = setupServer(...handlerGetUsers);