import { getParameter } from "@native";
// 原生参数
export const nativeParameter = {
    imei: 'hl-h5',
    os: 'h5',
    version: 130,
    channelId: 1,
    applicationId: 'com.app.hilive',
    isUpdated: false
    // lang: 'zh-cn'
};
export const globalBootstrap = async () => {
    const [version, channelId, applicationId, os, imei] = await Promise.all([
        getParameter('version'),
        getParameter('channelId'),
        getParameter('application-id'),
        getParameter('os'),
        getParameter('imei'),
    ])
    Reflect.set(nativeParameter, 'version', version)
    Reflect.set(nativeParameter, 'channelId', channelId)
    Reflect.set(nativeParameter, 'applicationId', applicationId)
    Reflect.set(nativeParameter, 'os', os)
    Reflect.set(nativeParameter, 'imei', imei)
    Reflect.set(nativeParameter, 'isUpdated', true)
    // nativeParameter.lang = langId
}
globalBootstrap()


//     console.log(window.navigator.onLine)
// if (!window.navigator.onLine) {
//     // 断网
//     if (nativeParameter.lang == 'zh-cn') {
//         Toast.fail('无网络链接')
//     } else {
//         Toast.fail('No network')
//     }
// }
