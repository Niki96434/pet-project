import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../pages/login/api/useAuthStore";

export const ProtectedRoutes = () => {
  const isAuth = useAuthStore((state) => state.context.isAuth);

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};
