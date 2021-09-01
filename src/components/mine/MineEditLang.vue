<template>
    <div style="background-color: #f9f9f9; height: calc(100vh - 104px)">
        <ul class="bg-white">
            <li v-for="(item, index) in list" :key="index" class="mx-5">
                <div class="flex pt-5 pb-5 items-center" @click="changeIndex(index)">
                    <p>{{ item.langName }}</p>
                    <img
                        v-show="index === currentIndex"
                        class="ml-auto w-8"
                        src="/src/assets/img/mine/mine/select.png"
                        alt=""
                    />
                </div>
                <hr v-show="index !== list.length - 1" style="border: 0.03rem solid; color: #edf0f1" />
            </li>
        </ul>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted, onUnmounted } from 'vue';
import { trans } from '@i18n';
import { useStore } from 'vuex';
import { DictLanguageList } from '@api/setLangs';
import { getUserInfo } from '@api/login/login.js';

export default {
    setup() {
        const store = useStore();
        const state = reactive({
            currentIndex: 0,
            list: [],
            listindex: ['zh_CN', 'en'],
        });
        const changeIndex = i => {
            state.currentIndex = i;
            store.dispatch('saveLanguage/changeLanguage', state.list[state.currentIndex].langId);
        };
        const getDictLanguageList = async () => {
            const res = await DictLanguageList();
            state.list[0] = res.langs[6];
            state.list[1] = res.langs[1];
        };

        store.dispatch('base/showNavBar');
        store.dispatch('base/showNavBarBg');
        store.dispatch('base/changeNavBarTitile', trans('语言设置'));
        store.dispatch('base/showSaveBtn');
        onMounted(async () => {
            getDictLanguageList();
            await getUserInfo();
            const langId = JSON.parse(localStorage.getItem('baseUserInfo')).langId;
            state.currentIndex = state.listindex.indexOf(langId); // langId
            store.dispatch('saveLanguage/changeLanguage', state.list[state.currentIndex].langId);
        });
        onUnmounted(() => {
            store.dispatch('base/hideSaveBtn');
        });
        return {
            ...toRefs(state),
            changeIndex,
            onMounted,
            // getDictLanguageList,
        };
    },
    // data() {
    //     return {
    //         currentIndex: 0,
    //         list: [],
    //         listindex:["zh_CN","en"],
    //     };
    // },
    // methods: {
    // ...mapActions('base', [
    //     'showNavBar',
    //     'showNavBarBg',
    //     'changeNavBarTitile',
    //     'showSaveBtn',
    //     'hideSaveBtn',
    // ]),
    // ...mapActions('saveLanguage', ['changeLanguage', 'saveLanguage']),

    // changeIndex(i) {
    //     this.currentIndex = i;
    //     this.changeLanguage(this.list[this.currentIndex].langId);
    // },
    // async getDictLanguageList() {
    //     const res = await DictLanguageList();
    //     this.list[0] = res.langs[6];
    //     this.list[1] = res.langs[1];
    // },
    // },

    // created() {
    //     this.showNavBar();
    //     this.showNavBarBg();
    //     this.changeNavBarTitile(this.$trans('语言设置'));
    //     this.showSaveBtn();
    // },
    // async mounted() {
    //     this.getDictLanguageList();
    //     await getUserInfo();
    //     const langId = JSON.parse(localStorage.getItem('baseUserInfo')).langId;
    //     this.currentIndex = this.listindex.indexOf(langId); // langId
    //      this.changeLanguage(this.list[this.currentIndex].langId);
    // },
    // unmounted() {
    //     this.hideSaveBtn();
    // },
};
</script>

<style>
.active {
    background-color: rgb(147, 197, 253);
    color: white;
}
</style>