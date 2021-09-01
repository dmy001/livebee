<template>
    <section class="flex justify-center items-center content-bottom shadow-md bg-white mx-3 rounded-lg">
        <ul class="flex flex-wrap justify-left; mb-6 w-full">
            <li
                v-for="(item, i) in list"
                :key="i"
                class="items w-2/5 h-24 bg-grey-7 rounded-lg mt-4 ml-6"
                :class="{ selected: currentIndex == i }"
                @click="changeIndex(i)"
            >
                <div class="item flex mt-4 ml-4">
                    <span class="text-2xl text-common-grey1 font-normal">{{ item.gold }}</span>
                    <img class="w-4 h-4 ml-1" src="@img/mine/mineGold/gold@3x.png" alt="" />
                </div>
                <p class="ml-4 mt-1 text-common-grey3">{{ item.money }}</p>
            </li>
        </ul>
    </section>
</template>

<script>
import { getMineGold } from '@api/mine/mineGold.js';
import { reactive, toRefs, onMounted } from 'vue';

import { browserVersion } from '../../../native/base.js';

export default {
    // name: 'payGoldList',
    emits: ['passObj', 'passFirstObj'],
    setup(_, { emit }) {
        const state = reactive({
            price: '',
            currentIndex: 0,
            list: [],
        });
        const changeIndex = i => {
            state.currentIndex = i;
            state.price = state.list[i].money; // 赋值
            emit('passObj', state.list[i]); // 将对象传给父组件，以便在支付按钮上显示价格
        };
        const getGoldMsg = async () => {
            const res = await getMineGold(); // 获取金币价格列表数据
            const deviceInfo = browserVersion();
            // console.log(this.deviceInfo);
            if (deviceInfo.android) {
                res.data.map(it => {
                    if (parseFloat(it.money.replace(/\$/, '')) < 400) {
                        state.list.push(it);
                    }
                });
            } else state.list = res.data;
        };
         onMounted(async () => {
            await getGoldMsg();
            emit('passFirstObj', state.list[0]);
        });
        return {
            ...toRefs(state),
            getGoldMsg,
            changeIndex
        }
    },

    // data() {
    //     return {
    //           price: '',
    //         currentIndex: 0,
    //         list: [],
    //     };
    // },
    // methods: {
    //     changeIndex(i) {
    //         this.currentIndex = i;
    //         this.price = this.list[i].money; // 赋值
    //         this.$emit('passObj', this.list[i]); // 将对象传给父组件，以便在支付按钮上显示价格
    //     },
    //     // 获取数据
    //     async getGoldMsg() {
    //         const res = await getMineGold(); // 获取金币价格列表数据
    //         const deviceInfo = browserVersion();
    //         // console.log(this.deviceInfo);
    //         if (deviceInfo.android) {
    //             res.data.map(it => {
    //                 if (parseFloat(it.money.replace(/\$/, '')) < 400) {
    //                     this.list.push(it);
    //                 }
    //             });
    //         } else this.list = res.data;
    //     },
    // },
    // async mounted() {
    //     await this.getGoldMsg();
    //     const list = this.list;
    //     debugger;
    //     this.$emit('passFirstObj', this.list[0]);
    // },
};
</script>

<style scoped>
.selected {
    background-color: #8b5cff;
}
.selected p {
    color: white;
}
.selected div span {
    color: white;
}
</style>