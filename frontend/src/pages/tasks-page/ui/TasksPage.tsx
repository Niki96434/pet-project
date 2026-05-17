import { useState } from "react";
import { TaskList } from "./../../../entities/tasks";
import { AddTaskForm } from '../../../features/tasks/add-task-form';
import { EditTaskForm } from "../../../features/tasks/edit-task-form";
import { useEditTaskStore } from "../../../entities/tasks/model/store";
import { Calendar } from "../../../shared/ui";
import './TasksPage.css';
import { useTasksByDay } from "../../../entities/tasks/lib/useTasksByDay";
import { useAllTasksQuery } from "../../../entities/tasks/model/useAllTasksQuery";
import { filterTasksByDay } from "../../../entities/tasks/model/filterTasksByDay";
import { useGetMessages } from "../../../entities/messages/model/useGetMessages";
import MessagesTable from "../../../entities/messages/ui/MessagesTable";
import { EmailButton } from "../../../shared/ui/EmailButton";

export default function TasksPage() {
    const [isOpenAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);

    const isOpenEditModal = useEditTaskStore((state) => state.isEditModalOpen);
    const closeEditModal = useEditTaskStore((state) => state.handleCloseModal);

    const { handleSelectDay, value } = useTasksByDay();
    const { tasks, status, error } = useAllTasksQuery();

    const filteredTasks = filterTasksByDay(tasks ?? [], value);

    const { isOpenLogin, login, msgs } = useGetMessages();

    if (status === 'pending') {
        return <span>Загрузка...</span>
    }

    if (status === 'error') {
        return <span>Ошибка: {error?.message}</span>
    }

    const closeAllModal = () => isOpenAddTaskModal === true ? setOpenAddTaskModal(false) : isOpenEditModal === true ? closeEditModal() : null;

    return (
        <div className='todos-page' onClick={closeAllModal}>
            <div className="list-and-calendar">
                <Calendar value={value} onValueChange={handleSelectDay} />
                <TaskList tasks={filteredTasks ?? []} handleModal={() => setOpenAddTaskModal(true)} />
            </div>
            {isOpenLogin &&
                <EmailButton handleClick={() => login()} />}
            {msgs ? <MessagesTable messages={msgs} /> : null}
            {isOpenEditModal && <EditTaskForm closeEditModal={closeEditModal} />}
            {isOpenAddTaskModal && <AddTaskForm handleModal={() => setOpenAddTaskModal(false)} />}
        </div>
    )
}