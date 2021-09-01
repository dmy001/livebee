import { jsbridgeHandlerCall } from "../base";
//关注主播状态
export const updateAttention=(gagaId,level)=>{
    jsbridgeHandlerCall('updateAudienceLevel',{gagaId,level})
}