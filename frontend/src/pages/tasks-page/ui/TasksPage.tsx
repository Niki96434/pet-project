import { useState } from "react";
import { TaskList } from "./../../../entities/tasks";
import { TaskModalForm } from '../../../entities/tasks';
import { taskApi } from '../../../entities/tasks/api/taskApi';
import type { TaskType } from "../../../entities/tasks/model/types";
import { useQuery } from "@tanstack/react-query";
import './TaskPage.css';

export default function TasksPage() {
    const [isOpen, setOpenModal] = useState<boolean>(false);

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
        <div className='homepage-container' id='home-page-container' onClick={() => setOpenModal(false)}>
            {isFetching && <div>Обновление...</div>}
            <TaskList tasks={tasks ?? []} handleModal={() => setOpenModal(true)} />
            {isOpen && <TaskModalForm handleModal={() => setOpenModal(false)} />}
        </div>
    )
}
