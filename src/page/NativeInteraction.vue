<template>
    <van-tabs v-model:active="active">
        <van-tab title="使用">
        <label for="">跳转到直播页面</label>
        <button class="border-2 rounded border-blue-400 pl-4 pr-20  block  py-3 text-red-500 font-bold tracking-wider ">jumpToLive</button>
        <label for="">购买商品，将商品id，内购id告诉app</label>
        <button class="border-2 rounded border-blue-400 pl-4 pr-20  block  py-3 text-red-500 font-bold tracking-wider ">sendProductIdToApp</button>
        <label for="">用户退出登陆了</label>
        <button class="border-2 rounded border-blue-400 pl-4 pr-20  block  py-3 text-red-500 font-bold tracking-wider ">userLoginOut </button>
          <label for="">H5登录成功后，将token传给app</label>
        <button class="border-2 rounded border-blue-400 pl-4 pr-20  block  py-3 text-red-500 font-bold tracking-wider ">sendTokenToApp</button>
         <label for="">发送token</label>
        <button class="border-2 rounded border-blue-400 pl-4 pr-20  block  py-3 text-red-500 font-bold tracking-wider ">sendToken </button>
          <label for="">发送用户数据</label>
        <button class="border-2 rounded border-blue-400 pl-4 pr-20  block  py-3 text-red-500 font-bold tracking-wider ">sendUserInfo</button>
          <label for="">金币立即支付</label>
        <button class="border-2 rounded border-blue-400 pl-4 pr-20  block  py-3 text-red-500 font-bold tracking-wider ">payGold</button>
          <label for="">vip立即支付</label>
        <button class="border-2 rounded border-blue-400 pl-4 pr-20  block  py-3 text-red-500 font-bold tracking-wider ">payVip </button>
          <label for="">版本立即更新</label>
        <button class="border-2 rounded border-blue-400 pl-4 pr-20  block  py-3 text-red-500 font-bold tracking-wider ">versionUpdate </button>
        </van-tab>
        <van-tab title="注册">
        <label for="">从app获取token用户信息</label>
        <button class="border-2 rounded border-blue-400 pl-4 pr-20  block  py-3 text-red-500 font-bold tracking-wider ">getUserTokenFromApp </button> 
        </van-tab>
    </van-tabs>
</template>

<script>
import { createApp } from 'vue';
import { Tab, Tabs } from 'vant';
import { ref } from 'vue';

export default {
    setup() {
        const active = ref(2);
        return { active };
    },
};
</script>

