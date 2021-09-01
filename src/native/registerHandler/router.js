
import { jsbridgeHandlerRegister } from "../base";
import { goBackNative } from "../index";
/**
 * 原生需要的返回操作
 */
jsbridgeHandlerRegister('goBack', () => {
    if (window.history.length > 1) {
        window.history.go(-1);
    } else {
        // window.location.href = "/";
        goBackNative()
    }

})



