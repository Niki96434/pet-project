import { useState } from "react";
import { TaskList } from "./../../../entities/tasks";
import { AddTaskForm } from '../../../features/tasks/add-task-form';
import { EditTaskForm } from "../../../features/tasks/edit-task-form";
import { useEditTaskStore } from "../../../entities/tasks/model/store";
import { Calendar } from "../../../shared/ui";
import './TasksPage.css';
import { useTasksByDay } from "../../../entities/tasks/lib/useTasksByDay";
import { BigCalendar } from "../../../widgets/big-calendar";
import { useAllTasksQuery } from "../../../entities/tasks/model/useAllTasksQuery";
import { filterTasksByDay } from "../../../entities/tasks/model/filterTasksByDay";

export default function TasksPage() {
    const [isOpenAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);
    const isOpenEditModal = useEditTaskStore((state) => state.isEditModalOpen);
    const closeEditModal = useEditTaskStore((state) => state.handleCloseModal);

    const { handleSelectDay, value } = useTasksByDay();
    const { tasks, status, error } = useAllTasksQuery();
    const filteredTasks = filterTasksByDay(tasks ?? [], value);

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
                <TaskList tasks={filteredTasks ?? []} handleModal={() => setOpenAddTaskModal(true)} />
            </div>
            <BigCalendar tasks={tasks ?? []} />
            {isOpenEditModal && <EditTaskForm closeEditModal={closeEditModal} />}
            {isOpenAddTaskModal && <AddTaskForm handleModal={() => setOpenAddTaskModal(false)} />}
        </div>
    )
}