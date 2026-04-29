import { create } from 'zustand';

interface TaskState {
    taskId: number;
    isEditModalOpen: boolean;

    setTaskId: (taskId: number) => void;
    handleEditModal: () => void;
}

export const useEditTaskStore = create<TaskState>((set) => ({
    taskId: 0,
    isEditModalOpen: false,

    setTaskId: (id: number) => set(() => ({ taskId: id })),

    handleEditModal: () => set({ isEditModalOpen: true }),
}));
