import { AddTaskForm } from '../../add-task-form/ui/AddTaskForm.tsx';
import { EditTaskForm } from "../../edit-task-form/ui/EditTaskForm.tsx";
import { useGetTasks } from "../../../entities/tasks/model/useGetTasks.ts";
import { DragAndDropView } from "./DragAndDropView.tsx";
import { useTaskModalStore } from "../../../entities/tasks/model/useTaskModalStore.ts";
import type { TaskState } from '../../../entities/tasks/model/useTaskModalStore.ts';
import { useDragTasks } from "../model/useDragTasks.ts";
import { getBoardsFromTasks } from "../model/getBoardsFromTasks.ts";
import { useEffect, useState } from "react";
import { type Task } from "../../../entities/tasks/index.ts";
import { DragDropContext } from '@hello-pangea/dnd';

export interface Board {
    id: number;
    title: string;
    items: Task[];
}

export function DragAndDrop() {
    const {
        isEditModalOpen, closeEditModal,
        isAddModalOpen, closeAddModal,
        openAddModal
    } = useTaskModalStore((state: TaskState) => state);

    const closeAllModal = () => {
        if (isAddModalOpen) {
            closeAddModal();
        } else if (isEditModalOpen) {
            closeEditModal();
        }
    }

    const { status, error, tasks } = useGetTasks();

    const [boards, setBoards] = useState<Board[]>([]);

    useEffect(() => {
        const loadBoards = () => {
            setBoards(getBoardsFromTasks(tasks));
        }
        loadBoards();
    }, [tasks]);

    const handleDragEnd = useDragTasks({ boards, setBoards });

    if (status === 'pending') {
        return <span>Загрузка задач...</span>
    }

    if (status === 'error') {
        return <span>Ошибка: {error?.message}</span>
    }

    return (
        <div onClick={closeAllModal}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <DragAndDropView
                    boards={boards}
                    openAddModal={openAddModal}
                />
            </DragDropContext>
            {isEditModalOpen && <EditTaskForm closeEditModal={closeEditModal} />}
            {isAddModalOpen && <AddTaskForm handleModal={closeAddModal} />}
        </div>
    )
}
