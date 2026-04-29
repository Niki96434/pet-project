export const Category = ['Health', 'Life', 'Work', 'Study', 'Misc'] as const;
export type CategoryType = typeof Category[number];

export interface TaskType {
    id: number;
    title: string;
    description?: string;
    deadlineDate: string;
    category: CategoryType;
}

export type menuActionType = 'edit' | 'del' | '';

export interface CreateTaskDto {
    title: string;
    description?: string;
    deadlineDate: string;
    category: CategoryType;
}

export interface UpdateTaskDto {
    title?: string;
    description?: string;
    deadlineDate?: string;
    category?: CategoryType;
}

export interface TaskListDto {
    data: {
        data: TaskType[];
    }
}