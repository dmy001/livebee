<template>
    <div class="container px-9 text-sm mx-auto">
        <section class="my-5">
            <label for="" class="block py-2">{{ $trans('真实姓名')}}</label>
            <div class="">
                <input
                    v-model="submitInput.name"
                    type="text"
                    class="bg-gray-100 h-10 leading-10 w-full pl-4"
                    placeholder="请填写您的真实姓名"
                />
            </div>
        </section>
        <section>
            <label for="" class="block py-2">{{ $trans('证件号码')}}</label>
            <div class="">
                <input
                    v-model="submitInput.certificateNumber"
                    type="text"
                    class="bg-gray-100 h-10 leading-10 w-full pl-4"
                    placeholder="请填写您的证件号码"
                />
            </div>
        </section>
        <section class="my-5">
            <label for="" class="block py-2">{{ $trans('手机号码')}}</label>
            <div class="bg-gray-100 h-10 leading-10 w-full pl-4 flex items-center">
                <span class="mr-4"> +86 </span>
                <input
                    v-model="submitInput.phoneNum"
                    type="text"
                    class="bg-gray-100 w-full"
                    placeholder="请填写您的手机号码"
                />
            </div>
        </section>
        <!-- 图片选择 -->
        <CommonUploadID @getSelectImgUrl="getSelectImgUrl" />
        <section>
            <!-- <label for="" class="block py-2">{{trans('系统提示')}}</label> -->
            <label for="" class="block py-2">{{ $trans('认证类型')}}</label>
            <button class="block bg-gradient-to-r w-24 h-10 rounded text-white from-secondary to-primary">
                {{ $trans('视频直播')}}
            </button>
        </section>
        <section>
            <CommonButton
                @click="submit"
                :disabled="disabledSubmit"
                :style="{ background: disabledSubmit ? '#EEEBF2' : '' }"
                title="提交认证"
                class="mb-5 mt-12"
            />
            <div class="h-5 leading-5 mb-9 flex justify-center items-center">
                <input v-model="isAgree" @click="selectAgree" value="select" type="radio" class="mx-1.5" />
                <span>{{ $trans('已阅读并同意')}}</span>
                <span class="text-common-primary">《{{ $trans('主播入驻协议')}}》</span>
            </div>
        </section>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch, watchEffect } from 'vue';
import { Dialog } from 'vant';
import { useStore } from 'vuex';
import { submitLiveAudits } from '@api';
import CommonButton from '@components/common/CommonButton.vue';
import CommonUploadID from '@components/common/CommonUploadID.vue';
import { trans } from '@i18n';
export default defineComponent({
    name: 'MineIDAuthenticate',
    components: {
        CommonButton,
        CommonUploadID,
    },
    setup() {
        const store = useStore();
        // 使用 action
        store.dispatch('base/showNavBar');
        store.dispatch('base/changeNavBarTitile', '身份认证');
        store.dispatch('base/showNavBarBg');
        const state = reactive({
            // 提交用url
            isAgree: 'notSelect',
            submitInput: {
                name: '',
                certificateNumber: '',
                phoneNum: '',
                certificateFrontImg: '',
                certificateBackImg: '',
                certificateHandImg: '',
            },
            disabledSubmit: true,
        });
        // 选择已阅读并同意
        const selectAgree = e => {
            if (state.isAgree === 'select') {
                state.isAgree = 'notSelect';
            }
        };
        // 提交表单
        const submit = async () => {
            const input = { phoneCode: 86, type: 'LIVE', ...state.submitInput };
            const { status, msg } = await submitLiveAudits(input);
            if (status !== 0) {
                return Dialog({ message: msg });
            }
            Dialog({ message: '提交成功' });
            // todo go where
        };
        const getSelectImgUrl = data => {
            state.submitInput.certificateFrontImg = data.certificateFrontImg;
            state.submitInput.certificateBackImg = data.certificateBackImg;
            state.submitInput.certificateHandImg = data.certificateHandImg;
        };
        watchEffect(() => {
            // 判断是否填写完整
            const disabled =
                state.isAgree === 'select' &&
                state.submitInput.name &&
                state.submitInput.certificateNumber &&
                state.submitInput.phoneNum &&
                state.submitInput.certificateFrontImg &&
                state.submitInput.certificateBackImg &&
                state.submitInput.certificateHandImg;
            // 填写完整 取消按钮disabled
            state.disabledSubmit = disabled ? false : true;
        });
        return {
            ...toRefs(state),
            selectAgree,
            submit,
            trans,
            getSelectImgUrl,
        };
    },
});
</script>
