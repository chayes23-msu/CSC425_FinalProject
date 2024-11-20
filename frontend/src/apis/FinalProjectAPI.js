/**
 * This file is used to define the API calls for the Final Project.
 * The apis folder defines an API layer based on the structure defined in this blog.
 * https://semaphoreci.com/blog/api-layer-react
 */

import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:5000",
});

export const FinalProjectAPI = {
    login: async function (loginData) {
        await api.request({
            url: '/login',
            method: "POST",
            data: loginData,
        }).then((resp) => {
            return resp.data;
        }).catch((err) => {
            return Promise.reject(err);
        });
    }
}
