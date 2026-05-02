import { useState } from "react";
import { TaskList } from "./../../../entities/tasks";
import { AddTaskForm } from '../../../entities/tasks';
import { taskApi } from '../../../entities/tasks/api/taskApi';
import type { TaskType } from "../../../entities/tasks/model/types";
import { useQuery } from "@tanstack/react-query";
import { EditTaskForm } from "../../../entities/tasks/ui/EditTaskForm";
import { useEditTaskStore } from "../../../entities/tasks/model/store";

export default function TasksPage() {
    const [isOpenAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);
    const isOpenEditModal = useEditTaskStore((state) => state.isEditModalOpen);
    const closeEditModal = useEditTaskStore((state) => state.handleCloseModal);

    const { data: tasks, status, error } = useQuery<TaskType[]>({
        queryKey: ['todos'],
        queryFn: taskApi.getTasks,
        retry: 1,
    });

    if (status === 'pending') {
        return <span>Загрузка...</span>
    }

    if (status === 'error') {
        return <span>Ошибка: {error.message}</span>
    }

    const closeAllModal = () => {
        if (isOpenAddTaskModal) {
            setOpenAddTaskModal(false);
        } else if (isOpenEditModal) {
            closeEditModal()
        }
    }

    return (
        <div onClick={closeAllModal}>
            <TaskList tasks={tasks ?? []} handleModal={() => setOpenAddTaskModal(true)} />
            {isOpenAddTaskModal && <AddTaskForm handleModal={() => setOpenAddTaskModal(false)} />}
            {isOpenEditModal && <EditTaskForm closeEditModal={closeEditModal} />}
        </div>
    )
}
