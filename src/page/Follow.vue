<template>
    <div class="pt-11">
        <div>
            <h2 class="text-xl ml-3 mt-5 font-bold">{{ $trans('关注') }}</h2>
        </div>

        <div class="flex mt-6 items-center ml-3">
            <img src="@img/livee.png" class="w-5 h-5" />
            <p class="ml-2.5 font-semibold text-base">{{ $trans('已关注主播直播中') }}</p>
        </div>
        <div v-show="iEmpty" class="flex justify-center mt-10">
            <img class="w-52 h-52 object-contain" src="@img/mine/otherCenter/empty.png" />
        </div>
        <!-- 已关注主播直播中 -->
        <section class="grid grid-cols-2 gap-2 px-2 mt-3">
            <div v-for="(item, index) in onlines" :key="index">
                <div class="flex justify-center items-center w-full">
                    <div class="rounded-lg relative">
                        <img
                            :src="(item.coverImg ? item.coverImg : DefaultImage) + '?imageView2/1/h/400'"
                            class="rounded-lg w-full block"
                            @click="jumpToLiveOne(item.anchorId)"
                        />
                        <div class="absolute top-1.5 left-2 flex">
                            <img src="@img/hot-2.png" class="w-3 h-3.5" />
                            <span class="text-xs text-white ml-0.5">{{ item.popularity }}</span>
                        </div>
                        <div class="absolute left-0 bottom-2">
                            <p class="text-xs text-white ml-2">{{ item.name }}</p>

                            <span class="text-sm mt-1 text-white ml-2">{{ item.extras.nickName }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- 已关注主播未开播 -->
        <div class="flex tems-center ml-3 mt-6">
            <img src="@img/tvpy.png" class="w-5 h-5" />
            <p class="font-semibold ml-2.5 text-base">{{ $trans('未开播') }}</p>
        </div>
        <van-list
            v-model:loading="loading"
            :loading-text="$trans('加载中')"
            :finished="finished"
            :finished-text="$trans('没有更多了')"
            @load="castonLoad"
        >
            <div v-show="isEmpty" class="flex justify-center mt-10">
                <img class="w-52 h-52 object-contain" src="@img/mine/otherCenter/empty.png" />
            </div>
            <section class="grid grid-cols-2 gap-2 px-2 mt-3">
                <div v-for="(item, index) in notOnlines" :key="index">
                    <div class="flex justify-center items-center">
                        <div class="rounded-lg relative min-h-24 w-full">
                            <van-image
                                radius="8"
                                fit="cover"
                                width="100%"
                                :src="
                                    (item.extras.avatarUrl ? item.extras.avatarUrl : '') + '?imageView2/1/h/400'"
                                @click="toOtherCenter(item.extras.gagaId)"
                            />

                            <div class="absolute left-0 bottom-2">
                                <div>
                                    <p class="text-xs text-white ml-3">
                                        {{ $trans('{0}人关注', [item.extras.subscribedCount]) }}
                                    </p>
                                </div>
                                <span class="text-sm mr-1 text-white ml-3">{{ item.extras.nickName }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </van-list>
        <!-- 底部导航栏引入 -->
        <CommonFooterTabBar current="follow" />
    </div>
</template>  

 <script>
import CommonFooterTabBar from '@components/common/CommonFooterTabBar.vue';
import { useJumpToNative } from '@composables';
import { getSubscribedRooms, getSubscribedNobroadcast } from '@api';
import DefaultImage from '@img/theDefaultImage.png';
import { toRefs, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    components: {
        CommonFooterTabBar,
    },

    setup() {
        const store = useStore();
        const router = useRouter();
        //关闭头部导航
        store.dispatch('base/hideNavBar');
        store.dispatch('base/hideNavBarBg');
        store.dispatch('base/changeNavBarTitile', '');

        const state = reactive({
            page: 0,
            size: 10,
            finished: false,
            loading: false,
            isEmpty: false,
            iEmpty: false,
            faultImage: DefaultImage,
            //已关注主播直播中
            onlines: [],
            //已关注主播未开播
            notOnlines: [],
        });
        //已关注主播直播中;
        onMounted(async () => {
            const { data: onlines } = await getSubscribedRooms();

            const newOnlines = onlines.content;
            if (!onlines) {
                state.iEmpty = true;
            }

            const { content, empty, totalElements } = onlines;
            if (totalElements === 0) {
                state.iEmpty = true;
            }
            if (newOnlines.length === 0) {
                state.iEmpty = empty;
                state.onlines = content;
            } else {
                state.onlines = state.onlines.concat(content);
            }
        });
        //已关注主播未开播
        const castonLoad = async () => {
            const { data: notOnlines } = await getSubscribedNobroadcast(state.page, state.size);
            const newNotOnlines = notOnlines.content;

            if (!notOnlines) {
                state.isEmpty = true;
                state.loading = false;
                state.finished = true;
            }
            const { last, content, empty, finished, totalElements } = notOnlines;
            if (totalElements === 0) {
                state.finished = true;
            }
            if (newNotOnlines.length === 0) {
                state.isEmpty = empty;
                if (!empty && finished) {
                    state.finished = true;
                }
                state.notOnlines = content;
            } else {
                state.notOnlines = state.notOnlines.concat(content);
                state.finished = last;
            }

            state.loading = false;
            state.page += 1;
        };
        // 点击进入直播间和判断未登录点击直播间跳转登录
        const { jumpToLive } = useJumpToNative();
        //未开播点击跳转进入他人中心
        const toOtherCenter = async gagaId => {
            router.push({
                path: '/otherCenter',
                query: { gagaId },
            });
        };
        return {
            ...toRefs(state),
            castonLoad,
            onMounted,
            jumpToLive,
            toOtherCenter,
        };
    },
};
</script>
 