const state = {
    link:'https://s.gagahi.com/h5/hiLive/hiLivePrivacyPolicyEn.html',
    title:''
  };
  
  const mutations = { // 更改state中状态的逻辑，同步操作
    changeExternalLinks(state, link) {
      return (state.link = link);
    },
    changeExternalLinksTitle(state, title) {
        return (state.title = title);
      },
  };
  
  const actions = { // 提交mutation，异步操作
    changeExternalLinks({ commit }, link) {
      return commit("changeExternalLinks", link);
    },
    changeExternalLinksTitle({ commit }, title) {
        return commit("changeExternalLinksTitle", title);
      },
  };
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
  };