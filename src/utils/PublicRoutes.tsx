import { useAuth } from "./useAuth";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = () => {
  const isToken = useAuth();
  return isToken ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;
