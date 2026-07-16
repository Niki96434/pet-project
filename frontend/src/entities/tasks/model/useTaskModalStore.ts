import { create } from 'zustand';

interface ModalStatesType {
    taskId: number;
    isEditModalOpen: boolean;
    isAddModalOpen: boolean;
}

interface ModalActionsType {
    setTaskId: (taskId: number) => void;
    openEditModal: () => void;
    closeEditModal: () => void;
    openAddModal: () => void;
    closeAddModal: () => void;
}

interface TaskStore extends ModalStatesType {
    actions: ModalActionsType
}

const defaultModalState = {
    taskId: 0,
    isEditModalOpen: false,
    isAddModalOpen: false,
}

export const useTaskModalStore = create<TaskStore>((set) => ({
    ...defaultModalState,

    actions: {
        setTaskId: (id: number) => set({ taskId: id }),
        openEditModal: () => set({ isEditModalOpen: true }),
        closeEditModal: () => set({ isEditModalOpen: false }),
        openAddModal: () => set({ isAddModalOpen: true }),
        closeAddModal: () => set({ isAddModalOpen: false }),
    }

}));
