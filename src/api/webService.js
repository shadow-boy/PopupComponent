

import http from './http';

export default class WebService {




    static postRequest(action = "", param) {

        if (!action) {
            return false;
        }
        // 加密参数
        param = requestEncrypt(param);

        var paramters = param

        return http.post(action, paramters)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log("http request error");
                console.log(error);
                return Promise.reject(error)
                // return error;
            });
    }


    static getRequest(action = "", param) {

        if (!action) {
            return false;
        }
        // 加密参数
        param = requestEncrypt(param);

        var paramters = param
        return http.get(action, paramters)
            .then((response) => {

                return response.data;
            })
            .catch((error) => {
                console.log("http request error");
                console.log(error);
                return Promise.reject(error)
                // return error;
            });
    }

}

/**
 * 统一加密处理参数
 * @param {参数对象}} data 
 */
function requestEncrypt(data) {
    let json_data = JSON.stringify(data)
    return data;
    // return json_data;
}
