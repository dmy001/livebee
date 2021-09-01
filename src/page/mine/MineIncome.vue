<template>
    <div class="relative">
        <div class="w-full h-72 bg-gradient-to-r from-secondary to-primary">
            <img class="absolute right-0 mt-20" src="@img/mine/myIncome/keyIcon.png" />
            <div class="mt-24 absolute ml-8">
                <p class="text-white text-3xl font-medium">$ {{ money }}</p>
                <button
                    class="
                        w-20
                        h-6
                        bg-white
                        opacity-50
                        rounded-xl
                        text-purple-500
                        mt-3
                        text-sm
                        font-medium
                        tracking-wide
                        focus:outline-none
                    "
                    @click="cashOut"
                >
                    申请提现
                </button>
            </div>
        </div>
        <div class="w-full h-2/3 bg-white rounded-t-3xl botom-0 -mt-24 absolute">
            <div class="mt-3 ml-12 space-x-32 font-bold text-gray-700">
                <p
                    class="inline-block font-bold float-left"
                    :class="{ active: currentIndex == 0 }"
                    @click="income()"
                >
                    收益记录
                </p>
                <p class="font-bold inline-block" :class="{ active: currentIndex == 1 }" @click="recorde()">
                    提现记录
                </p>
            </div>

            <p class="ml-10 mt-20">此页面这一版暂时没有</p>

            <div v-show="currentIndex == 0" class="mt-3 ml-5">
                <van-list
                    v-model:loading="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="earningOnLoad"
                >
                    <div v-for="(item, i) in data" :key="i" class="w-full space-y-6 space-x-5 flex">
                        <div class="w-11 h-11 rounded-full object-contain mt-5">
                            <img class="rounded-full" :src="item.avatar" />
                        </div>
                        <section class="w-1/2 h-12">
                            <p class="text-gray-500">{{ item.userName }}</p>
                            <p class="text-gray-300 text-xs">{{ item.createTime }}</p>
                        </section>
                        <section>
                            <p class="text-xl text-gray-600">+${{ item.money }}</p>
                            <p class="text-gray-300 text-xs text-right">{{ item.earningSource }}</p>
                        </section>
                    </div>
                    <div v-show="isEmpty"><img src="" /></div>
                </van-list>
            </div>

            <div v-show="currentIndex == 1" class="mt-3 ml-5">
                <van-list
                    v-model:loading="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="extractOnLoad"
                >
                    <div v-for="(it, i) in gift" :key="i" class="w-full space-y-5 space-x-5 flex">
                        <div class="w-11 h-11 rounded-full object-contain mt-5">
                            <img class="rounded-full" :src="it.avatar" />
                        </div>
                        <section class="w-1/2 h-12">
                            <p class="text-gray-500">{{ it.userName }}</p>
                            <p class="text-gray-300 text-xs">{{ it.createTime }}</p>
                        </section>
                        <section>
                            <p class="text-xl text-gray-600">-${{ it.extractAmount }}</p>
                            <p class="text-gray-300 text-xs text-right">{{ it.earningSource }}</p>
                        </section>
                    </div>
                    <div v-show="isEmpty"><img src="" /></div>
                </van-list>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Toast, Dialog } from 'vant';
import { getEarningRecord, extractApply, getExtractRecord, identityInfoQuery, walletMyMoney } from '@api';
import { dateFormat } from '@utils';
export default {
    setup(){
        const store = useStore();

        // 使用 action
        store.dispatch('base/showNavBar');
        store.dispatch('base/showNavBarBg');
        store.dispatch('base/changeNavBarTitile', '我的收益');
        const state = reactive({
             loading: false,
            finished: false,
            currentIndex: 0,
            isEmpty: false,
            data: [],
            gift: [],
            pageNo: 1,
            fee: 0,
            money: 0,
         });
         const earningOnLoad=async() =>{
            const earning = await getEarningRecord(this.pageNo);
            debugger;
            if (earning.data.length === 0) {
                return (this.finished = true);
            }
            this.data = this.data.concat(earning.data);
            this.loading = false;
            this.pageNo += 1;
            for (let i = 0; i < earning.data.length; i++) {
                const item = earning.data[i];
                item.createTime = dateFormat(
                    new Date(item.createTime.replace(/-/g, '/')),
                    'YYYY-mm-dd HH:MM'
                );
            }
        };
        const extractOnLoad =async()=> {
            const extract = await getExtractRecord(this.pageNo);
            this.gift = extract.data;
            if (extract.data.length === 0) {
                return (this.finished = true);
            }
            this.data = this.data.concat(extract.data);
            this.loading = false;
            this.pageNo += 1;
        };
        //申请提现按钮
        const cashOut=async()=> {
            const identity = await identityInfoQuery();

            switch (identity.status) {
                case 830:
                    return Toast('提现待审核');
                case 831:
                    // Dialog('未认证/驳回认证');
                    return Dialog.confirm({
                        title: '未认证/驳回认证',
                        message: '请进行身份认证',
                    })
                        .then(() => {
                            // on confirm
                            setTimeout(() => {
                                this.$router.push('/mine/identityInfo');
                            }, 1000);
                        })
                        .catch(() => {
                            // on cancel
                        });

                case 837:
                    return Toast('超过提现次数');
                default:
                    break;
            }
            const { status, msg } = await extractApply(this.money);
            if (status) return Toast(msg);
        };
        onMounted(async () => {
            // const extract = await getExtractRecord(this.pageNo);

            //     this.gift = extract.data;
            //总金额数
            debugger;
            const fee = await walletMyMoney();
            this.money = fee.data.balance;
        });
        return{
            ...toRefs(state),
            earningOnLoad,
            extractOnLoad,
            cashOut
        }
    }
 };
</script>
<style>
.active {
    color: #d988ff;
}
</style>