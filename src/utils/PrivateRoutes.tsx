import { useAuth } from "./useAuth";
import { Outlet, Navigate } from "react-router-dom";
import AuthenticatedComponent from "../Components/AuthenticatedComponent";

const PrivateRoutes = () => {
  const isToken = useAuth();
  return isToken ? (
    <AuthenticatedComponent>
      <Outlet />
    </AuthenticatedComponent>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
