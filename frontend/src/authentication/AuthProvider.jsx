/**
 * This code is based on the article at 
 * https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
 */

import { useContext, useState, createContext, useEffect } from "react";
import { FinalProjectAPI as api } from "../apis/FinalProjectAPI";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const getUserFromToken = (token) => {
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.user; // Assuming `user` contains username, userID, and isAdmin
    }
    return null; // Return null if no token exists
};

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(getUserFromToken(token)); //user should be an object with username, userID, and isAdmin

    useEffect(() => {
        setUser(getUserFromToken(token));
        api.setToken(token);
    }, [token]);

    const login = async (loginData) => {
        try {
            // Call the login API
            console.log(`${loginData.username} attempting to log in`);

            const resp = await api.login(loginData); // Await API response

            const user = resp.user;
            user.isAdmin = user.isAdmin === 1;

            setUser(user);
            setToken(resp.token);
            api.setToken(resp.token);
            localStorage.setItem("token", resp.token);

            console.log(`${user.username} logged in successfully`);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        api.setToken(null);
    };

    const loggedIn = () => {
        if (!token)
            return false;

        if (jwtDecode(token).exp <= Math.round(Date.now() / 1000)) {
            logout();
            return false;
        }

        return true;
    }

    return <AuthContext.Provider value={{ token, user, login, logout, loggedIn }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};