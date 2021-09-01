import axios from "../http";
export const getAllLangs = async () => {
  const res = await axios.get('http://172.21.1.191:8080/getLangs')
  return res.data

}
/**
 * 设置语言
 * @param {*} Chinese 
 * @param {*} English 
 * @param {*} key 
 * @returns 
 */
export const editLangs = async (Chinese, English, key) => {
  const res = await axios.post('http://172.21.1.191:8080/setLangs', { Chinese, English, key })
  return res.data

}

export const deleteLangItem = async (key) => {
  const res = await axios.post('http://172.21.1.191:8080/deleteLangItem', { key })
  return res.data

}

export const gitPushLangs = async () => {
  const res = await axios.post('http://172.21.1.191:8080/gitPushLangs')
  return res.data

}
/**
*langs": [
   {
     "langName": "Deutsch",
     "langId": "de"
   },
   {
     "langName": "English",
     "langId": "en"
   },
   {
     "langName": "Español",
     "langId": "es"
   },
   {
     "langName": "日本語",
     "langId": "ja_JP"
   },
   {
     "langName": "한국어",
     "langId": "ko_KR"
   },
   {
     "langName": "русский",
     "langId": "ru"
   },
   {
     "langName": "简体中文",
     "langId": "zh_CN"
   },
   {
     "langName": "繁体中文",
     "langId": "zh_TW"
   }
 ],
*
* @return {*} 
*/
export const DictLanguageList = async () => {
  const res = await axios.post('commonService/dictLanguageList');
  return res.data
}