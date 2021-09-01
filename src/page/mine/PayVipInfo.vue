<template>
    <div class="text-common-grey1 font-common">
        <div class="border border-opacity-0 bg-jinbi-hui rounded-lg w-4/5 mx-auto mt-10 transparent">
            <p class="text-center text-xl font-semibold mt-4">{{ $trans('实付金额') }}</p>
            <p class="text-center mt-3 text-4xl leading-normal">
                <img class="inline pb-2 pr-2" src="../../assets/img/mine/mineGold/gold@3x.png" alt="" />
                <span class="text-common-primary align-top font-semibold"> {{ data.price }}</span>
            </p>
            <p class="text-center mt-3 text-sm">
                <span class="">{{ $trans('订单金额:') }}</span><img
                    class="mx-2 inline-block"
                    src="../../assets/img/mine/mineGold/gold@2x.png"
                    alt=""
                /><span class="font-semibold">{{ data.price }}</span>
            </p>
            <p class="text-center mt-3 mb-8 font-normal text-lg">
                <span>{{ $trans('订单信息:') }}</span>{{ parseFloat(data.goodsName) }}个月
            </p>
        </div>
        <Button class="mt-40" :title="$trans('购买')" @click="postPayOrder"></Button>
        <p class="text-center text-xs mt-4">{{ $trans('温馨提示:(为避免到账延迟,请勿选择电子支票)') }}</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { browserVersion } from '../../native/base.js';
import { toPay } from '../../native/index.js';
import { payOrder } from '@api/mine/mineVip';
import Button from '../../components/common/CommonButton.vue';
export default {
    components: {
        Button,
    },
    data() {
        return {
            deviceInfo: {},
            data: this.$route.query,
            gagaId: 0,
            thirdPayId: 'googleplay',
        };
    },
    created() {
        this.showNavBar();
        this.showNavBarBg();
        this.changeNavBarTitile('支付');
    },
     mounted() {
        this.deviceInfo = browserVersion();
        if (this.deviceInfo.android) {
            this.thirdPayId = 'googleplay';
        } else if (this.deviceInfo.ios) {  // 改成applestore
            this.thirdPayId = 'applestore';     //支付方式
        }
    },
    methods: {
        ...mapActions('base', ['changeNavBarTitile', 'showNavBar', 'showNavBarBg']),
        async postPayOrder() {
            const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo'));
            this.gagaId = baseUserInfo.gagaId;
            const res = await payOrder(
                this.data.goodsId,
                this.data.goodsType,
                this.data.price,
                this.gagaId,
                this.thirdPayId
            );
            if (res.code == 200) {
                const dataInfo = {
                    payType: this.thirdPayId,
                    orderInfo: {
                        goodsId: this.data.IosId,
                        orderId: res.orderId,
                        price: res.money,
                        goodsType: 2,
                    },
                };
                console.log(dataInfo);
                toPay(dataInfo);
            }
        },
    },
    
   
    
};
</script>

