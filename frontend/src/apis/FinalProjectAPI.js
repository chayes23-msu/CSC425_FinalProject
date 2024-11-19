/**
 * This file is used to define the API calls for the Final Project.
 * The apis folder defines an API layer based on the structure defined in this blog.
 * https://semaphoreci.com/blog/api-layer-react
 */

import { api } from './configs/axiosConfigs';
import { defineCancelApiObject } from './configs/axiosUtils';

export const FinalProjectAPI = {
    login: async function (loginData, cancel = false) {
        const resp = await api.request({
            url: '/login',
            method: "POST",
            data: loginData,
            signal: cancel ? cancelApiObject[this.login.name].handleRequestCancellation().signal : undefined,
        });

        return resp.data;
    }
}

const cancelApiObject = defineCancelApiObject(FinalProjectAPI); 