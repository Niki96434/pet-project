export const Categories = ['Health', 'Life', 'Work', 'Study', 'Misc'] as const;
export type CategoryType = typeof Categories[number];

export default interface TaskType {
    id: number;
    title: string;
    description?: string;
    deadlineDate: string;
    category: CategoryType;
}
