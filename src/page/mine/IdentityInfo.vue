<template>
    <div class="container px-9 text-sm mx-auto">
        <section class="my-5">
            <label for="" class="block py-2">真实姓名</label>
            <div class="">
                <input
                    v-model="submitInput.realName"
                    type="text"
                    class="bg-gray-100 h-10 leading-10 w-full pl-4"
                    placeholder="请填写您的真实姓名"
                />
            </div>
        </section>
        <section>
            <label for="" class="block py-2">证件号码</label>
            <div class="">
                <input
                    v-model="submitInput.idCard"
                    type="text"
                    class="bg-gray-100 h-10 leading-10 w-full pl-4"
                    placeholder="请填写您的证件号码"
                />
            </div>
        </section>
        <!-- 图片选择 -->
        <CommonUploadID @getSelectImgUrl="getSelectImgUrl" />
        <section>
            <!-- <label for="" class="block py-2">{{trans('系统提示')}}</label> -->
            <label for="" class="block py-2">支付宝账号</label>
            <input
                v-model="submitInput.alipay"
                type="text"
                class="bg-gray-100 h-10 leading-10 w-full pl-4"
                placeholder="作为提现收款账号，请谨慎填写"
            />
        </section>
        <section>
            <CommonButton
                class="mb-5 mt-12 tracking-wider"
                :disabled="disabledSubmit"
                :style="{ background: disabledSubmit ? '#EEEBF2' : '' }"
                title="确定"
                @click="submit"                
            />
            <div class="h-5 leading-5 mb-9 flex justify-center items-center">
                <input v-model="isAgree" class="mx-1.5" value="select" type="radio" @click="selectAgree" />
                <span>已阅读并同意</span>
                <span class="text-common-primary">《共享经济合作伙伴协议》</span>
            </div>
        </section>
    </div>
</template>
<script>
import { defineComponent, reactive, toRefs,watchEffect } from 'vue';
import CommonButton from '@components/common/CommonButton.vue';
import CommonUploadID from '@components/common/CommonUploadID.vue';
import { Dialog } from 'vant';
import { useStore } from 'vuex';
import { submitIdentityInfo } from '@api';
export default defineComponent({
    name: 'IdentityInfo',
    components: {
        CommonButton,
        CommonUploadID,
    },
    setup() {
        const store = useStore();
        // 使用 action
        store.dispatch('base/showNavBar');
        store.dispatch('base/changeNavBarTitile', '申请提现');
        store.dispatch('base/showNavBarBg');
        const state = reactive({
            // 提交用url
            isAgree: 'notSelect',
            submitInput: {
                realName: '',
                idCard: '',
                cardFront: '',
                cardBack: '',
                cardHand: '',
                alipay: '',
            },
            disabledSubmit: true,
        });
        const selectAgree = e => {
            if (state.isAgree === 'select') {
                state.isAgree = 'notSelect';
            }
        };
        // 提交表单
        const submit = async () => {
            const input = {...state.submitInput};
            const { status, msg } = await submitIdentityInfo(input);
            debugger;
            if (status !== 0) {
                return Dialog({ message: msg });
            }
            Dialog({ message: '提交成功' });
            // todo go where
        };
        const getSelectImgUrl = data => {
            state.submitInput.cardFront = data.certificateFrontImg;
            state.submitInput.cardBack = data.certificateBackImg;
            state.submitInput.cardHand = data.certificateHandImg;
        };
        watchEffect(() => {
            // state
            // debugger
            // 判断是否填写完整
            const disabled =Boolean(
                state.isAgree === 'select' &&
                state.submitInput.realName &&
                state.submitInput.idCard &&
                state.submitInput.alipay &&
                state.submitInput.cardFront &&
                state.submitInput.cardBack &&
                state.submitInput.cardHand);
            // 填写完整 取消按钮disabled
            state.disabledSubmit = disabled ? false : true;
        });
        return {
            ...toRefs(state),
            selectAgree,
            submit,
            getSelectImgUrl,
        };
    },
});
</script>
