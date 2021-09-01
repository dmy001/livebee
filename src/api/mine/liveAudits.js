import axios from "../http";
/**
 * 提交身份（直播）认证
 * @param {*} data 
 * data @param certificateBackImg 证件背面
 * data @param certificateFrontImg  证件正面
 * data @param certificateHandImg  手持证件
 * data @param certificateNumber  证件号码
 * data @param name  名称
 * data @param phoneCode 手机前缀号 
 * data @param phoneNum  手机号
 * data @param type  认证类型
 * @returns 
 */

export const submitLiveAudits = async (data) => {
    const res = await axios.post("api/live/audits/v2", data); 
    return res.data

}