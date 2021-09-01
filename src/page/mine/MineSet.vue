<template>
    <div style="background-color: #f9f9f9; height: calc(100vh - 104px)">
        <ul class="bg-white mx-1">
            <router-link to="/mine/mineLangWith/lang">
                <li class="flex pl-3 pb-4">
                    <p>{{ $trans('语言设置') }}</p>
                    <p class="ml-auto text-gray-300">{{ currentLang }}</p>
                    <p class="bg-mineRight-right w-6 h-6"></p>
                </li>
                <hr class="mr-2 ml-3" style="border: 0.03rem solid; color: #edf0f1" />
            </router-link>
            <router-link to="/mine/mineLangWith/with">
                <li class="flex pl-3 pt-4 pb-4">
                    <p>{{ $trans('关于') }} LiveBee</p>
                    <p class="ml-auto bg-mineRight-right w-6 h-6"></p>
                </li>
                <!-- <hr class="mr-2 mt-4 ml-3" style="border: 0.03rem solid; color: #edf0f1" /> -->
            </router-link>
        </ul>
        <section class="bg-white mt-5">
            <button class="text-center w-full pt-4 pb-4" @click="onExit()">{{ $trans('退出') }}</button>
        </section>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { exitLogin } from '../../api/mine/mineedit';
import { getUserInfo } from '@api/login/login.js';
import { useRouter } from 'vue-router';
import { trans } from '../../i18n';
import { reactive, toRefs, onMounted } from 'vue';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        store.dispatch('base/changeNavBarTitile', trans('设置'));
        store.dispatch('base/showNavBarBg');
        store.dispatch('base/showNavBar');
        const state = reactive({
            currentLang: '',
            list: [
                {
                    langName: '简体中文',
                    langId: 'zh_CN',
                },
                {
                    langName: 'English',
                    langId: 'en',
                },
            ],
            listindex: ['zh_CN', 'en'],
            currentIndex: 0,
        });
        const onExit = async () => {
            // const a = await exitLogin();
            await exitLogin();
            // debugger;
            localStorage.clear();
            router.push('/');
        };
        onMounted(async () => {
            await getUserInfo();
            const langId = JSON.parse(localStorage.getItem('baseUserInfo')).langId;
            state.currentIndex = state.listindex.indexOf(langId); // langId
            state.currentLang = state.list[state.currentIndex].langName;
        });
        return {
            ...toRefs(state),
            onExit,
        };
    },
    // data() {
    //     return {
    //         currentLang: '',
    //         currentIndex: 0,
    //         list: [
    //             {
    //                 langName: '简体中文',
    //                 langId: 'zh_CN',
    //             },
    //             {
    //                 langName: 'English',
    //                 langId: 'en',
    //             },
    //         ],
    //         listindex: ['zh_CN', 'en'],
    //     };
    // },
    // methods: {
    //     ...mapActions('base', ['showNavBarBg', 'changeNavBarTitile', 'showNavBar']),
    //     async onExit() {
    //         localStorage.clear();
    //         this.$router.push('/');
    //         return await exitLogin();
    //     },
    // },
    // created() {
    //     this.showNavBar();
    //     this.showNavBarBg();
    //     this.changeNavBarTitile(this.$trans('设置'));
    // },
    // async mounted() {
    //     await getUserInfo();
    //     const langId = JSON.parse(localStorage.getItem('baseUserInfo')).langId;
    //     this.currentIndex = this.listindex.indexOf(langId); // langId
    //     this.currentLang = this.list[this.currentIndex].langName;
    // },
};
</script>

