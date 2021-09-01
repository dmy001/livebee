import { reactive } from 'vue';
import { Toast } from 'vant';
import { loginPassword, getUserInfoBase } from '@api';
import { useRouter } from 'vue-router';
import { trans } from '@i18n';
import { loginSuccess } from '@native';

export const useLogin = () => {
    const router = useRouter()
    const state = reactive({
        account: '',
        userPassword: '',
        
    });
    const submit = async () => {
        state.disabledSubmit = false;
        const { account, userPassword } = state;
        if (!account) return Toast(trans('请输入账号'));
        if (userPassword.length < 6) return Toast(trans('请输入正确的密码')); //   判断密码长度
        const res = await loginPassword(account, userPassword);
        const { data, status } = res;
        // 103 账号或密码错误 todo
        if (status === 103) {
            return Toast(trans('账号或密码错误'));
        } else if (status === 110) {
            return Toast(trans('账号被禁用'));
        }
        data && data.token && localStorage.setItem('token', data.token);
        const successData = await getUserInfoBase();
        loginSuccess(successData.data);
        // 登陆完成
        router.push('/');
    };
    return {
        loginState: state,
        submit
    }
}