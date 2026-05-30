import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../pages/login/model/useAuthStore";
import { isAuth } from "../../pages/login/model/useAuthStore";

export const ProtectedRoutes = () => {
    const isAuthorized = useAuthStore(isAuth);

    return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;

};
