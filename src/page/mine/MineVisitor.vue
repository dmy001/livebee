<template>
    <div>
        <ul class="flex-col justify-center items-center mt-10 ml-4">
            <van-list
                v-model:loading="loading"
                :finished="finished"
                :finished-text="$trans('没有更多了')"
                @load="onLoad"
            >
                <div v-for="(item, index) in items" :key="index" class="flex justify-content mt-2 flex-wrap">
                    <img class="w-12 h-12 rounded-full" :src="item.avatarUrl" />
                    <span class="ml-3">
                        <p class="w-full h-5 text-sm">{{ item.nickName }}</p>
                        <p class="w-full h-3.5 mt-3 text-xs text-gray-400">{{ $trans('访问了您') }}</p>
                    </span>
                    <span class="ml-auto mt-8 h-3.5 w-32 text-xs text-gray-400">{{
                        dateFormat(
                            new Date(`${item.visitTime.replace(/-/g, '/')} UTC`),
                            'YYYY/mm/dd HH:MM:SS'
                        )
                    }}</span>
                    <hr class="w-full mt-3" style="border: 0.03rem solid; color: #edf0f1" />
                </div>
            </van-list>
        </ul>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { getgagaUserRecentVisitors } from '../../api/mine/mineedit';
import { dateFormat } from '@utils';
import { trans } from '../../i18n';
import { reactive, toRefs } from 'vue';

export default {
    setup() {
        const store = useStore();
        store.dispatch('base/showNavBarBg');
        store.dispatch('base/changeNavBarTitile', trans('我的访客'));
        store.dispatch('base/showNavBar');
        const state = reactive({
            finished: false,
            items: [], //
            page: 1,
            pageSize: 7,
            loading: false,
            visitTime: '',
        });
        const onLoad = async () => {
            const res = await getgagaUserRecentVisitors(state.page);
            if (res.visitors.length === 0) return (state.finished = true);
            // console.log(res.visitors);
            // res.visitors.map(it => {
            //     console.log(it.visitTime);
            //     console.log(new Date(it.visitTime));
            // });
            state.page += 1;
            state.loading = false;
            // console.log(res.visitors);
            state.items = state.items.concat(res.visitors);
            // this.items = res.visitors;
        };
        // const dateFormat = async (...args) => {
        //     return dateFormat(...args);
        // };
        return {
            ...toRefs(state),
            dateFormat,
            onLoad,
        };
    },
    // data() {
    //     return {
    //         finished: false,
    //         items: [],
    //         page: 1,
    //         pageSize: 7,
    //         loading: false,
    //         visitTime: '',
    //     };
    // },
    // methods: {
    // ...mapActions('base', ['showNavBarBg', 'changeNavBarTitile', 'showNavBar']),

    // async onLoad() {
    //     const res = await getgagaUserRecentVisitors(this.page);
    //     if (res.visitors.length === 0) return (this.finished = true);
    //     console.log(res.visitors);
    //     res.visitors.map(it => {
    //         console.log(it.visitTime);
    //         console.log(new Date(it.visitTime));
    //     });
    //     this.page += 1;
    //     this.loading = false;
    //     // console.log(res.visitors);
    //     this.items = this.items.concat(res.visitors);
    //     // this.items = res.visitors;
    // },
    // dateFormat(...args) {
    //     return dateFormat(...args);
    // },
    // },
    // created() {
    //     this.showNavBar();
    //     this.showNavBarBg();
    //     this.changeNavBarTitile(this.$trans('我的访客'));
    // },
    // mounted() {
    //     // this.onLoad();
    // },
};
</script>

