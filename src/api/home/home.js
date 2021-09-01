
import { homeLiveFakeData } from "./homeLive";

import axios from "../http";
//轮播图
/**
 * 
 * @param {*} currentTime 
 * @param {*} flag 
 * @returns 
 */


//  adPosition位置(0：app发现1：app我的2：app国际圈3：app偶遇100：pc偶遇101：pc动态102：pc左栏)
export const commerceShow = async (currentTime, flag = '') => {

    const res = await axios.post('/businessServlet/adCommerceShow', {
        currentTime,
        flag
    }, {
        headers: { 'application-id': 'com.zoneyet.hilive' }
    });
    return res.data
  
};
//直播数据
export const getoptimized = async (page = 0, size = 5) => {
// return homeLiveFakeData;


    const res = await axios.get(`api/live/public/optimized-rooms?page=${page}&size=${size}`) ;
if(res.data.data &&res.data.data.pageData.totalElements === 0 ){
return  homeLiveFakeData
} 
return res.data

};
