<template>
    <div style="background-color: #f9f9f9; height: calc(100vh - 104px)">
        <section class="w-11/12 pt-4 ml-3 mb-4 border-gray-200 flex">
            <input
                v-model="eamilID"
                class="w-full h-10 outline-none"
                type="eamil"
                :placeholder="$trans('输入邮箱帐号')"
            />
        </section>
        <section class="w-11/12 ml-3 mb-4 border-gray-200 flex">
            <input
                v-model="eamilPin"
                class="w-full h-10 outline-none text-sm"
                type="text"
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
                <button class="text-white w-24 pt-2 pl-1 pr-1" @click="getCheckCode">
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
import { getRegisterCheckCode, settingEmail, getUserInfo, usedEmailNumber } from '@api';
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
        store.dispatch('base/changeNavBarTitile', trans('更新邮箱'));
        const state = reactive({
            eamilID: '',
            eamilPin: '',
            sendTime: 60,
            invaluePIN: true,
            sendCode: true,
            disabledSubmit: true,
            email: '',
            timer: 0,
        });
        const router = useRouter();
        const getCheckCode = async () => {
            if (!state.eamilID) return Toast(trans('未填写邮箱号'));
            const illegalStr = `“:#/*\\<%'>&?|+！（）。”`;
            if (state.eamilID.split('').some(it => illegalStr.includes(it)))
                return Toast(trans(`请勿输入包含“:#/*\\<%'>&?|+！（）。”`));

            const result = await usedEmailNumber(state.eamilID);
            if (result.status === 104) return Toast(trans('该邮箱已注册'));

            const res = await getRegisterCheckCode(state.eamilID);
            if (res.status) return Toast(trans('邮箱格式错误'));
            // 发送成功
            debugger;
            Dialog.confirm({
                showCancelButton: false,
                confirmButtonColor: 'rgb(59, 147, 248)',
                confirmButtonText: trans('确定'),
                message: trans('请查看您的电子邮箱，输入验证码以完成注册'),
            });
            state.sendCode = false;
            state.timer = setInterval(() => {
                state.sendTime--;
                if (state.sendTime < 0) {
                    state.sendCode = true;
                    clearInterval(state.timer);
                    state.sendTime = 60;
                }
            }, 1000);
        };
        const submit = async () => {
            const { eamilPin, eamilID } = state;
            // debugger;
            if (!eamilID) return Toast(trans('请输入邮箱号'));
            if (eamilPin.length !== 6) return Toast(trans('请输入正确的验证码')); //   判断验证码长度

            const res = await settingEmail(state.eamilID, eamilPin); //上传
            // if (res.code === 500) return Toast('更换失败');
            // debugger;
            switch (res.status) {
                case 101:
                    return Toast(trans('验证码不正确')); // 101验证码不正确
                case 117:
                    return Toast(trans('邮箱格式不正确')); //邮箱格式不正确
                case 104:
                    return Toast(trans('邮箱已存在')); // 邮箱已存在
                default:
                    break;
            }
            Toast.loading({
                forbidClick: true,
                message: trans('保存中') + `...`,
            });
            await getUserInfo();
            // debugger;
            console.log(res);
            Toast.success({
                duration: 500,
                forbidClick: true,
                message: trans('绑定成功'),
            });
            router.go(-1);
        };
        watchEffect(() => {
            // 判断是否填写完整
            const disabled = state.eamilID && state.eamilPin;
            const invalue = state.eamilID;
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
            getCheckCode,
        };
    },
};
</script>
