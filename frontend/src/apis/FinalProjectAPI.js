import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:5000",
});

/**
 * FinalProjectAPI module for API calls.
 */
export const FinalProjectAPI = {
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
    }
};
