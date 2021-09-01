<template>
    <div class="container">
        <div class="flex flex-col">
            <ul class="flex text-black mt-2.5">
                <li
                    v-for="(item, i) in list"
                    :key="i"
                    :class="{ active: currentIndex == i }"
                    class="
                        bg-grey-7
                        text-center text-sm
                        rounded-2xl
                        px-3
                        py-1
                        ml-2
                        font-semibold
                        text-common-grey1
                    "
                    @click="changeIndex(i)"
                >
                    {{ $trans(item) }}
                </li>
            </ul>
            <TradingRecord v-if="currentIndex === 0" :trans-type="0"></TradingRecord>
            <TradingRecord v-if="currentIndex === 1" :trans-type="1"></TradingRecord>
            <TradingRecord v-if="currentIndex === 2" :trans-type="4"></TradingRecord>
            <TradingRecord v-if="currentIndex === 3" :trans-type="5"></TradingRecord>
        </div>
    </div>
</template>

<script>
import TradingRecord from '@components/mine/TradingRecord.vue';
import { reactive, toRefs } from 'vue';
import { trans } from '@i18n';

import { useStore } from 'vuex';
export default {
    components: {
        TradingRecord,
    },
    setup() {
        const store = useStore();
        const state = reactive({
            currentIndex: 0,
            list: ['全部', '消费', '充值', '退款'],
        });
        store.dispatch('base/changeNavBarTitile', trans('交易记录'));
        store.dispatch('base/showNavBar');
        store.dispatch('base/showNavBarBg');
        const changeIndex = i => (state.currentIndex = i);
        return {
            ...toRefs(state),
            changeIndex,
        };
    },
    // data() {
    //     return {
    //         currentIndex: 0,
    //         list: ['全部', '消费', '充值', '退款'],
    //     };
    // },
    // methods: {

    //     changeIndex(i) {

    //         this.currentIndex = i;
    //         // console.log("下标"+this.currentIndex);
    //     },
    // },
    // created() {
    //     this.showNavBar();
    //     this.showNavBarBg();
    //     this.changeNavBarTitile('交易记录');
    // },
    // mounted() {

    // },
};
</script>

<style  >
.active {
    background-color: #8b5cff;
    color: white;
}
</style>