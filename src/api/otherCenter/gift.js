import axios from "../http";

/**
 * 关注人信息
 * @param {*} visitorGagaId 关注人账号
 * @returns 
 */
export const getOtherUser =async (visitorGagaId) => {
    const res =await axios.post('businessServlet/gagaUserHomePageOther', {
        visitorGagaId
    });
    return res.data

}


/**
 * 展示礼物列表
 * @param {*} userId 他人Id
 * @returns 
 */
export const getUserGifts =async (toUserGagaId, page = 1, size = 5) => {
    const res =await axios.get(`api/gift/records/v1?toUserGagaId=${toUserGagaId}&page=${page}&size=${size}`)
    return res.data

}


// /**
//  * 删除礼物信息
//  * @param {*} uuid 礼物Id
//  * @returns 
//  */
// export const dleteGift = (uuid) => {
//     return axios.post('businessServlet/goodsGiftDelete', {
//         uuid
//     })
// }


/**
 * 加关注
 * @param {*} likedGagaId 关注人Id
 * @returns 
 */
export const getLikedGagaId =async (likedGagaId) => {
    const res =await axios.post('businessServlet/gagaUserLike', {
        likedGagaId
    })
    return res.data

}


