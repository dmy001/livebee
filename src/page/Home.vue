<template>
    <div class="pt-11">
        <!--  求关注引入 -->
        <!-- <LivePushDialog /> -->

        <!-- 头部 -->
        <div class="mt-4 flex justify-between px-5">
            <h2 class="text-2xl font-medium">Live</h2>
            <!-- <img src="@img/voca.png" class="w-8 h-8" /> -->
        </div>

        <div class="mt-3 rounded-lg pb-2 px-2">
            <!-- 轮播图引入 -->
            <CommonBanner :bannerList="carouselMap" />
        </div>
        <van-list
            v-model:loading="loading"
            :loading-text="$trans('加载中')"
            :finished="finished"
            :finished-text="$trans('没有更多了')"
            @load="liveonLoad"
        >
            <div v-show="isEmpty" class="flex justify-center mt-10">
                <img class="w-52 h-52 object-contain" src="@img/mine/otherCenter/empty.png" />
            </div>
            <div class="grid grid-cols-2 gap-2 px-2">
                <!-- 循环  -->
                <div
                    v-for="(item, index) in broadcast"
                    :key="index"
                    :class="index === 2 ? 'col-span-2' : 'col-span-1'"
                >
                    <!-- 大图 -->
                    <section v-if="index === 2">
                        <div class="flex justify-center items-center">
                            <div class="relative min-h-20">
                                <van-image
                                    radius="8"
                                    fit="cover"
                                    width="100%"
                                    :src="
                                        (item.coverImg ? item.coverImg : faultImage) + '?imageView2/1/h/800'
                                    "
                                    @click="jumpToLive(item.anchorId)"
                                />

                                <div class="absolute top-2.5 left-2.5 flex items-center">
                                    <img src="@img/longzhu.png" class="z-10 w-7 h-7" />
                                    <p
                                        class="
                                            h-6
                                            bg-yellow-300
                                            px-4
                                            rounded-tr-full rounded-r-full
                                            -ml-3
                                            text-white
                                        "
                                    >
                                        {{ $trans('人气榜') }}
                                    </p>
                                </div>

                                <div class="absolute top-2 right-0 h-4 flex mt-4">
                                    <img src="@img/signal.png" class="w-2.5 h-2.5 -mt-1.5 mr-1" />
                                    <p class="text-xs text-white mr-4 -mt-2">{{ item.popularity }}</p>
                                </div>
                                <div class="absolute left-0 bottom-2">
                                    <p class="text-sm ml-3 text-gray-300">{{ item.description }}</p>
                                    <section class="flex">
                                        <img
                                            :src="item.extras.countryUrl"
                                            class="w-5 h-5 ml-2 mt-1 mb-1 rounded-full"
                                        />
                                        <span class="text-xs mt-1 ml-2 text-white">{{ item.extras.nickName }}
                                        </span>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!-- 小图 -->
                    <section v-else>
                        <div class="flex justify-center items-center">
                            <div class="relative rounded-lg min-h-40">
                                <van-image
                                    fit="cover"
                                    radius="8"
                                    width="100%"
                                    :src="
                                        (item.coverImg ? item.coverImg : faultImage) + '?imageView2/1/h/400'
                                    "
                                    @click="jumpToLive(item.anchorId)"
                                />
                                <div class="absolute top-0 right-0 flex mt-4">
                                    <img src="@img/signal.png" class="w-2.5 h-2.5 -mt-1.5 mr-1" />
                                    <span class="text-xs text-white mr-4 -mt-2">{{ item.popularity }}</span>
                                </div>
                                <div class="absolute left-0 bottom-2">
                                    <p class="text-xs text-gray-300 ml-2">{{ item.name }}</p>
                                    <section class="flex">
                                        <img
                                            :src="item.extras.countryUrl"
                                            class="w-5 h-5 ml-2 mt-1 mb-1 rounded-full"
                                        />
                                        <span class="text-xs mt-1 ml-2 text-white">{{ item.extras.nickName }}
                                        </span>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </van-list>
        <!-- 立即登录引入-->
        <CommonSgnin />
        <!-- 底部导航栏引入 -->
        <CommonFooterTabBar current="home" />
    </div>
</template>
 <script>
// import LivePushDialog from '@components/LivePushDialog.vue';
import {useJumpToNative} from '@composables'
import CommonFooterTabBar from '@components/common/CommonFooterTabBar.vue';
import CommonBanner from '@components/common/CommonBanner.vue';
import CommonSgnin from '@components/common/CommonSgnin.vue';
import { commerceShow ,getoptimized} from '@api';
import { getCityImgById } from '@utils';
import DefaultImage from '@img/theDefaultImage.png';
import { toRefs, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        //  LivePushDialog,
        CommonFooterTabBar,
        CommonBanner,
        CommonSgnin,
    },
    setup() {
        const store = useStore();
        
        //关闭头部导航
        store.dispatch('base/hideNavBar');
        store.dispatch('base/hideNavBarBg');
        store.dispatch('base/changeNavBarTitile', '');

        const state = reactive({
            cityUrl: '',
            page: 0,
            size: 10,
            finished: false,
            loading: false,
            isEmpty: false,
            iEmpty: false,
            faultImage: DefaultImage,
            carouselMap: [],
            broadcast: [],
        });
        //轮播图
        onMounted(async () => {
            const { data } = await commerceShow(new Date().getTime());
            state.carouselMap = data[0] || [];
        });
        //直播首页数据
        const liveonLoad = async () => {
            const { data: broadcast } = await getoptimized(state.page, state.size);
            const newBroadcast = broadcast.pageData.content;
            if (!broadcast) {
                state.isEmpty = true;
                state.loading = false;
                state.finished = true;
            }
            const { last, content, empty, finished, totalElements } = broadcast.pageData;
            if (totalElements === 0) {
                state.finished = true;
            }
            if (newBroadcast.length === 0) {
                state.isEmpty = empty;
                if (!empty && finished) {
                    state.finished = true;
                }
                state.broadcast = content;
            } else {
                state.broadcast = state.broadcast.concat(content);
                state.finished = last;
            }
            state.loading = false;
            state.page += 1;
  
            //国旗引入
            for (let i = 0; i < state.broadcast.length; i++) {
                const it = state.broadcast[i];
                it.extras.countryUrl = await getCityImgById(it.extras.countryId);
            }
        };
       
        const {jumpToLive}=useJumpToNative();
       
        return {
            ...toRefs(state),
            onMounted,
            liveonLoad,
            jumpToLive,
           
        };
    },
};
</script>


