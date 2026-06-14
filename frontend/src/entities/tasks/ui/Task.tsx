import './Task.css';
import type { Task } from '../model/types';
import CategoryBadge from './CategoryBadge';
import DropdownMenu from './DropdownMenu';

interface TaskProps {
    task: Task;
}

export default function Task({ task }: TaskProps) {

    return (
        <div className="task-card" draggable='true'>
            <DropdownMenu id={task.id} />
            <div className='task-top'>
                <p className='task-title'>{task.title}</p>
            </div>
            <div className='category-and-date'>
                <CategoryBadge category={task.category} />
                <div className='task-date'>{task.deadlineDate}</div>
            </div>
        </div>
    )
}