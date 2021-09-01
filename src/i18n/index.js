import { createI18n } from 'vue-i18n'
import { formatLangId } from "@utils";
import en from './langs/en.json'
import zh_cn from './langs/zh_cn.json'
const netLang = localStorage.getItem('lhLangguage') || navigator.language.toLocaleLowerCase() || 'en-us'
const currentLang = formatLangId(netLang)
const i18n = createI18n({
    locale: currentLang === 'zh-cn' ? currentLang : 'en-us',
    messages: {
        'zh-cn': zh_cn,
        'en-us': en,
    }
    // something vue-i18n options here ...
})
/**
 * 中文内容转换
 * @param {string} zhContent 中文内容
 * @param {string[]} params 
 * @returns 
 */
export const trans = (zhContent, params = []) => {
    const kv = Object.entries(zh_cn).find((it) => it[1] === zhContent);
    if (!kv) return zhContent;
    const [key] = kv;
    return i18n.global.t(key, params);
}


export default i18n