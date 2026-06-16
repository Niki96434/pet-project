import { type Task } from '../../../../entities/tasks';

export const mockData: Task[] = [{
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