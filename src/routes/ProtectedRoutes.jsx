import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const ProtectedRoutes = () => {
    const { token } = useAuth();

    return (
        token ? <Outlet></Outlet> : <Navigate to="/login" />
    )
  };

export default ProtectedRoutes;
