import { useEffect, useMemo, useState } from "react";
import { TaskBoard } from "../../../../entities/tasks";
import { AddTaskForm } from '../../add-task-form/ui/AddTaskForm';
import { EditTaskForm } from "../../edit-task-form/ui/EditTaskForm";
import { useEditTaskStore, closeModal, handleEditModal } from "../../../../entities/tasks/model/store";
import './DragAndDrop.css';
import { useGetTasks } from "../../../../entities/tasks/model/useGetTasks";
import { type Task } from "../../../../entities/tasks";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useDragTasks } from "../model/useDragTasks";
import { getBoardsFromTasks } from "../model/getBoardsFromTasks";

export interface Board {
    id: number;
    title: string;
    items: Task[];
}

export function DragAndDrop() {
    const [isOpenAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false); // вынести в zustand вместе с useEditTaskStore
    const isOpenEditModal = useEditTaskStore(handleEditModal);
    const closeEditModal = useEditTaskStore(closeModal);

    const { status, error, tasks } = useGetTasks();

    const initialBoards = useMemo(() => getBoardsFromTasks(tasks), [tasks]);

    const [boards, setBoards] = useState<Board[]>(initialBoards);

    useEffect(() => {
        const loadBoards = () => {
            setBoards(initialBoards);
        }
        loadBoards();
    }, [initialBoards]);

    const handleDragEnd = useDragTasks({ boards, setBoards });

    const closeAllModal = () => {
        if (isOpenAddTaskModal) {
            setOpenAddTaskModal(false);
        } else if (isOpenEditModal) {
            closeEditModal();
        }
    }

    if (status === 'error') {
        return <span>Ошибка: {error?.message}</span>
    }

    return (
        <div className='todos-page' onClick={closeAllModal}>
            <div className="list">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="boards">
                        {boards.map((board) => {
                            return (
                                <Droppable droppableId={String(board.id)} key={board.id} type="drop-tasks">
                                    {(provided) => {
                                        return (
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                <TaskBoard key={board.id} tasks={board.items} handleModal={() => setOpenAddTaskModal(true)}>{board.title}</TaskBoard>
                                                {provided.placeholder}
                                            </div>)
                                    }}
                                </Droppable>
                            )
                        })}
                    </div>
                </DragDropContext>
            </div>
            {isOpenEditModal && <EditTaskForm closeEditModal={closeEditModal} />}
            {isOpenAddTaskModal && <AddTaskForm handleModal={() => setOpenAddTaskModal(false)} />}
        </div>
    )
}
