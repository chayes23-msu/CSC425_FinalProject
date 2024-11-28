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
    /**
     * 
     * @param {string} newToken The new token to set.
     * @returns {void} This function is used to set the token for the API. 
     */
    setToken: (newToken) => {
        token = newToken;
    },

    /**
     * Logs in a user.
     * @param {{ username: string, password: string }} loginData - The login credentials.
     * @returns {Promise<object>} Resolves with user data and token if successful, rejects with an error otherwise.
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
     * @param {{password: string, currentPassword: string}} newPasswordData Object with current password and new password.
     * @returns {Promise<object>} Resolves if successful, rejects with an error otherwise.
     */
    updateUserPassword: async function (userID, newPasswordData) {
        try {
            const response = await api.request({
                url: `/users/password/${userID}`,
                method: "PUT",
                data: newPasswordData,
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },

    /**
     * 
     * @param {int} userID User ID of the user to update.
     * @param {{username: string, currentPassword: string}} newUsernameData Object with new username and current password.
     * @returns {Promise<object>} Resolves if successful, rejects with an error otherwise.
     */
    updateUsername: async function (userID, newUsernameData) {
        try {
            const response = await api.request({
                url: `/users/username/${userID}`,
                method: "PUT",
                data: newUsernameData,
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },

    // NOT IMPLEMENTED IN BACKEND YET
    // getUserByID: async function (userID) {
    //     try {
    //         const response = await api.request({
    //             url: `/users/${userID}`,
    //             method: "GET",
    //         });
    //         return response.data;
    //     } catch (err) {
    //         return Promise.reject(err);
    //     }
    // },

    /**
     * 
     * @param {string} username Username of the user to get.
     * @returns {Promise<object>} Resolves with user data if successful, rejects with an error otherwise.
     */
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
