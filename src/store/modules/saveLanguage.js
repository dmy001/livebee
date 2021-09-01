import i18n from '../../i18n/index'
import { setLanguage } from '../../api/mine/mineedit.js';
import { Toast } from 'vant';
import { trans } from '@i18n';


const state = {
    langId: 'zh-ch',
};

const mutations = { // 更改state中状态的逻辑，同步操作
    changeLanguage(state, langId) {
        if (langId == "zh_CN")
            state.langId = "zh-cn"
        else if (langId = 'en')
            state.langId = "en-us"
        return;
    },
    saveLanguage(state) {

        //  JSON.parse(localStorage.getItem('lhLangguage'))
        localStorage.setItem('lhLangguage', state.langId);
        i18n.global.locale = state.langId
        return;
    }
};

const actions = { // 提交mutation，异步操作
    changeLanguage({ commit }, langId) {
        return commit("changeLanguage", langId);
    },
    async saveLanguage({ state, commit }) {
        const langId = state.langId
        Toast.loading({
            message: `${trans('保存中')}...`,
            forbidClick: true,
          });
        const res = await setLanguage(langId)
        if (res.code == 200) {
            Toast.success({
                duration: 300,
                message: trans('保存成功'),
                forbidClick: true,
              });
        }
        // console.log(1);
        return commit("saveLanguage")
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};