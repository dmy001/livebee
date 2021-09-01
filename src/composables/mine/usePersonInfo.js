import { trans } from '@i18n';
import { Toast } from 'vant';
import { toRefs, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getUserInfo } from '@api';


export const usePersonInfo = (value) => {
    const router = useRouter();
    const state = reactive({
        // heights: '',
        // weights: '',
        // nicknames: '',
        // signatures: '',
        field: value,
    })
    // const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo'))
    // const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo'))
    // // state.heights = baseUserInfo.height
    // // state.weights = baseUserInfo.weight
    // // state.nicknames = baseUserInfo.nickName

    // if (value === "signature") {
    //     state.field = privateUserInfo[value];
    // } else {
    //     state.field = baseUserInfo[value]
    // }

    const changeInfo = async (key) => {
        Toast.loading({
            forbidClick: true,
            message: trans('保存中') + `...`,
        });
        await key(state.field)
        Toast.success({
            duration: 500,
            forbidClick: true,
            message: trans('保存成功'),
        });

        await getUserInfo();
    };
    const back = async (key) => {
        // if (state.nicknames === '') return Toast(trans('昵称不能为空'));
        await changeInfo(key);
        router.go(-1);
    };

    return {
        state,
        back,
    };
}