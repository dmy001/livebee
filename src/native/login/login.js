import { jsbridgeHandlerCall } from "../base";
//登录成功
export const loginSuccess=(data)=>{
    jsbridgeHandlerCall('loginSuccess',data)
}
//更新用户信息
/**
 * 
 * @param {*} data res内具体的data 
 */
export const updateUserInfo=(data)=>{
    jsbridgeHandlerCall('updateUserInfo',data)
}
//退出当前用户
/* export const exitLogin=(data)=>{
    jsbridgeHandlerCall('exitLogin')
} */


//他人中心返回告知app
export const goBackNative=(data)=>{
    jsbridgeHandlerCall('goBackNative')
}