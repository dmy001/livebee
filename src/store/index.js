import { createStore } from 'vuex'
import base from "./modules/base";
import locationCode from "./modules/locationCode";
import saveLanguage from "./modules/saveLanguage";
import externalLinks from "./modules/externalLinks";

// 创建一个新的 store 实例
export default createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    },
    modules: {
        base,
        locationCode,
        saveLanguage,
        externalLinks

    }
})
