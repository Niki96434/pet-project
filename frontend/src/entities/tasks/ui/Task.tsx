import './Task.css';
import type { TaskType } from '../model/types';
import CategoryBadge from './CategoryBadge';
import DropdownMenu from './DropdownMenu';

export default function Task({ id, title, category, deadlineDate, status }: TaskType) {

    return (
        <>
            <div className="task-card">
                <DropdownMenu id={id} />
                <div className='task-top'>
                    <input checked={status === 'Completed' ? true : false} className='task-checkbox' type='checkbox' />
                    <p className='task-title'>{title}</p>
                </div>
                <div className='category-and-date'>
                    <CategoryBadge category={category} />
                    <div className='task-date'>{deadlineDate}</div>
                </div>
            </div>
        </>
    )
}