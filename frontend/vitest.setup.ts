import { server } from './src/entities/tasks/api/mocks/node';
import { beforeAll, afterEach, afterAll } from 'vitest'
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());