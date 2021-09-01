<template>
    <div>
        <van-list
            v-model:loading="loading"
            :finished="finished"
            :finished-text="$trans('没有更多了')"
            :immediate-check="false"
            @load="onLoad"
        >
            <div v-for="(item, i) in data" :key="i" :transType="transType" class="item flex mt-6 ml-5">
                <img :src="item.imgsrc" class="w-10 h-10" alt="" />
                <div class="content flex flex-col ml-2">
                    <span class="font-semibold text-base text-common-grey1">{{ $trans(item.name) }}</span>
                    <span class="text-jinbi-C7C4CC text-xs">{{ item.createTime }}</span>
                </div>
                <span class="ml-auto mr-4 font-semibold text-xl text-common-grey1">{{ item.money }}</span>
            </div>
        </van-list>
    </div>
</template>

<script>
import { getwalletUserTranslationLog } from '@api/mine/mineCheck.js';
import comsumeCharge from '@img/mine/mine/comsumeCharge.png';
import addCharge from '@img/mine/mine/addCharge.png';
import backCharge from '@img/mine/mine/backCharge.png';

export default {
    name: 'TradingRecord',
    props: {
        transType: {
            default: 0,
            type: Number, // 父组件传回的交易类型的值 0所有 1充值 4 消费 5 退款
            
        },
    },
    data() {
        return {
            finished: false,
            empty: true,
            pageNo: 1,
            pageSize: 7,
            data: [], // 用于展示的数组
            list: [],
            loading: false,
            // pageNo: 1,
        };
    },
      mounted() {
        this.onLoad();
    },
    methods: {
        async onLoad() {
            // console.log(this.pageNo,this.finished)
            const res = await getwalletUserTranslationLog(this.pageNo, this.pageSize, this.transType);
            
            if (res.list.length === 0) return (this.finished = true);
            this.data = this.data.concat(res.list);
            this.loading = false;
            this.pageNo += 1;
            for (var i = 0; i < res.list.length; i++) {
                const item = res.list[i];
                if (item.transType == 1) {
                    item.name = '消费';
                    item.imgsrc = comsumeCharge;
                    item.money = '-$' + item.money;
                } else if (item.transType == 4) {
                    item.name = '充值';
                    item.imgsrc = addCharge;
                    item.money = '+$' + item.money;
                } else if (item.transType == 5) {
                    item.name = '退款';
                    item.imgsrc = backCharge;
                    item.money = '$' + item.money;
                }
            }
        },
    },
  
};
</script>

<style scope >
.item {
    align-items: center;
    /* justify-content: center; */
}
</style>