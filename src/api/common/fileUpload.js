
import axios from "../http";
/**
 * 获取上传七牛的授权token
 * @returns 上传七牛的token
 */
export const getFileUploadPrivate = async () => {
    const res = await axios.post("/businessServlet/fileUploadPrivate");
    return res.data
}

/**
 * 上传至七牛云
 * @param {*} token 授权token
 * @param {*} key 
 * @param {*} file 
 * @returns 
 */
export const upLoadToQiniu = async (token, key, file) => {
    const formData = new FormData()
    formData.append('token', token)
    formData.append('key', key)
    formData.append('file', file)
    const res =await axios.post('https://upload.qiniup.com/', formData);
     return res.data
}
