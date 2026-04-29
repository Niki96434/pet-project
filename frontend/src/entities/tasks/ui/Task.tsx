import './Task.css';
import type { TaskType } from '../model/types';
import CategoryBadge from './CategoryBadge';
import DropdownMenu from './DropdownMenu';

interface TaskProp extends TaskType {
    handleEditModal: () => void;
}

export default function Task({ id, title, category, deadlineDate, handleEditModal }: TaskProp) {

    return (
        <>
            <div className="task-card">
                <DropdownMenu id={id} handleEditModal={handleEditModal} />
                <div className='task-top'>
                    <input className='task-checkbox' type='checkbox' />
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