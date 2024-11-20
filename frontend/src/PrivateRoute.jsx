/**
 * Code from: https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  const auth = useAuth();
  if (!auth.token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;