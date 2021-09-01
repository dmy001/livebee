<template>
    <div style="background-color: #f9f9f9; height: calc(100vh - 104px)">
        <section>
            <input
                ref="id"
                v-model="nicknames"
                autofocus="autofocus"
                class="pl-2 pt-2 pb-2 w-full mt-2"
                style="border: none;outline：none"
                type="text"
                maxlength="10"
                :placeholder="$trans('输入昵称')"
            />
        </section>
        <section class="mt-4 ml-11 mr-11 flex justify-center items-center">
            <Button :title="$trans('保存')" @click="toBack()"></Button>
        </section>
    </div>
</template>

<script>
import Button from '@components/common/CommonButton.vue';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { trans } from '@i18n';
import { setMineEditNickname } from '@api';
// import { useRouter } from 'vue-router';
// import { reactive, onMounted, ref, toRefs } from 'vue';
import { ref, onMounted, toRefs } from 'vue';
import { usePersonInfo } from '@composables';

export default {
    components: {
        Button,
    },
    setup() {
        const store = useStore();
        // const router = useRouter();
        store.dispatch('base/changeNavBarTitile', trans('修改昵称'));
        store.dispatch('base/showNavBarBg');

        const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo')); //获取缓存
        const DefaultNickName = baseUserInfo.nickName;

        const { back, state } = usePersonInfo(DefaultNickName);
        const { field: nicknames } = toRefs(state);
        const toBack = () => {
            // console.log(nicknames.value);
            if (nicknames.value === '') return Toast(trans('昵称不能为空'));
            back(setMineEditNickname);
        };
        // const state = reactive({
        //     nicknames: '',
        // });
        // const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo')); //获取缓存
        // state.nicknames = baseUserInfo.nickName;

        // const changenickname = async () => {
        //     Toast.loading({
        //         forbidClick: true,
        //         message: trans('保存中') + `...`,
        //     });
        //     // const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo')); //获取缓存
        //     await setMineEditNickname(state.nicknames); //上传
        //     Toast.success({
        //         duration: 500,
        //         forbidClick: true,
        //         message: trans('保存成功'),
        //     });
        //     await getUserInfo();
        // };
        // const back = async () => {
        //     await changenickname();
        //     if (state.nicknames === '') return Toast(trans('昵称不能为空'));
        //     router.go(-1);
        // };
        const id = ref();
        onMounted(() => {
            id.value.focus();
        });
        return {
            // ...toRefs(state),
            toBack,
            nicknames,
            id,
        };
    },
    // data() {
    //     return {
    //         nicknames: '',
    //     };
    // },
    // methods: {
    // ...mapActions('base', ['changeNavBarTitile', 'showNavBarBg']),

    // async back() {
    //     await this.changenickname();
    //     if (this.nicknames === '') return Toast(trans('昵称不能为空'));
    //     this.$router.go(-1);
    // },
    // async changenickname() {
    //     Toast.loading({
    //         forbidClick: true,
    //         message: trans('保存中') + `...`,
    //     });
    //     // const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo')); //获取缓存
    //     const res = await setMineEditNickname(this.nicknames); //上传
    //     Toast.success({
    //         duration: 500,
    //         forbidClick: true,
    //         message: trans('保存成功'),
    //     });
    //     await getUserInfo();
    //     // baseUserInfo.nickName = this.nicknames; //设置昵称赋值给缓存
    //     // localStorage.setItem('baseUserInfo', JSON.stringify(baseUserInfo)); //更新缓存
    // },
    // },
    // created() {
    //     const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo')); //获取缓存
    //     this.nicknames = baseUserInfo.nickName;
    //     this.showNavBarBg();
    //     this.changeNavBarTitile(this.$trans('修改昵称'));
    // },

    // mounted() {
    //     this.$refs.id.focus();
    // },
};
</script>
