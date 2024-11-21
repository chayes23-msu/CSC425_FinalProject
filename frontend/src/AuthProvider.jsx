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
        try {
            // Call the login API
            console.log(`${loginData.username} attempting to log in`);
    
            const resp = await api.login(loginData); // Await API response
    
            const user = resp.user;
            user.isAdmin = user.isAdmin === 1; 
    
            setUser(user);
            setToken(resp.token);
            localStorage.setItem("token", resp.token);
    
            console.log(`${user.username} logged in successfully`);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getAnimals = async () => {
        try {
            // Call the getAnimals API
            console.log(`Fetching animals`);
    
            const resp = await api.getAnimals(); // Await API response
    
            console.log(`Animals fetched successfully`);
            return resp;
        } catch (err) {
            console.error("Error fetching animals:", err);
            return Promise.reject(err);
        }
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
    };

    return <AuthContext.Provider value={{ token, user, login, logout, getAnimals}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};