import { reactive } from 'vue';
import {
    getRegisterSMSCode,
    usedMobileNumber,
    usedEmailNumber,
    getRegisterCheckCode,
} from '@api';
import { trans } from '@i18n';
import { Toast, Dialog } from 'vant';
import { useStore } from 'vuex';
import { useCountDown } from './useCountDown';
export const useVerification = () => {
    const store = useStore();
    const state = reactive({
        mobile: '',
        eamil: '',
        locationCode: store.state.locationCode.locationCode,
    });
    // phone倒计时
    const { clickTime: phoneClickTime, countDownState: phoneCountDownState } = useCountDown();

    // email倒计时
    const { clickTime: emailClickTime, countDownState: emailCountDownState } = useCountDown();
    //手机注册获取验证码
    const getRegisterPhoneCode = async () => _getSMSCode({ isRegister: true });
    const getRegisterEmailCode = async () => _getCheckCode({ isRegister: true });
    //邮箱注册获取验证码
    const getForgotPasswordPhoneCode = async () => _getSMSCode({ isRegister: false });
    const getForgotPasswordEmailCode = async () => _getCheckCode({ isRegister: false });

    const _getSMSCode = async (option) => {
        debugger
        if (!state.mobile) return Toast(trans('未填写手机号'));
        const chinaPhone = /^1{1}(3|4|5|6|7|8|9){1}\d{9}$/;
        const foreignPhone = /^\d{5,13}$/;
        if (chinaPhone.test(state.mobile) === false && state.locationCode === 86)
            return Toast(trans('手机号有误'));
        if (foreignPhone.test(state.mobile) === false && state.locationCode !== 86)
            return Toast(trans('手机号有误'));
        const res = await usedMobileNumber(state.mobile, state.locationCode);
        if (option.isRegister === true && res.status === 104)
            return Toast(trans('该手机号已注册'));
        else if (option.isRegister === false && res.status !== 104)
            return Toast(trans('账号未注册'));
        const { status, msg } = await getRegisterSMSCode(state.mobile, state.locationCode);
        if (status) return Toast(trans(msg));
        // 发送成功
        Dialog.confirm({
            showCancelButton: false,
            confirmButtonColor: 'rgb(59, 147, 248)',
            confirmButtonText: trans('确定'),
            message:
                trans(`我们已将短信验证码发送至+{0} {1},请输入收到的验证码:`, [state.locationCode, state.mobile])
        });
        phoneClickTime()
    };
    const _getCheckCode = async (option) => {
        debugger
        if (!state.eamil) return Toast(trans('未填写邮箱号'));
        //非法字符串
        const illegalStr = `“:#/*\\<%'>&?|+！（）。”`;
        if (state.eamil.split('').some(it => illegalStr.includes(it)))
            return Toast(trans(`请勿输入包含“:#/*\\<%'>&?|+！（）。”`));
        const result = await usedEmailNumber(state.eamil);
        if (option.isRegister === true && result.status === 104)
            return Toast(trans('该邮箱已注册'));
        else if (option.isRegister === false && result.status !== 104)
            return Toast(trans('账号未注册'));
        const res = await getRegisterCheckCode(state.eamil);
        if (res.status) return Toast(trans('邮箱格式错误'));
        // 发送成功
        Dialog.confirm({
            showCancelButton: false,
            confirmButtonColor: 'rgb(59, 147, 248)',
            confirmButtonText: trans('确定'),
            message: trans('请查看您的电子邮箱,输入验证码以完成注册'),
        });
        emailClickTime()
    }
    return {
        verificationState: state,
        phoneCountDownState,
        emailCountDownState,
        _getSMSCode,
        _getCheckCode,
        getForgotPasswordPhoneCode,
        getRegisterPhoneCode,
        getRegisterEmailCode,
        getForgotPasswordEmailCode
    }
}