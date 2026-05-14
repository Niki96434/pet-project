export const Categories = ['Health', 'Life', 'Work', 'Study', 'Misc'] as const;
export type CategoryType = typeof Categories[number];

export const Status = ['Not completed', 'In process', 'Completed'] as const;

export type statusType = typeof Status[number];

export interface TaskType {
    id: number;
    title: string;
    description?: string;
    deadlineDate: string;
    category: CategoryType;
    status: statusType;
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
    status?: statusType;
}

export interface TaskListDto {
    data: {
        data: TaskType[];
    }
}