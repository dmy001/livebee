import axios from "../http";
import MD5 from "react-native-md5";
/**
 * 邮箱找回密码
 * @param {*} email 邮箱账号
 * @param {*} password 新密码
 * @returns 
 */
export const emailResetPassword =async (email, password) => {
    const res =await axios.post('businessServlet/settingEmailResetPassword', {
        email,
        password: MD5.b64_md5(password)
    });
    return res.data

}

/**
 * 手机找回密码
 * @param {*} mobileNumber 手机号
 * @param {*} locationCode 手机号代码前缀
 * @param {*} checkCode 手机验证码
 * @param {*} password  新密码
 * @returns 
 */
export const mobileResetPassword =async (mobileNumber, checkCode, password, locationCode) => {
    const res =await axios.post('businessServlet/settingMobileResetPassword', {
        mobileNumber,
        checkCode,
        password: MD5.b64_md5(password),
        locationCode

    });
    return res.data

}

/**
 * 获取手机找回密码的验证码
 * @param {*} mobileNumber 手机号
 * @param {*} locationCode 手机号代码前缀
 * @returns 
 */
export const getMobileResetSMSCode =async (mobileNumber, locationCode = 86) => {
    const res =await axios.post('businessServlet/commonMobileCheckCode', {
        mobileNumber,
        locationCode
    })
    return res.data

}
/**
 * 获取邮箱找回密码的验证码
 * @param {*} email 邮箱账号
 * @param {*} 
 * @returns 
 */
export const getEmailResetCheckCode =async (email) => {
    const res =await axios.post('businessServlet/commonEmailCheckCode', {
        email,
    })
    return res.data

}