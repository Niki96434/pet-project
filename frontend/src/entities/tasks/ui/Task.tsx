import './Task.css';
import type { TaskProp } from './../model/task';
import { useState } from "react";

export default function Task({ title }: TaskProp) {
    const [isActive, setActive] = useState<boolean>(false);
    const lineThroughDecoration = isActive ? 'line-through' : 'none';
    const lineColor = isActive ? '#fd71b05d' : '';
    const color = isActive ? '#FD71AF' : 'black';
    return (
        <div className="task-card">
            <div className='task-top'>
                <input checked={isActive} onChange={() => setActive(!isActive)} className='task-checkbox' type='checkbox' />
                <p className='task-title' style={{ color: color, textDecoration: lineThroughDecoration, textDecorationColor: lineColor }}>{title}</p>
            </div>
            <div className='category-and-date'>
                Created at
            </div>
        </div>
    )
}