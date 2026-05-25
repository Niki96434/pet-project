import { useEffect, useMemo, useState } from "react";
import { TaskBoard } from "./../../../entities/tasks";
import { AddTaskForm } from '../../../features/tasks/add-task-form';
import { EditTaskForm } from "../../../features/tasks/edit-task-form";
import { useEditTaskStore, closeModal, handleEditModal } from "../../../entities/tasks/model/store";
import { Calendar } from "../../../shared/ui";
import './TasksPage.css';
import { useTasksByDay } from "../../../entities/tasks/lib/useTasksByDay";
import { useAllTasksQuery } from "../../../entities/tasks/model/useAllTasksQuery";
import { type TaskType } from "./../../../entities/tasks";
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd';
import { useUpdateStatusTask } from './../../../entities/tasks/model/useUpdateStatusTask';

export interface BoardType {
    id: number;
    title: string;
    items: TaskType[];
}

export default function TasksPage() {
    const [isOpenAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);
    const isOpenEditModal = useEditTaskStore(handleEditModal);
    const closeEditModal = useEditTaskStore(closeModal);

    const { handleSelectDay, value } = useTasksByDay();
    const { status, error, tasks } = useAllTasksQuery();

    const { updateTaskMutation } = useUpdateStatusTask();
    const [boards, setBoards] = useState<BoardType[]>([]);

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

    useEffect(() => {
        const loadBoards = () => {
            setBoards(initialBoards);
        }
        loadBoards();
    }, [initialBoards]);

    const handleDragEnd = async (result: DropResult) => {
        let movedTask: TaskType;
        const { destination, source, draggableId, type } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        if (type === 'drop-tasks') {
            const boardWithDeletedTask = boards.map((board: BoardType) => {
                if (board.id === Number(source.droppableId)) {
                    const copyOfBoardItems = [...board.items];
                    const [task] = copyOfBoardItems.splice(source.index, 1);
                    movedTask = task;
                    return {
                        ...board,
                        items: copyOfBoardItems
                    }
                } else {
                    return board
                }
            });

            const updatedTodos = boardWithDeletedTask.map((board: BoardType) => {
                let taskStatus: TaskType['status'];
                if (board.id === Number(destination.droppableId)) {
                    const newItems = [...board.items];
                    console.log(destination.droppableId);
                    switch (destination.droppableId) {
                        case '0':
                            taskStatus = 'Not completed';
                            break;
                        case '1':
                            taskStatus = 'In process';
                            break;
                        case '2':
                            taskStatus = 'Completed';
                            break;
                        default:
                            taskStatus = movedTask ? movedTask.status : 'Not completed';
                    }
                    const newTask = { ...movedTask, status: taskStatus, id: Number(draggableId) };
                    newItems.splice(destination.index, 0, newTask);
                    updateTaskMutation.mutate({ id: draggableId, data: newTask });
                    return {
                        ...board,
                        items: newItems
                    }
                } else {
                    return board
                }
            });
            setBoards(updatedTodos);
            console.log(`новая колонка - ${destination.droppableId}, индекс новой карточки - ${destination.index}`);
            console.log(`исходная колонка - ${source.droppableId}, индекс исходной карточки - ${source.index}`);
        }
    }

    const closeAllModal = () => {
        if (isOpenAddTaskModal) {
            setOpenAddTaskModal(false);
        } else if (isOpenEditModal) {
            closeEditModal();
        }
    }

    if (status === 'pending') {
        return <span>Загрузка...</span>
    }

    if (status === 'error') {
        return <span>Ошибка: {error?.message}</span>
    }

    return (
        <div className='todos-page' onClick={closeAllModal}>
            <div className="list-and-calendar">
                <Calendar value={value} onValueChange={handleSelectDay} />
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="boards">
                        {boards.map((board) => {
                            return (
                                <Droppable droppableId={String(board.id)} key={board.id} type="drop-tasks">
                                    {(provided) => {
                                        return (
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                <TaskBoard key={board.id} children={board.title} tasks={board.items} handleModal={() => setOpenAddTaskModal(true)} />
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
