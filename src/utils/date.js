
/**
 * 根据生日获取年龄
 * @param {string} birthday 生日 // '2021-07-01' 
 * @returns 年龄
 */
export const getAgeByBirthday = (birthday) => {
    const birthdayDate = new Date(birthday);
    const now = new Date();
    let age = 0
    // 年数差
    const yearDiff = age = now.getFullYear() - birthdayDate.getFullYear();
    // 年龄错误
    if (yearDiff < 0) return -1;
    // 月份差
    const monthDiff = now.getMonth() - birthdayDate.getMonth();
    if (monthDiff > 0) return age
    else if (monthDiff < 0) {
        age--
        return age
    }
    const dayDiff = now.getDate() - birthdayDate.getDate();
    if (dayDiff < 0) {
        age--
        return age
    }
    return age
}
/**
 * 格式化时间对象
 * ****注意
 * 1： new Date()时   内部参数不能有-
 * @example dateFormat(new Date(),'YYYY-mm-dd HH-MM-SS') => '2021-07-03 11-14-00'
 * @param {*} date Date对象实例
 * @param {*} fmt 格式化规则
 * @returns 格式化后的字符串
 */
export const dateFormat = (date, fmt) => {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

//根据天数计算到期时间
/**
 *
 *
 * @param {*} calValue 剩余天数
 * @return {*} 
 */
export const showDate = (calValue)=>{     
    var dateObj = new Date();   // 获取当地时间
    var curYear = dateObj.getFullYear();// 获取年份
    var curMonth = dateObj.getMonth() + 1; // 获取月份
    var curDate = dateObj.getDate();  //获取天数
    curMonth = curMonth > 9 ? curMonth : "0" + curMonth; // 
    curDate = curDate > 9 ? curDate : "0" + curDate;
    var dateParameter = curYear + "/" + curMonth + "/" + curDate;
    var returnDate = "";
    returnDate = calculateDate(dateParameter, calValue);
    return returnDate;
}



function calculateDate(dateParameter, calValue) {
    var calValue = Number(calValue);
    var newDate = new Date(dateParameter);
    //返回日期的毫秒值
    newDate = newDate.valueOf();
    //加/减天数后的毫秒值
    newDate = newDate + calValue * 24 * 60 * 60 * 1000;
    newDate = new Date(newDate);

    //如果月份长度少于2，则前加 0 补位
    var month = newDate.getMonth() + 1;
    var month = month > 9 ? month : "0" + month;

    //如果天数长度少于2，则前加 0 补位
    var date = newDate.getDate();
    var date = date > 9 ? date : "0" + date;

    var returnDate = newDate.getFullYear() + "-" + month + "-" + date;
    return returnDate;
}