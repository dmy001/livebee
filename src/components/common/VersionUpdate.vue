<template>
    <div class="w-72 h-80 rounded-3xl flex-col ml-5 mt-24 bg-cover bg-update-back z-50">
        <div class="ml-10">
            <section class="flex-col justify-center pt-10">
                <p class="font-semibold text-xl text-gray-700">发现新版本</p>
                <p class="text-purple-700 font-medium">{{ version }}</p>
            </section>
            <section class="mt-10 text-gray-600 text-sm break-all">
                <p v-for="(item, i) in textList" :key="i">{{ item }}</p>
                <!-- <p>1、看直播可分享;</p>
        <p>2、关注主播，从此不再错过（开播提醒）;</p>
        <p>3、修复了些许bug;</p>
        <p>4、其他内容。</p> -->
            </section>
        </div>
        <common-button class="w-2/3 mt-8 text-sm" title="立即更新"> </common-button>
    </div>
</template>
<script>
import CommonButton from '../components/common/CommonButton.vue';
import { reactive, toRefs, onMounted } from 'vue';
export default {
    components: {
        CommonButton,
    },
    setup() {
        const state = reactive({
            version: '',
            textList: [],
        });
        onMounted(() => {
            // const res = fn();
            // state.textList = res.list;
        });
        return {
            ...toRefs(state),
            /* version,
            textList, */
        };
    },
};
</script>