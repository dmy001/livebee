import axios from "../http";

/**
 * 修改昵称
 * @param {*} nickname 昵称
 * @returns 
 */
export const setMineEditNickname = async (nickname) => {
    const res = await axios.post('businessServlet/settingNickname', {
        nickname,
    })
    return res.data
}
/**
 * 修改性别
 * @param {*} genderId 性别值
 * @returns 
 */
export const setMineEditGender = async (genderId) => {
    const res = await axios.post('businessServlet/settingGender', {
        genderId
    })
    return res.data

}
export const setMineEditCountry = async (countryId) => {
    const res = await axios.post('businessServlet/settingCountry', { countryId })
    return res.data

}
/**
 * 修改职业
 * @returns {*} job 职业名称
 * @returns {*} jobId 职业id
 * 
 */
export const setMineEditJob = async (job, jobId) => {
    const res = await axios.post('businessServlet/settingJob', { job, jobId })
    return res.data
}
/**
 * 修改职业
 * @returns {*} height 身高值
 * 
 */
export const setMineEditHeight = async (height) => {
    const res = await axios.post('businessServlet/settingHeight', {
        height
    })
    return res.data

}
/**
 * 修改年龄
 * @param {*} birthday 年龄
 * @param {*} isOpenAge 年龄开关按钮
 * @returns 
 */
export const setMineEditAge = async (birthday, isOpenAge) => {
    const res = await axios.post('businessServlet/settingBirthday', {
        birthday, isOpenAge
    })
    return res.data

}
/**
 * 修改个性签名
 * @param {*} signature 个性签名
 * @returns 
 */
export const setMineEditSignature = async (signature) => {
    const res = await axios.post('businessServlet/settingSignature', {
        signature
    })
    return res.data

}
/**
 * 修改体重
 * @param {*} weight 体重
 * @returns 
 */
export const setMineEditWeight = async (weight) => {
    const res = await axios.post('businessServlet/settingWeight', {
        weight
    })
    return res.data

}
/**
 * 修改爱好
 * @param {*} interest 爱好值
 * @param {*} interestId 爱好id
 * @returns 
 */
export const setMineEditInterest = async (interest, interestId) => {
    const res = await axios.post('businessServlet/settingInterest', {
        interest, interestId
    })
    return res.data

}
/**
 * 获取爱好列表
 * @returns 
 */
export const setMineEditInterestList = async () => {
    const res = await axios.post('commonService/dictInterestList', {
    })
    return res.data

}
/**
 * 获取职业列表
 * @returns 
 */
export const setMineEditWorkList = async () => {
    const res = await axios.post('commonService/dictJoblist', {
    })
    return res.data
}
/**
 * 获取城市列表
 * @returns 
 */
export const dictCountryList = async () => {
    const res = await axios.post('commonService/dictCountryList', {
    })
    return res.data
}

/**
 * 获取我的访客
 * @param {*} pageNo 有几页数据
 * @returns 
 */
export const getgagaUserRecentVisitors = async (pageNo) => {
    const res = await axios.post('businessServlet/gagaUserRecentVisitors', {
        pageNo
    })
    return res.data

}
/**
 * 绑定手机
 * @param {*} checkCode 验证码
 * @param {*} locationCode 手机号前缀
 * @param {*} mobileNumber 手机号
 * @returns 
 */
export const setMobileNumber = async (checkCode, locationCode, mobileNumber) => {
    const res = await axios.post('businessServlet/settingMobileNumber', {
        checkCode, locationCode, mobileNumber
    })
    return res.data

}
/**
 * 绑定邮箱
 * @param {*} email 邮箱
 * @param {*} pid pid值
 * checkCode checkCode 邮箱验证码
 * @returns 
 */
export const settingEmail = async (email, checkCode) => {
    const res = await axios.post('businessServlet/settingEmail', {
        email, checkCode
    })
    return res.data

}
/**
 * 更新头像
 * @param {*} fileCount 文件数量
 * @param {*} fileType 文件类型
 * @param {*} groupNo 
 * @param {*} isCallBack 回调
 * 
 * @returns 
 */
export const getfileUpload =async (fileCount, fileType, groupNo, isCallBack) => {
    const res =await axios.post('businessServlet/fileUpload', {
        fileCount, fileType, groupNo, isCallBack
    })
    return res.data

}
/**
 * 退出登录
 * @returns 
 */
export const exitLogin =async () => {
    const res =await axios.post('businessServlet/commonQuit')
    return res.data

}

/**
 * 设置语言
 * langId
 * "en","zh_CN"
 * @returns 
 */
export const setLanguage =async (lang_id) => {
    const res =await axios.post('businessServlet/settingLang', { lang_id })
    return res.data

}

