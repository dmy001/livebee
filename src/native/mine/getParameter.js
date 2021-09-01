import { jsbridgeHandlerCall } from "../base";
export const getParameter = (obj) => {
    // 需要获取回调的写promise
    return new Promise((resolve) => {
        jsbridgeHandlerCall('getParameter', obj, (data) => {
            resolve(data);
        })
    })
}