/**
 * Code from: https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../authentication/AuthProvider";

const PrivateRoute = () => {
  const auth = useAuth();
  if (!auth.loggedIn()) return <Navigate to="/login" replace/>;
  return <Outlet />;
};

export default PrivateRoute;