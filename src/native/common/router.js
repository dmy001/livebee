
import { jsbridgeHandlerCall } from "../base";
/**
 * 跳转到直播间
 */
export const jumpToLive = (homeId) => {
    jsbridgeHandlerCall('jumpToNative', {
        arouter: "/live/lookLive",
        params: { anchorId: homeId }
    })
}
