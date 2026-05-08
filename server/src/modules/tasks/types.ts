type CategoryType = 'Health' | 'Life' | 'Work' | 'Study' | 'Misc';

type status = 'not_completed' | 'in_process' | 'completed';

export default interface TaskType {
    id: number;
    title: string;
    description?: string;
    deadlineDate: string;
    category: CategoryType;
    progress_status: status;
}
