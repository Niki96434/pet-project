import { useEffect, useMemo, useState } from "react";
import { TaskBoard } from "../../../../entities/tasks";
import { AddTaskForm } from '../../add-task-form/ui/AddTaskForm';
import { EditTaskForm } from "../../edit-task-form/ui/EditTaskForm";
import { useEditTaskStore, closeModal, handleEditModal } from "../../../../entities/tasks/model/store";
import './DragAndDrop.css';
import { useAllTasksQuery } from "../../../../entities/tasks/model/useAllTasksQuery";
import { type TaskType } from "../../../../entities/tasks";
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd';
import { useUpdateStatusTask } from '../../../../entities/tasks/model/useUpdateStatusTask';

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

    const { updateTaskMutation } = useUpdateStatusTask();

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

    const handleDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId, type } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        if (type === 'drop-tasks') {
            const previousBoard = boards.find((b) => b.id === Number(source.droppableId));

            if (!previousBoard) {
                console.log('прошлой доски нет');
                return;
            }

            const copyOfSourceItems = [...previousBoard.items];
            const [task] = copyOfSourceItems.splice(source.index, 1);

            const newBoards = boards.map((board) => {
                if (board.id === Number(source.droppableId)) {
                    return { ...board, items: copyOfSourceItems }
                }
                return board
            });

            let taskStatus: TaskType['status'];

            const currentBoard = boards.find((b) => b.id === Number(destination.droppableId));

            if (!currentBoard) {
                console.log('текущей доски нет');
                return;
            }
            const newItems = [...currentBoard.items];
            switch (destination.droppableId) {
                case '0': taskStatus = 'Not completed'; break;
                case '1': taskStatus = 'In process'; break;
                case '2': taskStatus = 'Completed'; break;
                default: taskStatus = task.status;
            }
            const newTask = { ...task, status: taskStatus, id: Number(draggableId) };

            const updatedBoards = newBoards.map((board) => {
                if (destination.droppableId === source.droppableId && board.id === Number(destination.droppableId)) {
                    board.items.splice(source.index, 1);
                    board.items.splice(destination.index, 0, newTask);
                    return board
                }
                if (board.id === Number(source.droppableId)) {
                    return { ...board, items: copyOfSourceItems }
                }
                if (board.id === Number(destination.droppableId)) {
                    newItems.splice(destination.index, 0, newTask);
                    return { ...board, items: newItems }
                }
                return board
            });

            setBoards(updatedBoards);

            updateTaskMutation.mutate({ id: draggableId, data: newTask });
        }
    }

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
