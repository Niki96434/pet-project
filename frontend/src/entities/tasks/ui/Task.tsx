import './Task.css';
import type { TaskType } from '../model/types';
import CategoryBadge from './CategoryBadge';
import DropdownMenu from './DropdownMenu';
import { useMarkStatusQuery } from '../model/useMarkStatusTaskQuery';

interface TaskProps {
    task: TaskType
}

export default function Task({ task }: TaskProps) {

    const { changeCheckbox } = useMarkStatusQuery(task);

    return (
        <div className="task-card">
            <DropdownMenu id={task.id} />
            <div className='task-top'>
                <input onChange={changeCheckbox} className='task-checkbox' type='checkbox' />
                <p className='task-title'>{task.title}</p>
            </div>
            <div className='category-and-date'>
                <CategoryBadge category={task.category} />
                <div className='task-date'>{task.deadlineDate}</div>
            </div>
        </div>
    )
}