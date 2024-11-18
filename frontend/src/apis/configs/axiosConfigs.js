/**
 * This code is from https://github.com/Tonel/api-layer-example-semaphore 
 */

import axios from "axios";
// import { notification } from "antd";

export const api = axios.create({
    baseURL: "https://localhost:5000",
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
    const statusCode = error.response?.status

    // if (error.code === "ERR_CANCELED") {
    //     notification.error({
    //         placement: "bottomRight",
    //         description: "API canceled!",
    //     })
    //     return Promise.resolve();
    // }

    console.error(error);

    return Promise.reject(error);
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error);
});
