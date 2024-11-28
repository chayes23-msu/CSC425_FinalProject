/**
 * Code from: https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../authentication/AuthProvider";

// This component is a wrapper for the protected routes in the app. If a user is not authenticated, they are redirected to the login page.

const PrivateRoute = () => {
  const auth = useAuth();
  if (!auth.loggedIn()) return <Navigate to="/login" replace/>;
  return <Outlet />;
};

export default PrivateRoute;