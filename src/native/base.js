//判断访问终端
 export const browserVersion = () => {
    const u = navigator.userAgent;
    return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
}

// Android  jsbridge 是否初始化标志
let androidinitFlag = false;
// 记录设备信息
const device = browserVersion();

//  初始化bridgeInit,  安卓需要初始化
const bridgeInit = () => {
    try {
        WebViewJavascriptBridge.init((message, responseCallback) => { });
    } catch (e) {
        console.log('no need init')
    }
}

// 获取 WebViewJavascriptBridge, ios 和 Android 获取方式稍微有些区别
const jsbridge = (callback) => {

    if (device.iPhone) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    }

    if (device.android) {
        if (window.WebViewJavascriptBridge) {
            console.log('android has jsb')
            if (!androidinitFlag) {
                bridgeInit();
                androidinitFlag = true;
            }
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener(
                'WebViewJavascriptBridgeReady'
                , function () {
                    if (!androidinitFlag) {
                        bridgeInit();
                        androidinitFlag = true;
                    }
                    callback(WebViewJavascriptBridge)
                },
                false
            );
        }
    }
}


// jsbridger函数方法注册
export const jsbridgeHandlerRegister = (handlerName, callback) => {
    jsbridge((bridge) => {
        bridge.registerHandler(handlerName, callback)
    })
}

// jsbridger函数方法调用
export const jsbridgeHandlerCall = (handlerName, data, callback) => {
    jsbridge((bridge) => {
        bridge.callHandler(handlerName, data, callback)
    })
}


  // jsbridgeHandlerRegister('touchFromApp',function(response){
  //   demo1.innerHTML = "touchapp:"+response
  //   console.log('touchapp has called')
  // })
  // console.log("after touchapp")

  // jsbridgeHandlerRegister('sendMsg',function(response,resCallback){
  //   demo2.innerHTML = 'sendmsg:'+response
  //   resCallback('abcd')
  // })

  // function jdbCallApp(){
  //   jsbridgeHandlerCall('jumpPage', 'Foo')
  // }

  // function jdbCallAppSum(){
  //   jsbridgeHandlerCall('sum', '1', function(response){
  //     console.log('response:'+response)
  //     demo3.innerHTML = response
  //   })
  // }

