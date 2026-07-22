import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface AuthCredentialsType {
    context: {
        isAuth: boolean;
        id: number;
        username: string;
    }
}

interface UserCredsType {
    id: number,
    username: string,
}

interface AuthActionType {
    setAuth: ({ id, username }: UserCredsType) => void;
    logout: () => void;
}

interface AuthStore extends AuthCredentialsType {
    actions: AuthActionType
}

const initialAuthCreds: AuthCredentialsType = {
    context: {
        isAuth: false,
        id: 0,
        username: '',
    }
}

/**
 * @description "partialize" option saves contexts(states) without actions since actions(functions) are serialized in JSON into an empty object.
 */
export const useAuthStore = create<AuthStore>()(
    persist((set) => ({
        ...initialAuthCreds,

        actions: {
            setAuth: ({ id, username }: UserCredsType) => set({ context: { id: id, username: username, isAuth: true } }),
            logout: () => set(initialAuthCreds),
        }
    }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ context: state.context })
        })
);
