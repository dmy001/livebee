import axios from "../http";
/*  
*获取金币充值价格列表
*/
/**
*
*
* @return {
    {
      "IosId": "gold_1.99",
      "gold": "178",
      "money": "$1.99",
      "name": "178Gold"
    }, 
     {
      "IosId": "gold__19.99",
      "gold": "1780",
      "money": "$19.99",
      "name": "1780Gold"
    },
} 
*/
export const getMineGold = async () => {
  const res = await axios.post("/businessServlet/payRechargeList");

  // return {
  //   data: [
  //     {
  //       "IosId": "gold_1.99",
  //       "gold": "178",
  //       "money": "$1.99",
  //       "name": "178Gold"
  //     },
  //     {
  //       "IosId": "gold__19.99",
  //       "gold": "1780",
  //       "money": "$19.99",
  //       "name": "1780Gold"
  //     },
  //     {
  //       "IosId": "gold_1.99",
  //       "gold": "178",
  //       "money": "$1.99",
  //       "name": "178Gold"
  //     },
  //     {
  //       "IosId": "gold_1.99",
  //       "gold": "178",
  //       "money": "$1.99",
  //       "name": "178Gold"
  //     },
  //     {
  //       "IosId": "gold_1.99",
  //       "gold": "178",
  //       "money": "$1.99",
  //       "name": "178Gold"
  //     },
  //   ]
  // }
  return res.data
}


/*  
*获取个人账户金币剩余个数
*/
/**
*
*
* @return {{
 "msg": "",
 "gold": "0.00",
 "code": 200,
 "gagaId": "82fa4e15e6bd456690c176126c0b0d5c",
 "status": 0
}} 
*/
export const getMineGoldCount = async () => {
  const res = await axios.post("/businessServlet/walletMyGold");
  return res.data
}

/**  发送订单信息
 *   gagaId  
 *  gold
  * String PAY_GOOGLEPAY = "googleplay"; //支付方式
  * 
  * @return {*} 
  */
export const payOrderRecharge = async (gagaId, gold, thirdPayId) => {
  const res = await axios.post("/businessServlet/payOrderRecharge", {
    gagaId,
    gold,
    thirdPayId
  });
  return res.data
}