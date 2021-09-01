<template>
    <div class="container mx-auto relative">
        <div class="w-full">
            <img class="w-full" src="@img/mine/mainBack.png" />
            <router-link to="/">
                <img class="h-4 w-4 top-14 ml-5 absolute" src="@img/mine/goBack.png" />
            </router-link>
            <div class="w-full h-1/2 bg-white rounded-t-3xl -mt-14 absolute">
                <div class="ml-10">
                    <div
                        class="text-2xl ml-3 font-semibold mt-10 mb-3"
                        style="font-family: PingFangSC-Semibold, PingFang SC"
                    >
                        {{ $trans('登录') }}
                    </div>
                    <div class="w-4/5 ml-3 mb-5 border-solid border-b border-gray-200 flex">
                        <input
                            v-model="account"
                            class="w-full h-10 outline-none"
                            type="tel"
                            :placeholder="$trans('输入手机号/邮箱账号/ID')"
                        />
                    </div>
                    <div class="w-4/5 ml-3 border-solid border-b border-gray-200 flex">
                        <input
                            v-model="userPassword"
                            class="w-full h-10 outline-none"
                            :type="pwdType"
                            :placeholder="$trans('输入登录密码')"
                        />
                        <img
                            class="w-5 h-4 mt-3 object-contain"
                            :src="seen ? openEye : closeEye"
                            @click="changeType()"
                        />
                    </div>
                    <section class="w-4/5 ml-3">
                        <p class="text-xs text-purple-700 text-left mt-3">
                            <router-link to="/login/forgotPassword">{{ $trans('忘记密码?') }}</router-link>
                        </p>
                        <p class="text-xs text-purple-700 text-right -mt-4">
                            <router-link to="/login/register">{{ $trans('注册') }}</router-link>
                        </p>
                    </section>
                    <CommonButton
                        class="w-4/5 h-8 ml-2 mt-16"
                        :disabled="!disabledSubmit"
                        :style="{
                            background: disabledSubmit ? '' : '#EEEBF2',
                            color: disabledSubmit ? '' : '#ABAAAB',
                        }"
                        :title="$trans('登录')"
                        @click="submit"
                    >
                    </CommonButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from 'vue';
import { useStore } from 'vuex';
import CommonButton from '@components/common/CommonButton.vue';
import Close from '@img/mine/login/closeEye.png';
import Open from '@img/mine/login/eye.png';
import { useLogin } from '@composables';
export default {
    name: 'Login',
    components: {
        CommonButton,
    },
    setup() {
        const store = useStore();
        // 使用 action
        store.dispatch('base/hideNavBar');
        store.dispatch('base/hideNavBarBg');
        store.dispatch('base/changeNavBarTitile', '');
        const state = reactive({
            pwdType: 'password',
            closeEye: Close,
            openEye: Open,
            seen: '',
        });
        const { submit, loginState } = useLogin();

        const changeType = () => {
            //显示密码
            state.pwdType = state.pwdType === 'password' ? 'text' : 'password';
            //小眼睛的变化
            state.seen = !state.seen;
        };
        watchEffect(() => {
            // 判断是否填写完整
            const disabled = loginState.account && loginState.userPassword.length >= 6;
            // 填写完整 取消按钮disabled
            loginState.disabledSubmit = disabled ? true : false;
        });
        return {
            ...toRefs(state),
            ...toRefs(loginState),
            submit,
            changeType,
        };
    },
};
</script>

