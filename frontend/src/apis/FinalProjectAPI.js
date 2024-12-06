import axios from "axios";
import { showErrorNotification } from "../notifications/notificationFunctions";


let token = localStorage.getItem("token");


const api = axios.create({
    baseURL: "https://localhost:5000",
});

// Add authorization header to requests
api.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to display error if network error
api.interceptors.response.use(
    (response) => {
        // Pass through successful responses
        return response;
    },
    (error) => {
        console.error(error);   //log the error
        if (!error.response) {
            // Network error or server unreachable
            return Promise.reject("Network Error: Check your connection");
        } else if(error.response?.status === 404) {
            // no endpoint found on the backend
            return Promise.reject("Invalid HTTP request was sent");
        } else if (!error.response?.data) {
            // this shouldn't happen but if it does, return a generic error message
            return Promise.reject("Internal Server Error");
        } else {
            // Pass through other errors
            return Promise.reject(error.response.data); // Return the error message
        }
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
     * Fetches all animals.
     * @returns {Promise<object[]>} Resolves with an array of animals if successful, rejects with an error otherwise.
     */
    getAnimals: async function () {
        try {
            const response = await api.request({
                url: '/animals',
                method: "GET",
            });
            console.log(response.data);
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },

    /**
     * Deletes a user. (Admin only)
     * @param {int} userID 
     * @returns {Promise<object>} 
     */
    deleteUser: async function (userID) {
        try {
            const response = await api.request({
                url: `/users/${userID}`,
                method: "DELETE",
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },

    /**
     * Create a user. (Admin only)
     * @param {username: string, password: string, isAdmin: boolean} userData 
     * @returns {Promise<object>} Resolves if successful, rejects with an error otherwise.
     */
    createUser: async function (userData) {
        try {
            const response = await api.request({
                url: '/users',
                method: "POST",
                data: userData
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },
    /**
     * 
     * @param {int} userID 
     * @param {{username: string, password: string, isAdmin: boolean}} userData Object with new user data. Password can be null to keep the same password. 
     * @returns {Promise<object>} Resolves if successful, rejects with an error otherwise.
     */
    updateUser: async function (userID, userData) {
        try {
            const response = await api.request({
                url: `/users/${userID}`,
                method: "PUT",
                data: userData,
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },

    /**
     * Creates a new animal.
     * @param {object} animalData - The data for the new animal.
     * @returns {Promise<object>} Resolves with the created animal data if successful, rejects with an error otherwise.
     */
    createAnimal: async function (animalData) {
        try {
            const response = await api.request({
                url: '/animals',
                method: "POST",
                data: animalData,
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },

    /**
     * Deletes an animal.
     * @param {number} animalID - The ID of the animal to delete.
     * @returns {Promise<object>} Resolves with the deleted animal data if successful, rejects with an error otherwise.
     */
    deleteAnimal: async function (animalID) {
        try {
            const response = await api.request({
                url: `/animals/${animalID}`,
                method: "DELETE",
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },

    getAnimalByID: async function (animalID) {
        try {
            const response = await api.request({
                url: `/animals/${animalID}`,
                method: "GET",
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },

    /**
     * Fetches all colors.
     * @returns {Promise<object[]>} Resolves with an array of colors if successful, rejects with an error otherwise.
     */
    getColors: async function () {
        try {
            const response = await api.request({
                url: '/colors',
                method: "GET",
            });
            console.log(response.data);
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },


    /**
     * Gets all users from the database
     * @returns {Promise<object>} Resolves with an array of users {username: string, isAdmin: int(0 or 1), userID: int} if successful, rejects with an error otherwise.
     */
    getUsers: async function () {
        try {
            const response = await api.request({
                url: '/users',
                method: "GET",
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },

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
                url: `/animals/${animalID}`,
                method: "DELETE",
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
     * Fetches all colors.
     * @returns {Promise<object[]>} Resolves with an array of colors if successful, rejects with an error otherwise.
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



    // Notebooks API calls go here
    getNotebookEntries : async function() {
        try {
            const response = await api.request({
                url: '/notebookEntries/:animalID',
                method: "GET",
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },
};
