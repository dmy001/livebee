
<template>
    <div>
        <div class="container mx-auto">
            <div class="contop bg-jinbi-bg h-80 pt-11">
                <!-- 设置了padding-top -->
                <div class="nav flex w-full h-11 justify-between pl-5 items-center">
                    <span class="text-white font-semibold text-xl font-font1 h-7">{{ $trans('我的') }}</span>
                    <!-- <router-link to="/mine/mineService"> -->

                    <!-- </router-link> -->
                </div>
                <div class="mx-auto">
                    <div class="ava mt-6 mx-auto">
                        <div class="relative w-20 h-20 mx-auto">
                            <img class="rounded-full w-20 h-20 inline" :src="avaimg" alt="" />
                            <router-link to="/mine/mineEdit">
                                <img
                                    class="absolute left-14 top-14 w-5"
                                    src="@img/mine/mine/mineBi@2x.png"
                                    alt=""
                                />
                            </router-link>
                        </div>
                        <div class="text-center mt-2">
                            <span class="text-white text-xl">{{ nickName }} </span>
                            <img
                                class="h-5 w-5 inline-block mb-2"
                                src="@img/mine/mine/mineZuan@2x.png"
                                alt=""
                            />
                        </div>
                        <p
                            class="
                                text-white
                                mt-2
                                text-xs
                                overflow-hidden
                                whitespace-nowra
                                overflow-ellipsis
                                text-center
                            "
                        >
                            ID:{{ id }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="bottom flex flex-col items-center justify-center">
                <div class="middle flex -mt-10 w-full justify-center">
                    <!-- <router-link :to="{ name: 'mineVip' }">
                        <div
                            class="item flex w-44 h-20 justify-center items-center border rounded-lg bg-white shadow-md"
                        >
                            <img class="w-12 h-12 mr-3" src="@img/mine/mine/mineZuanshi@2x.png" alt="" />
                            <div>
                                <p class="text-common-grey1 font-semibold font-common">VIP</p>
                                <p class="text-jinbi-C7C4CC">{{ $trans('升级会员') }}</p>
                            </div>
                            <img class="w-6 h-6" src="@img/mine/mine/mineArr@2x.png" alt="" />
                        </div>
                    </router-link> -->

                    <div
                        class="
                            item
                            flex
                            h-20
                            rounded-lg
                            bg-white
                            shadow-md
                            w-full
                            items-center
                            px-2
                            mx-2
                            max-w-xl
                        "
                        @click="goGold()"
                    >
                    
                        <img class="w-12 h-12 mr-3 ml-3" src="@img/mine/mine/mineGold@2x.png" alt="" />
                        <div>
                            <p class="text-common-grey1 font-semibold font-sans text-base">
                                {{ $trans('金币') }}
                            </p> 
                            <p class="text-jinbi-C7C4CC text-xs">{{ $trans('立即储值') }}</p>
                        </div>
                        <img class="w-6 h-6 ml-auto" src="@img/mine/mine/mineArr@2x.png" alt="" />
                    </div>
                </div>
                <MineList></MineList>
            </div>
        </div>

        <CommonFooterTabBar current="mine" />
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import MineList from '@components/mine/MineList.vue';
import CommonFooterTabBar from '@components/common/CommonFooterTabBar.vue';
export default {
    
    components: {
        MineList,
        CommonFooterTabBar,
    },
    // data() {
    //     return {
    //         avaimg: '',
    //         nickName: '',
    //         id: '',
    //     };
    // },
    setup() {
        const store = useStore();
        const router = useRouter();
        const state = reactive({
            avaimg: '',
            nickName: '',
            id: '',
        });
        store.dispatch('base/hideNavBar');
        const toDetail = () => {
            router.push('/detail');
        };
        const goGold = () => {
            router.push('/mine/mineGold');
        };
        const baseUserInfo = localStorage.getItem('baseUserInfo');
        if (!baseUserInfo) {
            router.push('/login/login');
        }
        onMounted(() => {
            const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo'));
            if (!baseUserInfo) return router.push('/login/login');
            state.avaimg =
                baseUserInfo.avatarUrl ||
                'https://img1.baidu.com/it/u=2996250653,3603163890&fm=26&fmt=auto&gp=0.jpg'; // 如果头像地址不存在，给一个默认头像
            state.nickName = baseUserInfo.nickName || '欢乐的gaga'; //如果名字不存在，给一个默认的名字
            state.id = baseUserInfo.username;
        });
        return {
            ...toRefs(state),
            goGold,
            toDetail,
            baseUserInfo,
        };
    },
    // methods: {
    // ...mapActions('base', ['hideNavBar']),
    // toDetail() {
    //     this.$router.push('/detail');
    // },
    // goGold() {
    //     this.$router.push('/mine/mineGold');
    // },
    // },
    // created() {

    //     const baseUserInfo = localStorage.getItem('baseUserInfo');
    //     if (!baseUserInfo) return this.$router.push('/login/login');
    // },
    // mounted() {
    //     //获取用户基本信息
    //     const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo'));
    //     if (!baseUserInfo) return this.$router.push('/login/login');
    //     this.avaimg =
    //         baseUserInfo.avatarUrl ||
    //         'https://img1.baidu.com/it/u=2996250653,3603163890&fm=26&fmt=auto&gp=0.jpg'; // 如果头像地址不存在，给一个默认头像
    //     this.nickName = baseUserInfo.nickName || '欢乐的gaga'; //如果名字不存在，给一个默认的名字
    //     this.id = baseUserInfo.username;
    // },
};
</script>

