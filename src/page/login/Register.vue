<template>
    <div>
        <div class="mt-10 flex justify-between space-x-20 w-full">
            <div
                class="w-1/2 text-gray-500 text-sm text-right"
                :class="{ active: currentIndex == 0 }"
                @click="currentIndex = 0"                
            >
                {{ $trans('手机注册') }}
            </div>
            <div
                class="w-1/2 text-gray-500 text-sm"
                :class="{ active: currentIndex == 1 }"
                @click="currentIndex = 1"                
            >
                {{ $trans('邮箱注册') }}
            </div>
        </div>
        <div v-show="currentIndex == 0" class="ml-10 mt-7">
            <section class="w-4/5 ml-3 space-y-5">
                <section class="w-full border-solid border-b border-gray-200 flex">
                    <input
                        v-model="mobile"
                        class="w-full h-10 outline-none text-sm"
                        type="tel"
                        :placeholder="$trans('输入手机号')"
                    />
                    <p class="text-gray-400 text-sm mt-3" @click="toSetCity">+{{ locationCode }}</p>
                </section>
                <section class="w-full border-solid border-b border-gray-200 flex">
                    <input
                        v-model="smscode"
                        class="w-full h-10 outline-none text-sm"
                        type="tel"
                        :placeholder="$trans('输入验证码')"
                    />
                    <div
                        v-show="phoneSendCode"
                        class="
                            w-28
                            h-7
                            rounded-2xl
                            text-white text-xs text-center
                            leading-7
                            bg-gradient-to-r
                            from-secondary
                            to-primary
                        "
                        :invalue="!invaluePIN"
                        :style="{
                            background: invaluePIN ? '' : '#EEEBF2',
                            color: invaluePIN ? '' : '#ABAAAB',
                        }"
                        @click="getRegisterPhoneCode"
                    >
                        {{ $trans('获取验证码') }}
                    </div>
                    <div
                        v-show="!phoneSendCode"
                        class="text-xs text-center w-28 h-7 rounded-2xl leading-7"
                        style="background-color: #eeebf2; color: #abaaab"
                    >
                        {{ phoneSendTime }}s
                    </div>
                </section>
                <section class="w-full border-solid border-b border-gray-200 flex">
                    <input
                        v-model="phonePW"
                        class="w-full h-10 outline-none text-sm"
                        :type="pwdType"
                        :placeholder="$trans('密码为6~20个字符')"
                    />
                    <img
                        class="w-5 h-4 mt-3 object-contain"
                        :src="seen ? closeEye : openEye"
                        @click="changeType()"
                    />
                </section>
                <p class="text-xs text-right">
                    {{ $trans('已有账号，') }}
                    <router-link to="/login/login" class="text-purple-700"> {{ $trans('登录') }}</router-link>
                </p>
                <CommonButton
                    class="mt-20 focus:outline-none"
                    :title="$trans('注册')"
                    :disabled="!visibleSubmit"
                    :style="{
                        background: visibleSubmit ? '' : '#EEEBF2',
                        color: visibleSubmit ? '' : '#ABAAAB',
                    }"
                    @click="submit"
                >
                </CommonButton>
            </section>
        </div>

        <div v-show="currentIndex == 1" class="ml-10 mt-7">
            <section class="w-4/5 ml-3 space-y-5">
                <section class="w-full border-solid border-b border-gray-200 flex">
                    <input
                        v-model="eamil"
                        class="w-full h-10 outline-none text-sm"
                        type="eamil"
                        :placeholder="$trans('输入邮箱帐号')"
                    />
                </section>
                <section class="w-full border-solid border-b border-gray-200 flex">
                    <input
                        v-model="checkcode"
                        class="w-full h-10 outline-none text-sm"
                        type="text"
                        :placeholder="$trans('输入验证码')"
                    />

                    <div
                        v-show="emailSendCode"
                        class="
                            w-28
                            h-7
                            rounded-2xl
                            text-white text-xs text-center
                            leading-7
                            bg-gradient-to-r
                            from-secondary
                            to-primary
                        "
                        :value="!valuePIN"
                        :style="{
                            background: valuePIN ? '' : '#EEEBF2',
                            color: valuePIN ? '' : '#ABAAAB',
                        }"
                        @click="getRegisterEmailCode"
                    >
                        {{ $trans('获取验证码') }}
                    </div>
                    <div
                        v-show="!emailSendCode"
                        class="text-xs text-center w-28 h-7 rounded-2xl leading-7"
                        style="background-color: #eeebf2; color: #abaaab"
                    >
                        {{ emailSendTime }}s
                    </div>
                </section>
                <section class="w-full border-solid border-b border-gray-200 flex">
                    <input
                        v-model="emailPW"
                        class="w-full h-10 outline-none text-sm"
                        :type="pwdType"
                        :placeholder="$trans('密码为6~20个字符')"
                    />
                    <img
                        class="w-5 h-4 mt-3 object-contain"
                        :src="seen ? closeEye : openEye"
                        @click="changeType()"
                    />
                </section>
                <p class="text-xs text-right">
                    {{ $trans('已有账号，') }}
                    <router-link to="/login/login" class="text-purple-700">{{ $trans('登录') }}</router-link>
                </p>
                <CommonButton
                    class="w-32 mt-20 focus:outline-none"
                    :title="$trans('注册')"
                    :disabled="!disabledSubmit"
                    :style="{
                        background: disabledSubmit ? '' : '#EEEBF2',
                        color: disabledSubmit ? '' : '#ABAAAB',
                    }"
                    @click="submit"
                >
                </CommonButton>
            </section>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import CommonButton from '@components/common/CommonButton.vue';
import Close from '@img/mine/login/closeEye.png';
import Open from '@img/mine/login/eye.png';
import { trans } from '@i18n';
import { useVerification } from '@composables';
import { submitRegisterMobile, submitRegisterEmail, getUserInfo } from '@api';
import { Toast } from 'vant';
export default {
    name: 'Register',
    components: {
        CommonButton,
    },
    setup() {
        const router = useRouter();
        const store = useStore();

        // 使用 action
        store.dispatch('base/showNavBar');
        store.dispatch('base/showNavBarBg');
        store.dispatch('base/changeNavBarTitile', '');
        const state = reactive({
            phonePW: '',
            smscode: '',
            checkcode: '',
            emailPW: '',
            invaluePIN: true,
            valuePIN: true,
            disabledSubmit: true,
            isSubmited: false,
            currentIndex: 0,
            seen: true,
            pwdType: 'password',
            closeEye: Close,
            openEye: Open,
            locationCode: store.state.locationCode.locationCode,
        });
        const submit = async () => {
            debugger;
            state.visibleSubmit = !state.visibleSubmit;
            state.disabledSubmit = !state.disabledSubmit;
            // state.isSubmited = true;
            const { phonePW, emailPW, smscode, checkcode, currentIndex, locationCode } = state;
            if (currentIndex === 0) {
                if (!verificationState.mobile) return Toast(trans('请输入手机号'));
                if (smscode.length !== 6) return Toast(trans('请输入正确的验证码')); //   判断验证码长度s
                if (phonePW.length < 6 || phonePW.length > 20) return Toast(trans('密码为6~20个字符')); //   判断密码长度
                const { data, status } = await submitRegisterMobile(
                    verificationState.mobile,
                    phonePW,
                    smscode,
                    locationCode
                );
                // 处理错误码
                switch (status) {
                    case 101:
                        return Toast(trans('验证码有误')); // 101验证码不正确
                    case 40001:
                        return Toast(trans('手机格式不正确')); //40001手机格式不正确
                    case 115:
                        return Toast(trans('手机号已存在')); // 115 手机号已存在
                    case 6003:
                        return Toast(trans('操作频繁'));
                    default:
                        break;
                }
                data && data.token && localStorage.setItem('token', data.token);
            } else if (currentIndex === 1) {
                if (!verificationState.eamil) return Toast(trans('请输入邮箱号'));
                if (checkcode.length !== 6) return Toast(trans('请输入正确的验证码')); //   判断验证码长度
                if (emailPW.length < 6 || emailPW.length > 20) return Toast(trans('密码为6~20个字符')); //   判断密码长度
                const { data, status } = await submitRegisterEmail(
                    verificationState.eamil,
                    emailPW,
                    checkcode
                );
                switch (status) {
                    case 101:
                        return Toast(trans('验证码有误')); // 101验证码不正确
                    case 117:
                        return Toast(trans('邮箱格式不正确')); //邮箱格式不正确
                    case 104:
                        return Toast(trans('账号已存在')); // 邮箱已存在
                    default:
                        break;
                }
                data && data.token && localStorage.setItem('token', data.token);
            }

            await getUserInfo();
            Toast(trans('注册成功'));
            setTimeout(() => {
                router.push('/');
            }, 5000);
        };
        //获取验证码
        const {
            getRegisterPhoneCode,
            getRegisterEmailCode,
            phoneCountDownState,
            verificationState,
            emailCountDownState,
        } = useVerification();
        //倒计时
        const { sendTime: phoneSendTime, sendCode: phoneSendCode } = toRefs(phoneCountDownState);
        const { sendTime: emailSendTime, sendCode: emailSendCode } = toRefs(emailCountDownState);
        const changeType = () => {
            //显示密码
            state.pwdType = state.pwdType === 'password' ? 'text' : 'password';
            //小眼睛的变化
            state.seen = !state.seen;
        };
        const toSetCity = () => {
            router.push({
                path: '/mine/MineEditCity',
                query: {
                    showLocalCode: 'true',
                },
            });
        };
        watchEffect(() => {
            //state.isSubmited = false;
            // 判断是否填写完整
            const visible = state.phonePW && verificationState.mobile && state.smscode;
            const disabled = state.emailPW && verificationState.eamil && state.checkcode;
            // 填写完整 取消按钮disabled
            state.visibleSubmit = visible ? true : false; //手机注册页
            state.disabledSubmit = disabled ? true : false; //注册按钮
        });
        watchEffect(() => {
            // 判断是否填写手机号或邮箱号
            const invalue = verificationState.mobile;
            const value = verificationState.eamil;
            // 填写手机号或邮箱后 取消按钮disabled
            state.valuePIN = value ? true : false;
            state.invaluePIN = invalue ? true : false;
        });
        /* onUnmounted(() => {
            clearInterval(countDownState.timer);
        }); */
        return {
            ...toRefs(state),
            ...toRefs(verificationState),
            phoneSendCode,
            phoneSendTime,
            emailSendCode,
            emailSendTime,
            getRegisterPhoneCode,
            getRegisterEmailCode,
            submit,
            changeType,
            toSetCity,
        };
    },
};
</script>
<style>
.active {
    color: rgb(153, 59, 248);
    background: none;
    font-size: 24px;
    font-weight: 500;
}
</style>
