import axios from "axios";
import router from "../router"
import { Toast } from "vant";
import { nativeParameter, globalBootstrap } from "../global";
import i18n, { trans } from '@i18n';
const env = import.meta.env
// debugger
// axios.defaults.baseURL = "http://172.21.1.155:8480/gagaServer/";
axios.defaults.baseURL = env.VITE_SERVICE_URI;
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = false; // 表示跨域请求时是否需要使用凭证  默认 false
// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers["Content-Type"] = "application/json";
// axios.defaults.headers["application-id"] = "com.app.hilive";
axios.defaults.headers['userAgent'] = navigator.userAgent;
// axios.defaults.headers['imei'] = nativeParameter.imei;
// axios.defaults.headers['os'] = nativeParameter.os;
// axios.defaults.headers['version'] = nativeParameter.version;
// axios.defaults.headers['channelId'] = nativeParameter.channelId;
axios.defaults.headers['lang'] = i18n.global.locale;
axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token") || 'ef79a4a9cd0b4c3bb102c8f76282b38b'
    // token && (config.headers.Authorization = token);
    //  debugger
    token && (config.headers.token = token);
    if (!nativeParameter.isUpdated && router.currentRoute.value.query.awaitParam === 'true') {
      await globalBootstrap();
    }
    config.headers.lang = i18n.global.locale;
    config.headers.version = nativeParameter.version;
    config.headers.channelId = nativeParameter.channelId;
    config.headers["application-id"] = nativeParameter.applicationId;
    config.headers.imei = nativeParameter.imei;
    config.headers.os = nativeParameter.os;

    // debugger
    return config;
  },
  (error) => {
    // Toast.fail(error)
    return Promise.reject(error);
  }
);

// axios.defaults.validateStatus = status => {
//   return /^(2|3)\d{2}&/.test(status)
// }

axios.interceptors.response.use(
  (response) => {
    // debugger
    const { data } = response;
    // Toast(i18n.$trans('home.translateTimeout'))
    if (
      // 游客
      (data && data.code === 200 && data.status === 400 && data.msg && data.msg.includes('未发现用户信息')) ||
      // token过期
      (data && data.code === 400 && data.status === 6)
    ) {
      console.log('页面过期，请重新登录')
      localStorage.clear();
      return router.push('/login/login')
    }
    return response;
  },
  (error) => {

    const { response, message } = error;
    if (message && message.includes('timeout')) {
      Toast.fail('操作失败，请重试')
    }
    if (response) {
      switch (response.status) {
        case 401:
          // 权限
          break;
        case 403:
          // token  过期， 服务器拒绝
          break;
        case 404:
          // 找不到
          // Toast.fail('Not find')
          break;
        case 500:
          // 服务器错误
          break;
        default:
          // 其他错误
          break;
      }
      return Promise.reject(error);
    } else {
      debugger
      if (!window.navigator.onLine) {
        // 断网
        Toast.fail(trans('无网络链接'))
        // if (nativeParameter.lang == 'zh-cn') {
        //   Toast.fail('无网络链接')
        // } else {
        //   Toast.fail('No network')
        // }
      }
      // if (i18n.locale == 'zh') {
      //   Toast.fail('未知错误')
      // } else {
      //   Toast.fail('unknown error')
      // }
      return Promise.reject(error);
    }
  }
);

export default axios;
