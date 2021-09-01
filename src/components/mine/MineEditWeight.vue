<template>
    <div style="background-color: #f9f9f9; height: calc(100vh - 104px); border-color: #f9f9f9" class="border">
        <section class="pl-4 mt-2 pt-2 pb-2 bg-white flex">
            {{ $trans('体重') }}（kg）
            <input
                ref="id"
                v-model="weights"
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
import { setMineEditWeight } from '@api';
// import { useRouter } from 'vue-router';
import { toRefs, ref, onMounted } from 'vue';
// import { ref, onMounted, reactive } from 'vue';
import { usePersonInfo } from '@composables';

export default {
    components: {
        Button,
    },
    setup() {
        const store = useStore();
        // const router = useRouter();
        store.dispatch('base/changeNavBarTitile', trans('体重'));
        store.dispatch('base/showNavBarBg');

        const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo')); //获取缓存
        const DefaultWeights = baseUserInfo.weight;

        const { back, state } = usePersonInfo(DefaultWeights);
        const { field: weights } = toRefs(state);
        const toBack = () => {
            back(setMineEditWeight);
        };

        const id = ref();
        onMounted(() => {
            id.value.focus();
        });
        return {
            weights,
            id,
            toBack,
        };
    },

    // data() {
    //     return {
    //         weights: '',
    //     };
    // },
    // methods: {
    // ...mapActions('base', ['changeNavBarTitile', 'showNavBarBg']),

    // async back() {
    //     await this.changeWeight();
    //     this.$router.go(-1);
    // },
    // async changeWeight() {
    //     Toast.loading({
    //         forbidClick: true,
    //         message: trans('保存中') + `...`,
    //     });
    //     // debugger;
    //     const res = await setMineEditWeight(this.weights); //上传
    //     Toast.success({
    //         duration: 500,
    //         forbidClick: true,
    //         message: trans('保存成功'),
    //     });
    //     await getUserInfo();

    // const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo')); //获取缓存
    // baseUserInfo.weight = this.weights; //赋值体重给缓存
    // localStorage.setItem('baseUserInfo', JSON.stringify(baseUserInfo)); //更新缓存
    // console.log(res);
    // debugger;
    //     },
    // },
    // created() {
    //     this.showNavBarBg();
    //     this.changeNavBarTitile(this.$trans('体重'));
    //     const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo')); //获取缓存
    //     this.weights = baseUserInfo.weight;
    // },
    // mounted() {
    //     this.$refs.id.focus();
    // },
};
</script>

