import { create } from 'zustand';

interface UserState {
    user_id: number | null;
    username: string | null;

    setCredentials: (id: number, name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user_id: null,
    username: null,

    setCredentials: (id: number, name: string) => set({ user_id: id, username: name }),
}));

export const setCredentials = (state: UserState) => state.setCredentials;
export const userId = (state: UserState) => state.user_id;
export const username = (state: UserState) => state.username; 