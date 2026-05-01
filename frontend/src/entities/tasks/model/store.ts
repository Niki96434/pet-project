import { create } from 'zustand';

interface TaskState {
    taskId: number;
    isEditModalOpen: boolean;

    setTaskId: (taskId: number) => void;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
}
export const useEditTaskStore = create<TaskState>((set) => ({
    taskId: 0,
    isEditModalOpen: false,

    setTaskId: (id: number) => set({ taskId: id }),
    handleOpenModal: () => set({ isEditModalOpen: true }),
    handleCloseModal: () => set({ isEditModalOpen: false })
}));

export const getTaskId = (state: TaskState) => state.taskId;
export const setTaskId = (id: number) => (state: TaskState) => state.taskId = id;
export const openModal = (state: TaskState) => state.handleOpenModal;