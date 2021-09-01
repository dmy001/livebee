// import { followLiveFakeData } from "./followlive";
// import { followNotLiveFakeData } from "./followNotlive";
//   已关注主播直播中 
import axios from "../http";
export const getSubscribedRooms = async () => {
    //return {data:followLiveFakeData}
    const res = await axios.get('api/live/rooms/subscribed');
    return res.data
};

//   已关注主播未开播
export const getSubscribedNobroadcast =async (page = 0, size = 5) => {
    //  return {data:followNotLiveFakeData}
    const res = await axios.get(`api/live/anchors/subscribed/notLive?page=${page}&size=${size}`);
    return res.data

};
