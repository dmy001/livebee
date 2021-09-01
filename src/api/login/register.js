import axios from "../http";
import MD5 from "react-native-md5";
// 
/**
 * 获取手机号注册的验证码
 * @param {*} mobileNumber 手机号
 * @param {*} locationCode 手机号代码前缀
 * @returns 
 */
export const getRegisterSMSCode = async (mobileNumber, locationCode) => {
    const res = await axios.post('businessServlet/commonMobileCheckCode', {
        mobileNumber,
        locationCode
    })
    return res.data

}

/**
 * 验证手机号是否已注册
 * @param {*} mobileNumber 
 * @param {*} locationCode 
 * @returns 
 */
export const usedMobileNumber = async (mobileNumber, locationCode) => {
    const res = await axios.post('businessServlet/commonIsMobileNumberUsed', {
        mobileNumber,
        locationCode
    })
    return res.data

}

/**
 * 验证邮箱是否已注册
 * @param {*} email 邮箱账号
 * @returns 
 */
export const usedEmailNumber = async (email) => {
    const res = await axios.post('businessServlet/commonIsBingEmailUsed', {
        email
    })
    return res.data

}
/**
 * 获取邮箱注册的验证码
 * @param {*} email 邮箱账号
 * @param {*} 
 * @returns 
 */
export const getRegisterCheckCode = async (email) => {
    const res = await axios.post('businessServlet/commonEmailCheckCode', {
        email,
    })
    return res.data

}

/**
 * 手机号注册
 * @param {*} mobile 手机号
 * @param {*} password 密码
 * @param {*} smscode 验证码
 * @param {*} locationCode 手机号代码前缀
 * @returns 
 */
export const submitRegisterMobile =async (mobile, password, smscode, locationCode) => {
    const pwd = MD5.b64_md5(password)
    const res =await axios.post('signup/mobile', {
        mobile,
        smscode,
        locationCode,
        password: pwd
    })
    return res.data

}

/**
 * 邮箱注册
 * @param {*} email 邮箱账号
 * @param {*} password 密码
 * @param {*} checkcode 验证码
 * @returns 
 */
export const submitRegisterEmail =async (email, password, checkcode) => {
    const res =await axios.post('signup/email', {
        checkcode,
        email,
        password: MD5.b64_md5(password)
    })
    return res.data

}