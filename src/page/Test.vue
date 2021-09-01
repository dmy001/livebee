<template>
    <div class="container">
        <div class="h-80 bg-jinbi-bg pt-12 pl-4 text-white">
            <!-- <div class="flex items-center">
                <div
                    class="w-3 h-3 border-t-2 border-r-2 border-white transform -rotate-135 float-left"
                ></div>
                <p class="text-2xl mx-auto">金币</p>
            </div> -->
            <div class="ml-6 mt-12 flex items-center">
                <strong class="text-base">我的金币</strong>
                <img class="w-4 h-4 ml-2" src="@img/mine/mineGold/gold.png" alt="" />
                <button @click="tradingRecord" class="ml-auto h-8 rounded-2xl bg-jinbi-jiaoyi mr-4 px-4">
                    交易记录
                </button>
            </div>
            <p class="text-3xl ml-6 mt-2">{{ goldCount }}</p>
        </div>
        <!-- <div
            class="
                grid grid-cols-2
                gap-4
                w-11/12
                h-96
                p-3
                border-solid border border-gray-50
                -mt-24
                mx-auto
                rounded-2xl
                bg-white
            "
        >
            <div
                v-for="(item, index) in list"
                :key="index"
                v-on:click="chanceColor(index)"
                class="bg-gray-100 rounded-2xl pt-4 pl-6"
                :class="{ 'bg-purple-500': index === selectedIndex }"
            >
                <span
                    class="ml-2 flex items-center text-2xl"
                    :class="[index === selectedIndex ? 'text-white' : 'text-gray-700']"
                    ><p>{{ item.glod }}</p>
                    <img class="w-4 h-4 ml-2" src="@img/mine/mineGold/gold.png" alt="" />
                </span>
                <p
                    class="ml-2 mt-2 text-xl"
                    :class="[index === selectedIndex ? 'text-white' : 'text-gray-500']"
                >
                    {{ item.pay }}
                </p>
            </div>
        </div> -->
        <TestList @transferList="getList"></TestList>
        <p class="ml-8">选择的钱数为：{{message}}</p>
    </div>
</template>


<script>
import { mapActions } from 'vuex';
import TestList from '@components/test/TestList.vue';
export default {
  components: { TestList },
    data() {
        return {
            /* list: [
                { glod: '20', pay: '$20' },
                { glod: '50', pay: '$50' },
                { glod: '100', pay: '$100' },
                { glod: '200', pay: '$200' },
                { glod: '500', pay: '$500' },
                { glod: '1000', pay: '$1000' },
            ],
            selectedIndex: 0, */
            message:'',
            goldCount: '753,256,00',
        };
    },
    methods: {
         ...mapActions('base', ['changeNavBarTitile', 'showNavBar', 'hideNavBarBg']),
        /* chanceColor(index) {
            this.selectedIndex = index;
        }, */
        tradingRecord() {
            this.$router.push('/mine/MineTradingRecord');
        },
        getList(msg){
            this.message=msg;
        }
    },
    created() {
        this.showNavBar();
        this.hideNavBarBg();
        this.changeNavBarTitile('金币');
    },
};
</script>
