import { useGetTasks } from "../../../entities/tasks/model/useGetTasks.ts";
import { useTaskModalStore } from "../../../entities/tasks/model/useTaskModalStore.ts";
import type { TaskState } from '../../../entities/tasks/model/useTaskModalStore.ts';
import { useDragTasks } from "./useDragTasks.ts";
import { getTaskBoards } from "./getTaskBoards.ts";
import { useEffect, useState } from "react";
import { type Board } from "../ui/DragAndDrop.tsx";

export function useKanbanBoard() {

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
            setBoards(getTaskBoards(tasks));
        }
        loadBoards();
    }, [tasks]);

    const handleDragEnd = useDragTasks({ boards, setBoards });

    return {
        openAddModal,
        closeAllModal,
        isEditModalOpen,
        isAddModalOpen,
        closeEditModal,
        closeAddModal,
        status,
        error,
        boards,
        handleDragEnd
    }
}