import { create } from 'zustand'

interface AuthState {
    isAuth: boolean;
    login: (id: number) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuth: false,

    login: (id: number) => {
        set({ isAuth: !!id });
    },
    logout: () => {
        set({ isAuth: false });
    },
}));

export const isAuth = (state: AuthState) => state.isAuth;
export const login = (state: AuthState) => state.login;
export const logout = (state: AuthState) => state.logout;