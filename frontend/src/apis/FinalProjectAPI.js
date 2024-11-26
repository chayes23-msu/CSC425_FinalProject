import axios from "axios";

let token = localStorage.getItem("token");

const api = axios.create({
    baseURL: "https://localhost:5000",
});

api.interceptors.request.use(
    (config) => {
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * FinalProjectAPI module for API calls.
 */
export const FinalProjectAPI = {
    setToken: (newToken) => {
        token = newToken;
    },

    /**
     * Logs in a user.
     * @param {{ username: string, password: string }} loginData - The login credentials.
     * @returns {Promise<object>} Resolves with user data if successful, rejects with an error otherwise.
     */
    login: async function (loginData) {
        try {
            const response = await api.request({
                url: '/login',
                method: "POST",
                data: loginData,
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },

    /**
     * 
     * @returns {Promise<object>} Resolves with an array of colors if successful, rejects with an error otherwise.
     */
    getColors: async function () {
        try {
            const response = await api.request({
                url: '/colors',
                method: "GET",
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },

    /**
     * 
     * @param {int} userID UserID of the user to update.
     * @param {{password: string}} newUserData 
     * @returns {Promise<object>} Resolves if successful, rejects with an error otherwise.
     */
    updateUserPassword: async function (userID, newPasswordData) {
        try {
            const response = await api.request({
                url: `/users/${userID}`,
                method: "PUT",
                data: newPasswordData,
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },

    getUserByID: async function (userID) {
        try {
            const response = await api.request({
                url: `/users/${userID}`,
                method: "GET",
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },

    getUserByName: async function (username) {
        try {
            const response = await api.request({
                url: `/users/${username}`,
                method: "GET",
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },
};
