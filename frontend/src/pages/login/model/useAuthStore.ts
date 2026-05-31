import { create } from 'zustand'

interface AuthState {
    isAuth: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuth: !!document.cookie,

    login: (token: string) => {
        console.log(document.cookie);
        console.log(token);
        // set({ isAuth: true });
    },
    logout: () => {
        set({ isAuth: false });
    },
}));

export const isAuth = (state: AuthState) => state.isAuth;
export const login = (state: AuthState) => state.login;
export const logout = (state: AuthState) => state.logout;

// function getCookie() {
//     consdocument.cookie
// }