import { useEffect, useMemo, useState } from "react";
import { TaskBoard } from "../../../../entities/tasks";
import { AddTaskForm } from '../../add-task-form/ui/AddTaskForm';
import { EditTaskForm } from "../../edit-task-form/ui/EditTaskForm";
import { useEditTaskStore, closeModal, handleEditModal } from "../../../../entities/tasks/model/store";
import './DragAndDrop.css';
import { useAllTasksQuery } from "../../../../entities/tasks/model/useAllTasksQuery";
import { type TaskType } from "../../../../entities/tasks";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useDragTasks } from "../model/useDragTasks";

export interface BoardType {
    id: number;
    title: string;
    items: TaskType[];
}

export default function DragAndDrop() {
    const [isOpenAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);
    const isOpenEditModal = useEditTaskStore(handleEditModal);
    const closeEditModal = useEditTaskStore(closeModal);

    const { status, error, tasks } = useAllTasksQuery();

    const initialBoards = useMemo(() => {
        return tasks ? [
            {
                id: 0, title: 'Todo', items: tasks.filter((task) => task.status === 'Not completed')
            },
            {
                id: 1, title: 'In progress', items: tasks.filter((task) => task.status === 'In process')
            },
            {
                id: 2, title: 'Done', items: tasks.filter((task) => task.status === 'Completed')
            },
        ] : []
    }, [tasks]);

    const [boards, setBoards] = useState<BoardType[]>(initialBoards);

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
                                                <TaskBoard key={board.id + 1} tasks={board.items} handleModal={() => setOpenAddTaskModal(true)}>{board.title}</TaskBoard>
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
