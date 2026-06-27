import { create } from 'zustand';

export interface UserState {
    id: number | null;
    name: string | null;

    setCredentials: (id: number, name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    id: null,
    name: null,

    setCredentials: (id: number, name: string) => set({ id: id, name: name }),
}));

export const userId = (state: UserState) => state.id;