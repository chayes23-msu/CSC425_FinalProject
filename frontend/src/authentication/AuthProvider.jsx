/**
 * This code is based on the article at 
 * https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
 */

import { useContext, useState, createContext, useEffect } from "react";
import { FinalProjectAPI as api } from "../apis/FinalProjectAPI";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

/**
 * Used to get the user object from a token when token is obtained from local storage
 * @param {string} token The token to get the user from
 * @returns user object if token is valid, null otherwise
 */
const getUserFromToken = (token) => {
    if (token) {
        try{
            const decodedToken = jwtDecode(token);
            return decodedToken.user; // Assuming `user` contains username, userID, and isAdmin

        } catch (err) {
            console.log("Error decoding token: ", err);
            return null;
        }
    }
    return null; // Return null if no token exists
};

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(getUserFromToken(token)); //user should be an object with username, userID, and isAdmin

    /**
     * 
     * @param {{username: string, password: string}} loginData An object containing the username and password to log in with
     * @returns {Promise<void>} Resolves if login is successful, rejects with an error otherwise
     */
    const login = async (loginData) => {
        try {
            // Call the login API
            console.log(`${loginData.username} attempting to log in`);

            const resp = await api.login(loginData); // Await API response

            setUser(resp.user);
            setToken(resp.token);
            api.setToken(resp.token);
            localStorage.setItem("token", resp.token);

            console.log(`${loginData.username} logged in successfully`);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * Logs the user out by removing the token from local storage and setting the user and token to null.
     * Also sets the token for the API to null
     * @returns {void}
     */
    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        api.setToken(null);
    }

    /**
     * 
     * @returns {boolean} Returns true if the user is logged in, false otherwise
     */
    const loggedIn = () => {
        if (!token)
            return false;

        try{
            const jwtDecoded = jwtDecode(token);
            if (jwtDecoded.exp <= Math.round(Date.now() / 1000)){
                console.log("Token expired");
                logout();
                return false;
            }
        } catch (err) {
            console.log("Error decoding token: ", err);
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