const state = {
  // 导航标题
  navBarTitle: "",
  // 导航显示
  navBarShow: true,
  // 导航背景色显示
  navBarBgShow: true,
  // 底部导航显示
  tabBarShow: true,
  // 左侧返回显示
  showLeft: true,
  // 他们主页的个人gagaid
  otherPageId: '',
  saveBtnShow:false,
};

const mutations = {
  changeNavBarShow(state) {
    return (state.navBarShow = !state.navBarShow);
  },
  changeNavBarBgShow(state) {
    return (state.navBarBgShow = !state.navBarBgShow);
  },
  changeNavBarLefthow(state) {
    return (state.showLeft = !state.showLeft);
  },
  changeTabBarShow(state) {
    return (state.tabBarShow = !state.tabBarShow);
  },
  changeNavBarTitile(state, title = "") {
    return (state.navBarTitle = title);
  },
  setOtherPageId(state, gagaId) {
    state.otherPageId = gagaId
  },
  changeSaveBtnShow(state) {
    return (state.saveBtnShow = !state.saveBtnShow);
  },
  
};

const actions = {
  // 打开nav头
  showNavBar({ state, commit }) {
    const { navBarShow } = state;
    return !navBarShow ? commit("changeNavBarShow") : null;
  },
  // 关闭nav头
  hideNavBar({ state, commit }) {
    const { navBarShow } = state;
    return navBarShow ? commit("changeNavBarShow") : null;
  },
  // 打开nav头背景色
  showNavBarBg({ state, commit }) {
    const { navBarBgShow } = state;
    return !navBarBgShow ? commit("changeNavBarBgShow") : null;
  },
  // 关闭nav头背景色
  hideNavBarBg({ state, commit }) {
    const { navBarBgShow } = state;
    return navBarBgShow ? commit("changeNavBarBgShow") : null;
  },
  // 修改nav中间文字
  changeNavBarTitile({ commit }, title) {
    return commit("changeNavBarTitile", title);
  },
  // 打开左侧返回按钮
  showLeftBar({ state, commit }) {
    const { showLeft } = state;
    return !showLeft ? commit("changeNavBarLefthow") : null;
  },
  // 关闭左侧返回按钮
  hideLeftBar({ state, commit }) {
    const { showLeft } = state;
    return showLeft ? commit("changeNavBarLefthow") : null;
  },
  hideTabBar({ state, commit }) {
    const { tabBarShow } = state;
    return tabBarShow ? commit("changeTabBarShow") : null;
  },
  showTabBar({ state, commit }) {
    const { tabBarShow } = state;
    return !tabBarShow ? commit("changeTabBarShow") : null;
  },
  hideSaveBtn({ state, commit }) {
    const {saveBtnShow } = state;
    return saveBtnShow ? commit("changeSaveBtnShow"):null
  },
  showSaveBtn({ state, commit }) {
    const {saveBtnShow } = state;
    return !saveBtnShow ? commit("changeSaveBtnShow"):null
  },
  
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
