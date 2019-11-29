


/**
 * http 字段参数统一配置 包括返回字段和错误码部分
 */
export default class HttpResponseKeys {
    /**
     *返回字段统一配置
     *
     * @static
     * @memberof HttpResponseKeys
     */
    static  Field = {
        key_data:"resultData",
        key_status:"success",
        key_error_msg:"errorMsg",
        key_error_code:"errorCode",

    }
    
    /**
     *错误码 枚举
     *
     * @static
     * @memberof HttpResponseKeys
     */
    static Code = {
        
    }



}