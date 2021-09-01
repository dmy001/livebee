import axios from "../http";

/*  
*判断用户是否为会员
*/
export const gagaVipIsTrue =async () => {
    const res =await axios.post('/businessServlet/gagaVipIsTrue')
    return res.data

}

/*  
*获取会员充值界面价格列表
*/
 /**
 *{
      "IosId": "vip_1_month",
      "month": 1,
      "proportion": 0,
      "goodsId": "fb2d644c8ad74e14bd8048cdb83d1c65",
      "price": 19.99,
      "discountPrice": 19.99,
      "everyMonth": 19.99,
      "discount": 9.5,
      "goodsName": "1-month",
      "isHot": 0,
      "goodsType": 1
    },
 *
 * @param {*} type
 * @return {*} 
 */
export const gagaVipList =async (type) => {
    const res =await axios.post('/businessServlet/gagaVipList',{
        type
    })
    return res.data

}

/*  
*获取用户会员信息
*/
export const getVipUserInfo =async () => {
    const res =await axios.post('/businessServlet/gagaVipUserInfo')
    return res.data
}


export /**
 *
 *
 * @param {*} goodsId    商品id
 * @param {*} goodsType  
 * @param {*} price
 * @param {*} recommendGagaId
 * @param {*} thirdPayId
 * @return {*} 
 */
const payOrder =async (goodsId, goodsType, price,recommendGagaId,thirdPayId) => {

    const res =await axios.post("/businessServlet/payOrder", {
      goodsId,
      goodsType,
      price,
      recommendGagaId,
      thirdPayId
    });
    return res.data

  }