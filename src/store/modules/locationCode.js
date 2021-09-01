import i18n from "@i18n";
const state = {
  locationCode: i18n.global.locale === 'zh-cn' ? 86 : 1,
};

const mutations = { // 更改state中状态的逻辑，同步操作
  changeLocationCode(state, code) {
    return (state.locationCode = code);
  },
};

const actions = { // 提交mutation，异步操作
  changeLocationCode({ commit }, code) {
    return commit("changeLocationCode", code);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};