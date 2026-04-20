import './Task.css';
import type { TaskProp } from './../model/task';

export default function Task({ id, title }: TaskProp) {
    return (
        <div className="task-card">
            <p>0{id}</p>
            <p>{title}</p>
            <input className='task-checkbox' type='checkbox' />
        </div>
    )
}