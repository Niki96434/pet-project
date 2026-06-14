import { create } from 'zustand';

interface UserState {
    id: number | null;
    name: string | null;

    setCredentials: (id: number, name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    id: null,
    name: null,

    setCredentials: (id: number, name: string) => set({ id: id, name: name }),
}));

export const setCredentials = (state: UserState) => state.setCredentials;
export const userId = (state: UserState) => state.id;
export const userName = (state: UserState) => state.name; 