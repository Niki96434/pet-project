import { Navigate } from "react-router";
import { useAuthStore } from "../../pages/login/model/useAuthStore";
import { isAuth } from "../../pages/login/model/useAuthStore";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthorized = useAuthStore(isAuth);

    if (!isAuthorized) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
