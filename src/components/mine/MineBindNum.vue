<template>
    <div style="background-color: #f9f9f9; border-color: #f9f9f9; height: calc(100vh - 104px)" class="border">
        <section class="w-11/12 mt-2 ml-3 mb-4 border-gray-200 flex bg-white">
            <input v-model="telNumber" class="w-full h-10" type="tel" :placeholder="$trans('输入手机号')" />
            <p class="text-gray-400 text-sm mt-3" @click="toSetCity">+{{ locationCode }}</p>
        </section>
        <section class="w-11/12 ml-3 mb-4 border-gray-200 flex">
            <input
                v-model="phonePin"
                class="w-full h-10 mr-4"
                type="tel"
                :placeholder="$trans('输入验证码')"
            />
            <p
                v-show="sendCode"
                :invalue="!invaluePIN"
                :style="{
                    background: invaluePIN ? '#8B5CFF' : '#EEEBF2',
                    color: invaluePIN ? '' : '#ABAAAB',
                }"
            >
                <button class="text-white w-24 pt-2 pl-1 pr-1" @click="getSMSCode">
                    {{ $trans('获取验证码') }}
                </button>
            </p>
            <p
                v-show="!sendCode"
                class="bg-purple-500 ml-4 rounded text-white text-center pt-2 pb-2 pl-1 pr-1 w-24"
                style="background-color: #eeebf2; color: #abaaab"
            >
                {{ sendTime }}{{ $trans('s') }}
            </p>
        </section>

        <section>
            <Button
                :title="$trans('确定')"
                :disabled="!disabledSubmit"
                :style="{
                    background: disabledSubmit ? '' : '#EEEBF2',
                    color: disabledSubmit ? '' : '#ABAAAB',
                }"
                @click="submit"
            ></Button>
        </section>
    </div>
</template>

<script>
import Button from '@components/common/CommonButton.vue';
import { getRegisterSMSCode, usedMobileNumber, getUserInfo, setMobileNumber } from '@api';
import { reactive, toRefs, watchEffect, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Toast, Dialog } from 'vant';
import { useStore } from 'vuex';
import { trans } from '@i18n';

export default {
    components: {
        Button,
    },
    setup() {
        const store = useStore();
        store.dispatch('base/changeNavBarTitile', trans('更新手机号'));
        const state = reactive({
            telNumber: '',
            phonePin: '',
            sendCode: true,
            sendTime: 60,
            invaluePIN: true,
            disabledSubmit: true,
            timer: 0,
            // currentIndex: 0,
            locationCode: store.state.locationCode.locationCode,
        });
        const router = useRouter();
        const getSMSCode = async () => {
            debugger;
            if (!state.telNumber) return Toast(trans('未填写手机号'));
            const chinaPhone = /^1{1}(3|4|5|6|7|8|9){1}\d{9}$/;
            const foreignPhone = /^\d{5,13}$/;
            debugger;
            if (chinaPhone.test(state.telNumber) === false && state.locationCode === 86)
                return Toast(trans('手机号有误'));
            debugger;
            if (foreignPhone.test(state.telNumber) === false && state.locationCode !== 86)
                return Toast(trans('手机号有误'));
            const res = await usedMobileNumber(state.telNumber, state.locationCode);
            if (res.status === 104) return Toast(trans('该手机号已注册'));
            state.invaluePIN = false;
            const { status, msg } = await getRegisterSMSCode(state.telNumber, state.locationCode);

            if (status) return Toast(trans(msg));
            // 发送成功
            Dialog.confirm({
                showCancelButton: false,
                confirmButtonColor: 'rgb(59, 147, 248)',
                confirmButtonText: trans('确定'),
                message:
                    trans('我们已将短信验证码发送至') +
                    `+${state.locationCode} ${state.telNumber},` +
                    trans('请输入收到的验证码') +
                    `:`,
            });
            state.sendCode = false;
            state.timer = setInterval(() => {
                state.sendTime--;
                if (state.sendTime < 0) {
                    state.invaluePIN = true;
                    state.sendCode = true;
                    clearInterval(state.timer);
                    state.sendTime = 60;
                }
            }, 1000);
        };
        const toSetCity = () => {
            router.push({
                path: '/mine/MineEditCity',
                query: {
                    showLocalCode: 'true',
                },
            });
        };
        const submit = async () => {
            const { phonePin, locationCode, telNumber } = state;
            if (!telNumber) return Toast(trans('请输入手机号'));
            if (telNumber.length !== 11 && telNumber.length !== 12) return Toast(trans('请输入正确的手机号')); //判断手机号长度
            if (phonePin.length !== 6) return Toast(trans('请输入正确的验证码')); //   判断验证码长度
            const res = await setMobileNumber(phonePin, locationCode, telNumber); //上传
            // if (res.code === 500) return Toast('更换失败');
            debugger;
            console.log(res);
            // 处理错误码
            debugger;
            switch (res.status) {
                case 101:
                    return Toast(trans('验证码不正确')); // 101验证码不正确
                case 40001:
                    return Toast(trans('手机格式不正确')); //40001手机格式不正确
                case 115:
                    return Toast(trans('手机号已存在')); // 115 手机号已存在
                case 6003:
                    return Toast(trans('操作频繁'));
                default:
                    break;
            }
            debugger;
            Toast.loading({
                forbidClick: true,
                message: trans('保存中') + `...`,
            });
            await getUserInfo();
            Toast.success({
                duration: 500,
                forbidClick: true,
                message: trans('绑定成功'),
            });
            router.go(-1);
        };
        watchEffect(() => {
            // 判断是否填写完整
            const disabled = state.telNumber && state.phonePin;
            const invalue = state.telNumber;
            // 填写完整 取消按钮disabled
            state.disabledSubmit = disabled ? true : false; //手机注册页
            state.invaluePIN = invalue ? true : false;
        });
        onUnmounted(() => {
            clearInterval(state.timer);
        });
        return {
            ...toRefs(state),
            submit,
            getSMSCode,
            toSetCity,
        };
    },
};
</script>
