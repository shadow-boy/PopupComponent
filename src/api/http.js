
import axios from 'axios';
import HttpResponseKeys from './httpResKey';

const JSON_REQ_RES_SERILIZATION = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const instance = axios.create({
    baseURL: "http://gang.wegongxiang.com/api/gw/",
    timeout: 6000,
    headers: JSON_REQ_RES_SERILIZATION
});

//请求拦截处理
instance.interceptors.request.use(function (config) {
    // 在发送请求之前

    console.log(config, `接口参数`)
    let headerToken = { "token": "this is token for http header field" };
    config.headers = Object.assign(JSON_REQ_RES_SERILIZATION, headerToken);
    return config;
}, function (error) {
    // 对请求错误
    return Promise.reject(error);
});

//返回拦截处理
instance.interceptors.response.use(function (response) {

    let _data = response.data;
    console.log(_data, `接口返回数据来自:${response.request.responseURL}`);
    let success = _data[HttpResponseKeys.Field.key_status];
    if (success == true) {
        return response;
    }
    else {
        console.log("数据错误哦、拦截器已经拦截、response ---- ")
        console.log(response);
    }



}, function (error) {
    console.log(error)

    // 对响应错误
    return Promise.reject(error);
});


export default instance;