<template>
    <article class="container">
        <section class="content-top h-80 bg-jinbi-bg text-white">
            <div class="mx-auto">
                <div class="top-text flex ml-8 pt-28 items-center">
                    <strong class="text-base">{{ $trans('我的金币') }}</strong>
                    <img class="w-4 h-4" src="@img/mine/mineGold/gold@3x.png" alt="" />
                    <button class="text-xm h-7 rounded-2xl bg-jinbi-jiaoyi ml-auto mr-4 px-4" @click="goTo()">
                        {{ $trans('交易记录') }}
                    </button>
                </div>
                <p class="text-4xl ml-8 mt-3 text-white tracking-tight">{{ goldCount }}</p>
            </div>
        </section>
        <payGoldList class="-mt-24" @passObj="getPrice" @passFirstObj="getFirstPrice" />
        <ApplyBtn :obj="obj" :price="price" @click="toPayPage()"></ApplyBtn>
    </article>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ApplyBtn from '@components/mine/ApplyBtn.vue';
import payGoldList from '@components/mine/mineGold/payGoldList.vue';
import { getMineGoldCount } from '@api/mine/mineGold';
import { trans } from '@i18n';

export default {
    components: {
        ApplyBtn,
        payGoldList,
    },
    setup(){
        const router = useRouter();
        const store = useStore();
        const state = reactive({
            obj:{},
            currentIndex: 0,
            price: 0,
            goldCount: '0',
        
        })
        store.dispatch('base/changeNavBarTitile',trans('金币'))
        store.dispatch('base/showNavBar')
        store.dispatch('base/hideNavBarBg')
        const goTo = ()=>{
            router.push('/mine/MineTradingRecord');
        };
        const getPrice =  (data)=> {
            // 父组件接收价格参数的函数
            state.price = parseFloat(data.money.replace(/\$/, ''));
            state.obj = data;
        };
         const getGoldCount =async ()=> {
            const { gold } = await getMineGoldCount();
            state.goldCount = gold;
        };
        const  toPayPage = ()=> {
            router.push({
                path: '/PayGoldInfo',
                query: { ...state.obj },
            });
        };
        const getFirstPrice = (data)=>{
            if(!data) return
            state.obj = data;
            state.price =  parseFloat(data.money.replace(/\$/, ''));
        };
        onMounted(()=>{
            getGoldCount();
        })
        return {
            ...toRefs(state),
            router,
            goTo,
            getPrice,
            getGoldCount,
            toPayPage,
            getFirstPrice
        }
    },
    // data() {
    //     return {
    //         obj: {
    //             // IosId: 'gold__49.99',
    //             // gold: '4450',
    //             // money: '$49.99',
    //             // name: ''
    //         },
    //         currentIndex: 0,
    //         price: 0,
    //         goldCount: '0',
    //     };
    // },
    // methods: {
        // ...mapActions('base', ['changeNavBarTitile', 'showNavBar', 'hideNavBarBg']),
        // goTo() {
        //     this.$router.push('/mine/MineTradingRecord');
        // },
        // getPrice(data) {
        //     // 父组件接收价格参数的函数
        //     this.price = parseFloat(data.money.replace(/\$/, ''));
        //     this.obj = data;
        // },
        // async getGoldCount() {
        //     const { gold } = await getMineGoldCount();
        //     this.goldCount = gold;
        // },
        // toPayPage() {
        //     this.$router.push({
        //         path: '/PayGoldInfo',
        //         query: { ...this.obj },
        //     });
        // },
        // getFirstPrice(data){
        //     if(!data) return
        //      this.obj = data;
        //     this.price =  parseFloat(data.money.replace(/\$/, ''));
        // }
    // },
    // created() {
    //     this.showNavBar();
    //     this.hideNavBarBg();
    //     this.changeNavBarTitile(this.$trans('金币'));
    // },

    // mounted() {
    //     this.getGoldCount();
    //     // this.getFirstPrice();

    // },
};
</script>

<style>
.active {
    background-color: #8b5cff;
    color: white;
}
.item {
    align-items: center;
}
</style> 