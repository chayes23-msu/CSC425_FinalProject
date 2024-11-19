/**
 * This code is based on the article at 
 * https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
 */

import { useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); //user should be an object with username, userID, and isAdmin
    const [token, setToken] = useState(sessionStorage.getItem("token") || "");
    const navigate = useNavigate();

    const login = async (loginData) => {
        // Call the login API
        // If successful, set the user and token
        // If unsuccessful, show an error message
        console.log("Logging in with", loginData);
    };

    const logout = () => {
        setUser(null);
        setToken("");
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return <AuthContext.Provider value={{ token, user, login, logout}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};