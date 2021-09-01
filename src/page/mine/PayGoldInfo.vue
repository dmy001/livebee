<template>
    <div class="text-common-grey1 font-common">
        <div class="border border-opacity-0 bg-jinbi-hui rounded-lg w-4/5 mx-auto mt-10 transparent">
            <p class="text-center text-xl font-semibold mt-4">{{ $trans('实付金额') }}</p>
            <p class="text-center mt-3 text-4xl leading-normal text-common-primary">
                <img class="inline-block" src="../../assets/img/mine/mineGold/gold@2x.png" alt="" />
                <span class="text-common-primary"> {{ data.money ? data.money.substring(1) : '' }}</span>
            </p>
            <p class="text-center mt-3 text-sm">
                <span class="">{{ `${$trans('订单金额')}:` }}</span><img class="mx-1 inline-block" src="../../assets/img/mine/mineGold/gold.png" alt="" /><span class="font-Semibold">{{ data.money ? data.money.substring(1) : '' }}</span>
            </p>
            <p class="text-center mt-3 mb-8 font-normal text-lg">
                <span>{{ `${$trans('订单信息')}:` }}</span>{{ data.name }}
            </p>
        </div>
        <Button class="mt-40" :title="$trans('购买')" @click="postOrderRecharge"></Button>
        <div class="w-64 mx-auto">
            <p class="text-center text-xs mt-4">
                {{ `${$trans('温馨提示:(为避免到账延迟,请勿选择电子支票')})` }}
            </p>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { payOrderRecharge } from '@api/mine/mineGold';
import { browserVersion } from '../../native/base.js';
import { toPay } from '../../native/index.js';
import { Toast } from 'vant';
import { trans } from '@i18n';


import Button from '../../components/common/CommonButton.vue';
export default {
    components: {
        Button,
    },
    setup(){
        const router  = useRouter();
        const store = useStore();
        const route = useRoute();
        store.dispatch('base/showNavBar');
        store.dispatch('base/showNavBarBg');
        store.dispatch('base/changeNavBarTitile',trans('支付'));
        const state = reactive({
             deviceInfo: {},
            data:route.query,
            gagaId: 0,
            thirdPayId: 'googleplay',
        })
        const postOrderRecharge  = async ()=> {
            const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo'));
            state.gagaId = baseUserInfo.gagaId;
            const res = await payOrderRecharge(
                state.gagaId,
                state.data.money.replace('$', ''),
                state.thirdPayId
            );
            const dataInfo = {
                payType: state.thirdPayId,
                orderInfo: {
                    goodsId: state.data.IosId,
                    orderId: res.orderId,
                    price: state.data.money.replace('$', ''),
                    goodsType: 1,
                },
            };
            const isSuc = await toPay(dataInfo);
            if (isSuc == 'success') {
                Toast.success(trans('购买成功'));
                router.go(-1);
            } else if (isSuc == 'failure') {
                Toast.fail(trans('因网络故障等原因，未充值成功，请稍后重试！'));
            }  
        };
        onMounted(()=>{
            state.deviceInfo = browserVersion();
        if (state.deviceInfo.android) {
            state.thirdPayId = 'googleplay';
        } else if (state.deviceInfo.ios) {
            state.thirdPayId = 'appstore';
        }
        })
        return {
            ...toRefs(state),
            postOrderRecharge
        }
    },
    // data() {
    //     return {
    //         deviceInfo: {},
    //         data: this.$route.query,
    //         gagaId: 0,
    //         thirdPayId: 'googleplay',
    //     };
    // },
    // mounted() {
    //     this.deviceInfo = browserVersion();
    //     if (this.deviceInfo.android) {
    //         this.thirdPayId = 'googleplay';
    //     } else if (this.deviceInfo.ios) {
    //         this.thirdPayId = 'appstore';
    //     }
    // },
    // methods: {
    //     ...mapActions('base', ['changeNavBarTitile', 'showNavBar', 'showNavBarBg']),
    //     async postOrderRecharge() {
    //         const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo'));
    //         this.gagaId = baseUserInfo.gagaId;
    //         const res = await payOrderRecharge(
    //             this.gagaId,
    //             this.data.money.replace('$', ''),
    //             this.thirdPayId
    //         );
    //         const dataInfo = {
    //             payType: this.thirdPayId,
    //             orderInfo: {
    //                 goodsId: this.data.IosId,
    //                 orderId: res.orderId,
    //                 price: this.data.money.replace('$', ''),
    //                 goodsType: 1,
    //             },
    //         };
    //         const isSuc = await toPay(dataInfo);
    //         if (isSuc == 'success') {
    //             Toast.success(this.$trans('购买成功'));
    //             this.$router.go(-1);
    //         } else if (isSuc == 'failure') {
    //             Toast.fail(this.$trans('因网络故障等原因，未充值成功，请稍后重试！'));
    //         }
    //         // }
    //     },
    // },
    // created() {
    //     this.showNavBar();
    //     this.showNavBarBg();
    //     this.changeNavBarTitile(this.$trans('支付'));
    // },
};
</script>

