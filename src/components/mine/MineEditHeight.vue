<template>
    <div style="background-color: #f9f9f9; height: calc(100vh - 104px); border-color: #f9f9f9" class="border">
        <section class="pl-4 mt-2 pt-2 pb-2 bg-white flex">
            <p class="flex flex-nowrap">{{ $trans('身高') }}（cm）</p>
            <input
                ref="id"
                v-model="heights"
                autofocus="autofocus"
                type="text"
                oninput="value = value.replace(/[^0-9]/g,'')"
                maxlength="3"
            />
        </section>
        <section class="mt-4">
            <Button :title="$trans('保存')" @click="toBack()"></Button>
        </section>
    </div>
</template>

<script>
import Button from '@components/common/CommonButton.vue';
import { useStore } from 'vuex';
// import { Toast } from 'vant';
import { trans } from '@i18n';
import { setMineEditHeight } from '@api';
// import { useRouter } from 'vue-router';
import { ref, toRefs, onMounted } from 'vue';
// import { reactive, toRefs } from 'vue';

import { usePersonInfo } from '@composables';

export default {
    components: {
        Button,
    },
    setup() {
        const store = useStore();
        // const router = useRouter();
        store.dispatch('base/changeNavBarTitile', trans('身高'));
        store.dispatch('base/showNavBarBg');

        const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo')); //获取缓存
        const DefaultHeights = baseUserInfo.height;

        const { back, state } = usePersonInfo(DefaultHeights);
        const { field: heights } = toRefs(state);
        const toBack = () => {
            back(setMineEditHeight);
        };

        const id = ref();
        onMounted(() => {
            id.value.focus();
            // debugger;
        });
        return {
            // ...toRefs(state),
            toBack,
            id,
            heights,
        };
        // const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo')); //获取缓存
        // state.heights = baseUserInfo.height;
        // const changeHeight = async () => {
        //     Toast.loading({
        //         forbidClick: true,
        //         message: trans('保存中') + `...`,
        //     });
        //     await setMineEditHeight(state.heights); //上传
        //     Toast.success({
        //         duration: 500,
        //         forbidClick: true,
        //         message: trans('保存成功'),
        //     });

        //     await getUserInfo();
        // };

        // const back = async () => {
        //     await changeHeight();
        //     router.go(-1);
        // };
        // const id = ref();
        // onMounted(() => {
        //     id.value.focus();
        //     // debugger;
        // });
        // return {
        //     ...toRefs(state),
        // };
    },

    // data() {
    //     return {
    //         heights: '',
    //     };
    // },
    // methods: {
    //     // ...mapActions('base', ['changeNavBarTitile', 'showNavBarBg']),

    //     async back() {
    //         await this.changeHeight();
    //         this.$router.go(-1);
    //     },
    //     async changeHeight() {
    //         Toast.loading({
    //             forbidClick: true,
    //             message: trans('保存中') + `...`,
    //         });
    //         const res = await setMineEditHeight(this.heights); //上传
    //         Toast.success({
    //             duration: 500,
    //             forbidClick: true,
    //             message: trans('保存成功'),
    //         });

    //         const a = await getUserInfo();
    //         // debugger;
    //         // const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo')); //获取缓存
    //         // baseUserInfo.height = this.heights; //设置身高赋值给缓存
    //         // localStorage.setItem('baseUserInfo', JSON.stringify(baseUserInfo)); //更新缓存
    //         // console.log(res);
    //         // debugger;
    //     },
    // },
    // mounted() {
    //     this.$refs.id.focus();
    // },
    // created() {
    //     // this.changeNavBarTitile(this.$trans('身高'));
    //     // this.showNavBarBg();
    //     // const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo')); //获取缓存
    //     // this.heights = baseUserInfo.height;
    // },
};
</script>
