import './Task.css';
import type { TaskProp } from './../model/task';
import { useState } from "react";
import CategoryBadge from './CategoryBadge';

export default function Task({ title, category, deadlineDate }: TaskProp) {
    const [isActive, setActive] = useState<boolean>(false);
    const textDecoration = isActive ? 'line-through' : 'none';
    const textDecorationColor = isActive ? '#fd71b05d' : '';
    const color = isActive ? '#FD71AF' : 'black';
    return (
        <div className="task-card">
            <div className='task-top'>
                <input checked={isActive} onChange={() => setActive(!isActive)} className='task-checkbox' type='checkbox' />
                <p className='task-title' style={{ color: color, textDecoration: textDecoration, textDecorationColor: textDecorationColor }}>{title}</p>
            </div>
            <div className='category-and-date'>
                <CategoryBadge category={category} />
                <div className='task-date'>{deadlineDate}</div>
            </div>
        </div>
    )
}