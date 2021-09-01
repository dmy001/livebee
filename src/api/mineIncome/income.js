import axios from "../http";


/**
 * 收益记录列表信息
 * @param {*} pageNo 要请求第几页的数据
 * @returns 
 */
export const getEarningRecord =async (pageNo) => {
    const res =await axios.post('businessServlet/commonEarningRecord', {
        pageNo
    })
    return res.data

}
//提现金额
export const walletMyMoney =async () => {
    const res =await axios.post('businessServlet/commonQueryBalance')
    return res.data

}

// 申请提现
export const extractApply=async (amount) => {
    const res =await axios.post('businessServlet/commonExtractApply',{
        amount 
    })
    return res.data

}
//获取身份认证
export const identityInfoQuery  =async () => {
    const res =await axios.post('businessServlet/commonIdentityInfoQuery')
    return res.data

}

/**
 * 提现记录列表信息
 * @param {*} pageNo 要请求第几页的数据
 * @returns 
 */
export const getExtractRecord =async (pageNo) => {
    const res =await axios.post('businessServlet/commonExtractRecord', {
        pageNo
    })
    return res.data

}