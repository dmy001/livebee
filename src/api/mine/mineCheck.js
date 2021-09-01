import axios from "../http";

export /**
 *
 *
 * @param {*} pageNo  有几页数据
 * @param {*} pageSize 一页有几项
 * @param {*} transType 交易类型
 * @return {
 *  {
    "msg": "",
    "code": 200,
    "list": [
  {
    "symbol": "-",
    "redType": null,
    "transType": 1,
    "money": 10,
    "gagaId": "d8ef8e297f2944d4b2353fec429a26f7",
    "orderId": "GAGA2021070103002748933",
    "createTime": "2021-07-01 03:00:27",
    "moneyType": 2,
    "thirdPayId": "zoneyetPay",
    "uuid": "5cb97725550041988a2a4f64a277ce14"
  },
 * 
 * } 
 */
    const getwalletUserTranslationLog =async (pageNo, pageSize, transType) => {
      const res =await axios.post('businessServlet/walletUserTranslationLog', {
            pageNo,
            pageSize,
            transType
        });
        return res.data

    }