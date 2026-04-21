export interface TaskProp {
    id: number;
    title: string;
    description?: string;
    deadlineDate: string;
    category: 'Health' | 'Life' | 'Work' | 'Study' | 'Misc';
}
