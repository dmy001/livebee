import axios from "../http";
///gagaServer/businessServlet/commonIdentityInfoAdd

/**
 * 提交身份（直播）认证
 * @param {*} data 
 * data @param cardBack  证件背面
 * data @param cardFront   证件正面
 * data @param cardHand   手持证件
 * data @param idCard   证件号码
 * data @param realName   姓名
 * data @param alipay    支付宝账号
 * @returns 
 */
export const submitIdentityInfo = async (data) => {
    const res =await axios.post('businessServlet/commonIdentityInfoAdd', data)
    return res.data

}