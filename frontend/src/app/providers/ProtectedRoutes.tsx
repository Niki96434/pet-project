import { Navigate, Outlet } from "react-router";
import { useAuth } from "../model/useAuth";

export const ProtectedRoutes = () => {

    const { isAuth } = useAuth();

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;

};
