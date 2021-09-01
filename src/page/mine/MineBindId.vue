<template>
    <div>
        <div class="flex mt-4 justify-around items-center">
            <router-link
                v-if="mobileNumber"
                class="bg-mineBindNum-left bg-no-repeat bg-contain"
                style="width: 10.5rem; height: 5.19rem"
                to="/mine/MineNumberEmail/number"
            >
                <section>
                    <p
                        class="text-xs text-jinbi-EDF0F1 w-full"
                        style="
                            margin-top: 2.06rem;
                            margin-left: 0.38rem;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: #edf0f1;
                        "
                    >
                        {{ $trans('已绑定手机号码') }}
                    </p>
                    <p class="text-white text-xs" style="margin-top: 0.63rem">
                        <span style="margin-left: 0.38rem">+{{ locationCode }} </span>
                        <span>{{ ' ' + mobileNumber }}</span>
                    </p>
                </section>
            </router-link>
            <router-link
                v-if="email"
                class="bg-mineBindEmail-right bg-no-repeat bg-contain"
                style="width: 10.5rem; height: 5.19rem"
                to="/mine/MineNumberEmail/email"
            >
                <section>
                    <p
                        class="text-xs text-jinbi-EDF0F1"
                        style="
                            margin-top: 2.06rem;
                            margin-left: 0.38rem;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: #edf0f1;
                        "
                    >
                        {{ $trans('已绑定邮箱账号') }}
                    </p>
                    <p class="text-xs text-white" style="margin-top: 0.63rem">
                        <span style="margin-left: 0.38rem">{{ email }}</span>
                    </p>
                </section>
            </router-link>
            <router-link
                v-if="!mobileNumber"
                class="bg-mineUnBindNum-left bg-no-repeat bg-contain ml-2"
                style="width: 10.5rem; height: 5.19rem"
                to="/mine/MineNumberEmail/number"
            >
                <section>
                    <p
                        class="text-xs text-jinbi-EDF0F1 mt-14 w-full"
                        style="
                            margin-left: 0.38rem;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: #edf0f1;
                        "
                    >
                        {{ $trans('未绑定手机号码') }}
                    </p>
                </section>
            </router-link>
            <router-link
                v-if="!email"
                class="bg-mineUnBindEmail-right bg-no-repeat bg-contain ml-2"
                style="width: 10.5rem; height: 5.19rem"
                to="/mine/MineNumberEmail/email"
            >
                <section>
                    <p
                        class="text-xs text-jinbi-EDF0F1 mt-14 w-full"
                        style="
                            margin-left: 0.38rem;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: #edf0f1;
                        "
                    >
                        {{ $trans('未绑定邮箱账号') }}
                    </p>
                </section>
            </router-link>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import { toRefs } from 'vue';

import { trans } from '../../i18n';
// import { getMobileNumber } from '../../api/mine/mineedit';
export default {
    setup() {
        const store = useStore();
        store.dispatch('base/changeNavBarTitile', trans('绑定账号'));
        store.dispatch('base/showNavBarBg');
        store.dispatch('base/showNavBar');
        const state = reactive({
            email: '',
            mobileNumber: '',
        });
        const privateUserInfo = localStorage.getItem('privateUserInfo');
        state.email = JSON.parse(privateUserInfo).email;
        state.mobileNumber = JSON.parse(privateUserInfo).mobileNumber;
        state.locationCode = JSON.parse(privateUserInfo).locationCode;
        return {
            ...toRefs(state),
        };
    },
    // data() {
    //     return {
    //         email: '',
    //         mobileNumber: '',
    //     };
    // },
    // methods: {
    //     ...mapActions('base', ['showNavBarBg', 'changeNavBarTitile', 'showNavBar']),
    // },

    // created() {
    //     this.showNavBar();
    //     this.showNavBarBg();
    //     this.changeNavBarTitile(this.$trans('绑定账号'));
    //     const privateUserInfo = localStorage.getItem('privateUserInfo');
    //     this.email = JSON.parse(privateUserInfo).email;
    //     this.mobileNumber = JSON.parse(privateUserInfo).mobileNumber;
    //     this.locationCode = JSON.parse(privateUserInfo).locationCode;
    // },
};
</script>

