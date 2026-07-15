import { type Task } from '../../../entities/tasks';

export const mockTasks: Task[] = [{
    id: 1,
    title: 'Покормить собачку',
    description: '',
    category: 'Life',
    deadline_date: '',
    status: 'Not completed',
    user_id: 1,
}, {
    id: 2,
    title: 'Помыть голову',
    description: '',
    category: 'Health',
    deadline_date: '',
    status: 'Not completed',
    user_id: 2,
}, {
    id: 3,
    title: 'Учиться юнит-тестированию',
    description: '',
    category: 'Study',
    deadline_date: '',
    status: 'In process',
    user_id: 3,
}
];