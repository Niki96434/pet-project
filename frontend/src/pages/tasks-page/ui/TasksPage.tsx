import { DragAndDrop } from '../../../features/drag-and-drop/ui/DragAndDrop';
import './TasksPage.css';

export function TasksPage() {
    return (
        <div className='task-page-container'>
            <DragAndDrop />
        </div>
    )
}