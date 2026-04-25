import './Task.css';
import type { FormDataType } from '../model/types';
import CategoryBadge from './CategoryBadge';

export default function Task({ title, category, deadlineDate }: FormDataType) {
    return (
        <div className="task-card">
            <div className='task-top'>
                <input className='task-checkbox' type='checkbox' />
                <p className='task-title'>{title}</p>
            </div>
            <div className='category-and-date'>
                <CategoryBadge category={category} />
                <div className='task-date'>{deadlineDate}</div>
            </div>
        </div>
    )
}