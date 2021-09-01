import axios from "../http";
import MD5 from "react-native-md5";
import { updateUserInfo } from '@native'
import i18n from '../../i18n/index'
/**
 * 密码登陆
 * @param {*} account 账号
 * @param {*} secret 密码
 * @returns 
 */
export const loginPassword =async (account, secret) => {
    const res =await axios.post('login/password', {
        account,
        secret: MD5.b64_md5(secret),
    })
    return res.data

}
export const getUserInfoBase = async () => {
    const res = await axios.get('api/user/userinfo');
    localStorage.setItem("baseUserInfo", JSON.stringify(res.data.data.baseUserInfo));
    localStorage.setItem(
        "privateUserInfo",
        JSON.stringify(res.data.data.privateUserInfo)
    );
    _judgeLangId(res.data.data.baseUserInfo.langId);

    return res.data
}
export const getUserInfo = async () => {
    const res = await getUserInfoBase();
    updateUserInfo(res.data)
    return res.data
}


const _judgeLangId = (langId) => {
    const curLangId = langId == "zh_CN" ? 'zh-cn' : "en-us"
    let language = localStorage.getItem('lhLangguage');
    if (language !== curLangId) {
        localStorage.setItem('lhLangguage', curLangId);
    }
    if (i18n.global.locale !== curLangId) {
        i18n.global.locale = curLangId
    }


}
