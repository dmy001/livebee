<template>
    <main class="container font-semibold relative">
        <section class="container-top pt-1 bg-vip-top-bg">
            <div class="contop mt-24 h-36 mx-auto bg-vip-bg bg-no-repeat bg-cover pt-1">
                <p class="text-2xl text-vip-FFD38C font-semibold mt-10 ml-10">
                    {{ $trans('HiLive尊贵会员') }}
                </p>
                <p
                    class="text-sm font-normal text-vip-FFD38C ml-10 mt-3 text-opacity-50"
                    @click="getVipmsg()"
                >
                    {{ $trans(days_expiration) }}
                </p>
            </div>
        </section>
        <div class="botm border-transparent -mt-5 bg-white rounded-t-3xl">
            <div class="botm1 border-transparent flex flex-col justify-center items-center">
                <button
                    v-for="(item, i) in list"
                    :key="i"
                    class="
                        bg-gray-200
                        rounded-lg
                        flex
                        w-80
                        h-16
                        border-transparent
                        mt-4
                        justify-between
                        items-center
                    "
                    :class="{ active: currentIndex == i }"
                    @click="changeIndex(i)"
                >
                    <span class="ml-4 text-xl text-common-grey1">{{ $trans('{0}个月', [item.month]) }}</span>
                    <div class="flex-col flex">
                        <span class="mr-5">${{ item.price }}</span>
                        <span v-if="i !== 0" class="mr-5 text-xs">{{ item.everyMonth }}/{{ $trans('月') }}</span>
                    </div>
                </button>
            </div>
            <div class="botm2 font-medium">
                <div class="title flex justify-center mt-10 ml-6">
                    <img src="@img/mine/mineVip/vipIcon.png" alt="" />
                    <h3>{{ $trans('会员权益') }}</h3>
                    <img src="@img/mine/mineVip/vipIcon.png" alt="" />
                </div>
                <div class="templateItem">
                    <div v-for="(item, i) in vipList" :key="i" class="template mt-8">
                        <img class="w-12 h-12" :src="item.url" />
                        <p class="text-xs text-center break-word">{{ $trans(item.name) }}</p>
                    </div>
                </div>
            </div>
        </div>

        <ApplyBtn :price="price" :obj="obj" @click="toPayPage()"></ApplyBtn>
    </main>
</template>

<script>
import ApplyBtn from '@components/mine/ApplyBtn.vue';
import { mapActions } from 'vuex';
import vipIcon1 from '@img/mine/mineVip/vipIcon1.png';
import vipIcon2 from '@img/mine/mineVip/vipIcon2.png';
import vipIcon3 from '@img/mine/mineVip/vipIcon3.png';
import vipIcon4 from '@img/mine/mineVip/vipIcon4.png';
import vipIcon5 from '@img/mine/mineVip/vipIcon5.png';
import vipIcon6 from '@img/mine/mineVip/vipIcon6.png';
import vipIcon7 from '@img/mine/mineVip/vipIcon7.png';
import vipIcon8 from '@img/mine/mineVip/vipIcon8.png';
import { gagaVipList, getVipUserInfo, gagaVipIsTrue } from '@api/mine/mineVip.js';
import { showDate } from '@utils';
export default {
    // name: 'home',
    components: {
        ApplyBtn,
    },
    data() {
        return {
            obj: {
                IosId: 'vip_3_month',
                discount: 6.5,
                discountPrice: 49.99,
                everyMonth: 16.66,
                goodsId: 'ec6eabc179f64a60abe073b2913d2279',
                goodsName: '3-month',
                goodsType: 2,
                isHot: 0,
                month: 3,
                price: 49.99,
                proportion: 0,
            },
            price: 99.99,
            currentIndex: 2,
            isVip: 'false',
            days_expiration: '',
            list: [],
            vipList: [
                { name: '身份标识', url: vipIcon1 },
                { name: '无限翻译', url: vipIcon2 },
                { name: '模糊图', url: vipIcon3 },
                { name: '表情包', url: vipIcon4 },
                { name: '谁喜欢我', url: vipIcon5 },
                { name: '消息已读', url: vipIcon6 },
                { name: '专属客服', url: vipIcon7 },
                { name: '优先推荐', url: vipIcon8 },
            ],
        };
    },
    created() {
        this.showNavBar();
        this.hideNavBarBg();
        this.changeNavBarTitile(this.$trans('vip会员'));
    },
    async mounted() {
        await this.getgagaVipIsTrue();
        await this.getgagaVipList();
        await this.getVipmsg();
    },
    methods: {
        async getVipmsg() {
            await getVipUserInfo(); //获取用户会员信息
        },
        async getgagaVipIsTrue() {
            // debugger
            const { isTrue } = await gagaVipIsTrue(); //判断用户是否是会员
            this.isVip = isTrue;
        },
        async getgagaVipList() {
            // debugger
            const { list, days_remaining } = await gagaVipList(30); //获取会员价格列表
            this.list = list;

            if (this.isVip == 0) {
                if (days_remaining == 0) this.days_expiration = '您还未开通VIP会员';
                else if (days_remaining < 0) this.days_expiration = '您的VIP会员已经过期';
            } else if (days_remaining > 0) this.days_expiration = showDate(days_remaining);
        },
        toPayPage() {
            this.$router.push({
                path: '/PayVipInfo',
                query: { ...this.obj },
            });
        },
        ...mapActions('base', ['changeNavBarTitile', 'showNavBar', 'hideNavBarBg', 'showNavBarBg']),
        changeIndex(i) {
            this.currentIndex = i;
            this.price = this.list[i].price;
            this.obj = this.list[i];
        },
    },
};
</script>

<style scope>
.templateItem {
    width: 100%;
    text-align: center;
    display: flex;
    align-content: flex-start;
    flex-flow: row wrap;
}
.template {
    flex: 0 0 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
}
.active {
    background-color: #8b5cff;
    color: white;
}
button div span:nth-child(1) {
    color: #ff9838;
}
.active span {
    color: white !important;
}

div span:nth-child(2) {
    color: #8e8895 !important;
}
</style>