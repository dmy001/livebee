<template>
    <div>
        <section class="ml-2 pt-2">{{ $trans('个性签名') }}</section>
        <section>
            <p class="pt-2" style="background-color: #fff">
                <textarea
                    ref="id"
                    v-model="signatures"
                    autofocus="autofocus"
                    :placeholder="$trans('有什么想说给朋友们听的？')"
                    class="h-24 ml-2 w-full"
                    style="vertical-align: top; outline: none; width: 21.7rem; resize: none"
                />
            </p>
        </section>
        <section class="mt-12">
            <Button :title="$trans('保存')" @click="tBack()"></Button>
        </section>
    </div>
</template>

<script>
import Button from '@components/common/CommonButton.vue';
import { useStore } from 'vuex';
// import { Toast } from 'vant';
import { trans } from '@i18n';
import { setMineEditSignature } from '@api';
// import { useRouter } from 'vue-router';
// import { reactive, ref, onMounted, toRefs } from 'vue';
import { ref, onMounted, toRefs } from 'vue';
import { usePersonInfo } from '@composables';

export default {
    components: {
        Button,
    },
    setup() {
        // const router = useRouter();
        const store = useStore();
        store.dispatch('base/changeNavBarTitile', trans('修改个性签名'));
        store.dispatch('base/showNavBarBg');

        const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo')); //获取缓存
        const DefaultSignature = privateUserInfo.signature;

        const { back, state } = usePersonInfo(DefaultSignature);
        const { field: signatures } = toRefs(state);
        const tBack = () => {
            back(setMineEditSignature);
        };
        // const state = reactive({
        //     text: '',
        // });
        // const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo')); //获取缓存
        // state.text = privateUserInfo.signature;
        // const changeSignature = async () => {
        //     Toast.loading({
        //         forbidClick: true,
        //         message: trans('保存中') + `...`,
        //     });
        //     await setMineEditSignature(state.text); //上传
        //     Toast.success({
        //         duration: 500,
        //         forbidClick: true,
        //         message: trans('保存成功'),
        //     });
        //     await getUserInfo();
        // };
        // const back = async () => {
        //     await changeSignature();
        //     router.go(-1);
        // };
        const id = ref();
        onMounted(() => {
            id.value.focus();
        });
        return {
            // ...toRefs(state),
            signatures,
            tBack,
            id,
        };
    },
    // data() {
    //     return {
    //         text: '',
    //     };
    // },
    // methods: {
    //     // ...mapActions('base', ['changeNavBarTitile', 'showNavBarBg']),

    //     async back() {
    //         await this.changeSignature();
    //         this.$router.go(-1);
    //     },
    //     async changeSignature() {
    //         Toast.loading({
    //             forbidClick: true,
    //             message: trans('保存中') + `...`,
    //         });
    //         const res = await setMineEditSignature(this.text); //上传
    //         Toast.success({
    //             duration: 500,
    //             forbidClick: true,
    //             message: trans('保存成功'),
    //         });
    //         await getUserInfo();

    //         // const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo')); //获取缓存
    //         // privateUserInfo.signature = this.text; //赋值个性签名值给缓存
    //         // localStorage.setItem('privateUserInfo', JSON.stringify(privateUserInfo)); //更新缓存
    //         // console.log(res);
    //         // debugger;
    //     },
    // },
    // created() {
    //     const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo')); //获取缓存
    //     this.text = privateUserInfo.signature;
    //     this.showNavBarBg();
    //     this.changeNavBarTitile(this.$trans('修改个性签名'));
    // },
    // mounted() {
    //     this.$refs.id.focus();
    // },
};
</script>

