import axios from "axios";


let token = localStorage.getItem("token");


const api = axios.create({
    baseURL: "https://localhost:5000",
});

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
    }
};