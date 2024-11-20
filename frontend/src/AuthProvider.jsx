/**
 * This code is based on the article at 
 * https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
 */

import { useContext, useState, createContext } from "react";
import { FinalProjectAPI as api } from "./apis/FinalProjectAPI";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); //user should be an object with username, userID, and isAdmin
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const login = async (loginData) => {
        // Call the login API
        // If successful, set the user and token
        // If unsuccessful, show an error message
        console.log(loginData.username + " attempting to log in");
        await api.login(loginData)
            .then((resp) => {
                const user = resp.user;
                user.isAdmin = user.isAdmin === 1 ? true : false;
                setUser(user);
                setToken(resp.token);
                localStorage.setItem("token", resp.token);
            }).catch((err) => {
                return Promise.reject(err);
            });
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
    };

    return <AuthContext.Provider value={{ token, user, login, logout}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};