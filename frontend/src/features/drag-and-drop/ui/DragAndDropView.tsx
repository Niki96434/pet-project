import { TaskBoard } from '../../../entities/tasks/ui/TaskBoard';
import type { Board } from './DragAndDrop';
import styles from './DragAndDropView.module.css';
import { Droppable } from '@hello-pangea/dnd';

interface DragAndDropViewProps {
    boards: Board[];
    openAddModal: () => void;
}

export function DragAndDropView({ boards, openAddModal }: DragAndDropViewProps) {
    return (
        <div className={styles.content}>
            {boards.map((board) => {
                return (
                    <Droppable droppableId={String(board.id)} key={board.id} type="drop-tasks">
                        {(provided) => {
                            return (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <TaskBoard tasks={board.items} handleModal={openAddModal}>{board.title}</TaskBoard>
                                    {provided.placeholder}
                                </div>)
                        }}
                    </Droppable>
                )
            })}
        </div>
    )
}