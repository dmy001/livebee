import { jsbridgeHandlerCall } from "../base";

export const setStatusBarTextMode = (isDark) => {
        return new Promise((resolve) => {
                jsbridgeHandlerCall('setStatusBarTextMode', isDark, (data) => {
                        resolve(data)
                })
        })
}