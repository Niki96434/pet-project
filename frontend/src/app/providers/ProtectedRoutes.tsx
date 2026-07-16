import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../shared/model/useAuthStore";

export const ProtectedRoutes = () => {

    const isAuth = useAuthStore((state) => state.context.isAuth);

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;

};
