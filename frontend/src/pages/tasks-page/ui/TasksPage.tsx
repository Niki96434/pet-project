import { useState } from "react";
import { TaskList } from "./../../../entities/tasks";
import { AddTaskForm } from '../../../entities/tasks';
import { EditTaskForm } from "../../../entities/tasks/ui/EditTaskForm";
import { useEditTaskStore } from "../../../entities/tasks/model/store";
import { Calendar } from "../../../shared";
import './TasksPage.css';
import { useTasksByDay } from "../../../entities/tasks/model/hooks/useTasksByDay";
import { useTasksQuery } from "../../../entities/tasks/model/hooks/useTasksQuery";

export default function TasksPage() {
    const [isOpenAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);
    const isOpenEditModal = useEditTaskStore((state) => state.isEditModalOpen);
    const closeEditModal = useEditTaskStore((state) => state.handleCloseModal);

    const { handleSelectDay, value } = useTasksByDay();
    const { tasks, status, error } = useTasksQuery(`${value[0].day > 10 ? value[0].day : '0' + value[0].day}.${value[0].month > 10 ? value[0].month : '0' + value[0].month}.${value[0].year}`);

    if (status === 'pending') {
        return <span>Загрузка...</span>
    }

    if (status === 'error') {
        return <span>Ошибка: {error?.message}</span>
    }

    const closeAllModal = () => {
        if (isOpenAddTaskModal) {
            setOpenAddTaskModal(false);
        } else if (isOpenEditModal) {
            closeEditModal();
        }
    }

    return (
        <div className='todos-page' onClick={closeAllModal}>
            <div className="list-and-calendar">
                <Calendar value={value} onValueChange={handleSelectDay} />
                <TaskList tasks={tasks ?? []} handleModal={() => setOpenAddTaskModal(true)} />
            </div>
            {isOpenEditModal && <EditTaskForm closeEditModal={closeEditModal} />}
            {isOpenAddTaskModal && <AddTaskForm handleModal={() => setOpenAddTaskModal(false)} />}
        </div>
    )
}