import { AuthContext, type isAuthValue } from "../../shared/context/AuthContext";
import React, { useMemo, useState } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {

    const [isAuth, setIsAuth] = useState<isAuthValue>(() => {
        // здесь логика неоч
        return true;
    });

    const contextValue = useMemo(() => ({
        isAuth, setIsAuth
    }), [isAuth]);

    return <AuthContext value={contextValue} > {children}</AuthContext>
}

export { AuthProvider }