import { create } from 'zustand';

interface TaskState {
    taskId: number;
    isOpenEditModal: boolean;

    setTaskId: (taskId: number) => void;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
}
export const useEditTaskStore = create<TaskState>((set) => ({
    taskId: 0,
    isOpenEditModal: false,

    setTaskId: (id: number) => set({ taskId: id }),
    handleOpenModal: () => set({ isOpenEditModal: true }),
    handleCloseModal: () => set({ isOpenEditModal: false })
}));

export const getTaskId = (state: TaskState) => state.taskId;
export const setTaskId = (id: number) => (state: TaskState) => state.taskId = id;

export const openModal = (state: TaskState) => state.handleOpenModal;
export const closeModal = (state: TaskState) => state.handleCloseModal;

export const handleEditModal = (state: TaskState) => state.isOpenEditModal;