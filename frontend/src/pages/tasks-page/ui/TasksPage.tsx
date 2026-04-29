import { useState } from "react";
import { TaskList } from "./../../../entities/tasks";
import { AddTaskForm } from '../../../entities/tasks';
import { taskApi } from '../../../entities/tasks/api/taskApi';
import type { TaskType } from "../../../entities/tasks/model/types";
import { useQuery } from "@tanstack/react-query";
import './TasksPage.css';
import { EditTaskForm } from "../../../entities/tasks/ui/EditTaskForm";

export default function TasksPage() {
    const [isOpenAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);
    const [isOpenEditTaskModal, setOpenEditTaskModal] = useState<boolean>(false);

    const { data: tasks, status, error, isFetching } = useQuery<TaskType[]>({
        queryKey: ['todos'],
        queryFn: taskApi.getTasks,
        retry: false,
    });

    if (status === 'pending') {
        return <span>Загрузка...</span>
    }

    if (status === 'error') {
        return <span>Ошибка: {error.message}</span>
    }

    return (
        <div className='homepage-container' id='home-page-container' onClick={() => setOpenAddTaskModal(false)}>
            {isFetching && <div>Обновление...</div>}
            <TaskList tasks={tasks ?? []} handleModal={() => setOpenAddTaskModal(true)} handleEditModal={() => setOpenEditTaskModal(true)} />
            {isOpenAddTaskModal && <AddTaskForm handleModal={() => setOpenAddTaskModal(false)} />}
            {isOpenEditTaskModal && <EditTaskForm handleModal={() => setOpenEditTaskModal(false)} />}
        </div>
    )
}
