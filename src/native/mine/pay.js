import { jsbridgeHandlerCall } from "../base";
 /**
 *  
 *
 * @param {
 *  "payType":"googleplay",
 *  "orderInfo":{
 *          goodsId //商品id 也就是iosId这个参数
 *          orderId //创建订单成功后的订单id
 *          price // 商品价格
 *          goodsType // 写死的2个常量  
 *          public static final int GooglePayType_Gold = 1;//   
 *          public static final int GooglePayType_VIP = 2;
 * }
 * 
 * } obj
 * @return {*} 
 */
  export const toPay = (obj) => {
    // 需要获取回调的写promise
    return new Promise((resolve) => {
        jsbridgeHandlerCall('toPay', obj, (data) => {
            resolve(data);
        })
    })
}





