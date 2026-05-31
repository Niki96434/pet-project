import { UserEntity } from "../../jwt-auth/types";

type CategoryType = 'Health' | 'Life' | 'Work' | 'Study' | 'Misc';

type status = 'Not completed' | 'In process' | 'Completed';

export default interface TaskType {
    id: number;
    title: string;
    description?: string;
    deadlineDate: string;
    category: CategoryType;
    status: status;
}

interface IUser {
    user: UserEntity;
}

interface NewRequest extends Request, IUser { }
