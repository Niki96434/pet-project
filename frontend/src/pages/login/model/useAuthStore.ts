import { create } from 'zustand'


interface AuthState {
    isAuth: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuth: !!localStorage.getItem('secret'),

    login: (token: string) => {
        localStorage.setItem('secret', token);
        set({ isAuth: true });
    },
    logout: () => {
        localStorage.removeItem('secret');
        set({ isAuth: false });
    },
}));

export const isAuth = (state: AuthState) => state.isAuth;
export const login = (state: AuthState) => state.login;
export const logout = (state: AuthState) => state.logout;