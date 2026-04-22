export type Category = 'Health' | 'Life' | 'Work' | 'Study' | 'Misc';

export interface Task {
    id: number;
    title: string;
    description?: string;
    deadlineDate: string;
    category: Category;
}
