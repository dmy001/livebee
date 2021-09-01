import { useRouter } from 'vue-router';
import { jumpToLive as jumpToLiveNative } from '@native';
export const useJumpToNative= () => {
   
    const router = useRouter();
    //点击进入直播间和判断未登录点击直播间跳转登录
    const jumpToLive = async homeId => {
        const token = localStorage.getItem('token');
        if ((token && token === 'ef79a4a9cd0b4c3bb102c8f76282b38b') || !token) {
            return router.push('/login/login');
        }
        jumpToLiveNative(homeId);

    };
    return {
        jumpToLive
        
    };
}