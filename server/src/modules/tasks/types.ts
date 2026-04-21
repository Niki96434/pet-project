export default interface Task {
    id: number;
    title: string;
    description?: string;
    deadlineDate: string;
    category: 'Health' | 'Life' | 'Work' | 'Study' | 'Misc';
}

