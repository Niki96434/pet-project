import { AddTaskForm } from '../../add-task-form/ui/AddTaskForm.tsx';
import { EditTaskForm } from "../../edit-task-form/ui/EditTaskForm.tsx";
import { useTaskModalStore } from "../../../../entities/tasks/model/useTaskModalStore.ts";
import './DragAndDrop.css';
import { useGetTasks } from "../../../../entities/tasks/model/useGetTasks.ts";
import type { TaskState } from '../../../../entities/tasks/model/useTaskModalStore.ts';
import { TaskBoards } from "./TaskBoards.tsx";

export function DragAndDrop() {
    const isEditModalOpen = useTaskModalStore((state: TaskState) => state.isEditModalOpen);
    const closeEditModal = useTaskModalStore((state: TaskState) => state.closeEditModal);

    const isAddModalOpen = useTaskModalStore((state: TaskState) => state.isAddModalOpen);
    const closeAddModal = useTaskModalStore((state: TaskState) => state.closeAddModal);

    const { status, error, tasks } = useGetTasks();

    const closeAllModal = () => {
        if (isAddModalOpen) {
            closeAddModal();
        } else if (isEditModalOpen) {
            closeEditModal();
        }
    }

    if (status === 'pending') {
        return <span>Загрузка задач...</span>
    }

    if (status === 'error') {
        return <span>Ошибка: {error?.message}</span>
    }

    return (
        <div className='todos-page' onClick={closeAllModal}>
            <TaskBoards tasks={tasks} />
            {isEditModalOpen && <EditTaskForm closeEditModal={closeEditModal} />}
            {isAddModalOpen && <AddTaskForm handleModal={closeAddModal} />}
        </div>
    )
}
