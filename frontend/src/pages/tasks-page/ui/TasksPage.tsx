import { useState, useMemo } from "react";
import { TaskBoard } from "./../../../entities/tasks";
import { AddTaskForm } from '../../../features/tasks/add-task-form';
import { EditTaskForm } from "../../../features/tasks/edit-task-form";
import { useEditTaskStore, closeModal, handleEditModal } from "../../../entities/tasks/model/store";
import { Calendar } from "../../../shared/ui";
import './TasksPage.css';
import { useTasksByDay } from "../../../entities/tasks/lib/useTasksByDay";
import { useAllTasksQuery } from "../../../entities/tasks/model/useAllTasksQuery";
import { type TaskType } from "./../../../entities/tasks";
import { handleBoards, useDragAndDropStore } from "../../../entities/tasks/model/useDragAndDropStore";

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

    const setBoards = useDragAndDropStore(handleBoards);

    const boards = useMemo<BoardType[]>(
        () => {
            const safeTasks = tasks ?? [];
            const b = [
                {
                    id: 1, title: 'Todo', items: safeTasks.filter((task) => task.status === 'Not completed')
                },
                {
                    id: 2, title: 'In progress', items: safeTasks.filter((task) => task.status === 'In process')
                },
                {
                    id: 3, title: 'Done', items: safeTasks.filter((task) => task.status === 'Completed')
                },
            ];
            setBoards(b);
            return b
        }, [tasks, setBoards]);


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
                <div className="boards">
                    {boards.map((board) => {
                        return <TaskBoard key={board.id} board={board} children={board.title} tasks={board.items} handleModal={() => setOpenAddTaskModal(true)} />
                    })}
                </div>
            </div>
            {isOpenEditModal && <EditTaskForm closeEditModal={closeEditModal} />}
            {isOpenAddTaskModal && <AddTaskForm handleModal={() => setOpenAddTaskModal(false)} />}
        </div>
    )
}
