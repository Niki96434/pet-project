import { AddTaskForm } from '../../add-task-form/ui/AddTaskForm.tsx';
import { EditTaskForm } from "../../edit-task-form/ui/EditTaskForm.tsx";
import { type Task } from "../../../entities/tasks/index.ts";
import { DragDropContext } from '@hello-pangea/dnd';
import styles from './DragAndDrop.module.css';
import { TaskBoard } from '../../../entities/tasks/ui/TaskBoard';
import { Droppable } from '@hello-pangea/dnd';
import { useKanbanBoard } from '../model/useKanbanBoard.ts';

export interface Board {
    id: number;
    title: string;
    items: Task[];
}

export function DragAndDrop() {

    const {
        openAddModal,
        closeAllModal,
        isEditModalOpen,
        isAddModalOpen,
        closeEditModal,
        closeAddModal,
        status,
        error,
        boards,
        handleDragEnd
    } = useKanbanBoard();

    if (status === 'pending') {
        return <span>Загрузка задач...</span>
    }

    if (status === 'error') {
        return <span>Ошибка: {error?.message} </span>
    }

    return (
        <div onClick={closeAllModal}>
            <DragDropContext onDragEnd={handleDragEnd}>
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
            </DragDropContext>

            {isEditModalOpen && <EditTaskForm closeEditModal={closeEditModal} />}
            {isAddModalOpen && <AddTaskForm handleModal={closeAddModal} />}
        </div>
    )
}
