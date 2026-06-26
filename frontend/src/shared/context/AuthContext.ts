import { createContext, type SetStateAction } from "react";

export type isAuthValue = true | false;

export interface AuthType {
    isAuth: isAuthValue;
    setIsAuth: (isAuth: SetStateAction<isAuthValue>) => void;
}

export const AuthContext = createContext<AuthType | undefined>(undefined);

