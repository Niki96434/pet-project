import { create } from 'zustand';

export interface TaskState {
    taskId: number;
    isEditModalOpen: boolean;
    isAddModalOpen: boolean;

    setTaskId: (taskId: number) => void;
    openEditModal: () => void;
    closeEditModal: () => void;

    openAddModal: () => void;
    closeAddModal: () => void;
}
export const useTaskModalStore = create<TaskState>((set) => ({
    taskId: 0,

    isEditModalOpen: false,
    isAddModalOpen: false,

    setTaskId: (id: number) => set({ taskId: id }),

    openEditModal: () => set({ isEditModalOpen: true }),
    closeEditModal: () => set({ isEditModalOpen: false }),

    openAddModal: () => set({ isAddModalOpen: true }),
    closeAddModal: () => set({ isAddModalOpen: false }),

}));
