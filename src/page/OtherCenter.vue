<template>
    <div class="container mx-auto relative">
        <div class="w-full">
            <img class="w-full h-96 relative" :src="other.avatarUrl" />
            <div class="ml-5">
                <section>
                    <button class="focus:outline-none" @click="toPage">
                        <img class="h-4 w-4 absolute top-10" src="@img/mine/goBack.png" />
                    </button>
                    <div class="absolute top-10 right-5 px-2" @click="show = true">
                        <img class="h-4 w-5" src="@img/mine/caidan.png" />
                    </div>
                    <van-popup
                        v-model:show="show"
                        position="bottom"
                        :overlay="true"
                        :overlay-style="{ backgroundColor: 'rgb(0 0 0 / 26%)' }"
                        :style="{
                            width: '100%',
                            bottom: '11px',
                            background: 'none',
                        }"
                    >
                        <div
                            class="
                                w-4/5
                                bg-white
                                rounded-xl
                                mx-auto
                                text-center
                                leading-10
                                border-solid border-b border-gray-200
                                top-10
                                mb-5
                            "
                            @click="handleReport"
                        >
                            {{ $trans('举报') }}
                        </div>
                        <div
                            class="w-4/5 bg-white rounded-xl mx-auto text-center leading-10"
                            @click="show = false"
                        >
                            {{ $trans('取消') }}
                        </div>
                    </van-popup>
                </section>
                <section class="absolute bottom-24">
                    <p class="text-white font-medium text-2xl">{{ other.nickName }}</p>
                    <p class="text-white text-xs">ID:{{ other.username }}</p>
                    <section class="space-x-1 flex mt-2">
                        <div
                            class="
                                w-10
                                h-4
                                rounded-2xl
                                bg-pink-500
                                text-gray-50 text-center
                                float-left
                                flex
                                space-x-1
                            "
                        >
                            <img class="w-2 h-3 object-contain mt-0.5 leading-4 ml-2" :src="gender" alt="" />
                            <p class="leading-4 text-xs">{{ age }}</p>
                        </div>
                        <img class="w-4 h-4 rounded-full object-contain" :src="cityUrl" />
                        <img class="h-4 rounded-full object-contain" :src="level" />
                    </section>
                </section>
            </div>
        </div>
        <div class="w-full h-96 bg-white rounded-t-2xl -mt-20 absolute">
            <div class="ml-5 mt-5">
                <div class="space-x-20">
                    <section class="float-left">
                        <div
                            class="change text-base font-medium text-gray-400"
                            :class="{ actived: currentIndex == 0 }"
                            @click="currentIndex = 0"
                        >
                            {{ $trans('礼物') }}
                        </div>
                        <div
                            class="w-4 h-2 ml-2 bg-gradient-to-r from-secondary to-primary rounded-xl hidden"
                            :class="{ shape: currentIndex == 0 }"
                        ></div>
                    </section>
                    <section>
                        <div
                            class="change text-gray-400 text-base font-medium"
                            :class="{ actived: currentIndex == 1 }"
                            @click="currentIndex = 1"
                        >
                            {{ $trans('个人介绍') }}
                        </div>
                        <div
                            class="w-4 h-2 ml-8 bg-gradient-to-r from-secondary to-primary rounded-xl hidden"
                            :class="{ shape: currentIndex == 1 }"
                        ></div>
                    </section>
                </div>
                <div v-show="currentIndex == 0">
                    <van-list
                        v-model:loading="loading"
                        :loading-text="$trans('加载中') + '...'"
                        :finished="finished"
                        :finished-text="$trans('没有更多了')"
                        @load="onLoad"
                    >
                        <div v-for="(item, i) in gifts" :key="i" class="w-full space-y-5 space-x-5 flex">
                            <div class="w-12 h-12 rounded-full object-contain mt-5">
                                <img class="w-10 h-10 rounded-full" :src="item.fromUser.avatarUrl" />
                            </div>
                            <section class="w-3/4 border-b border-gray-50 h-30 pb-2">
                                <p class="text-gray-500">{{ item.fromUser.nickname }}</p>
                                <p class="text-sm text-gray-600">{{ $trans('送你') }}“{{ item.giftName }}”</p>
                                <p class="text-gray-300 text-xs">
                                    {{ dateFormat(new Date(item.createTime), 'mm-dd HH:MM') }}
                                </p>
                            </section>
                            <section class="w-14 h-14">
                                <img class="-ml-5" :src="`http://images.gagahi.com/${item.giftUrl}`" />
                            </section>
                        </div>
                        <div v-show="isEmpty" class="mt-10">
                            <img
                                class="mx-auto w-56 h-52 object-contain"
                                src="@img/mine/otherCenter/empty.png"
                            />
                        </div>
                    </van-list>
                </div>
                <div v-show="currentIndex == 1">
                    <div class="mt-5">
                        <img class="w-5 h-5" src="@img/mine/otherCenter/people.png" />
                        <p class="text-sm text-gray-500 font-semibold -mt-5 ml-6 absolute">
                            {{ $trans('关于我') }}
                        </p>
                        <p class="text-xs text-gray-500 mt-2">
                            {{ other.height }}cm <span class="text-gray-300">|</span> {{ other.weight }}kg
                            <span class="text-gray-300">|</span> {{ other.genderId }}
                            <span class="text-gray-300">|</span>
                            {{ other.job }}
                        </p>
                    </div>
                    <div class="mt-2 space-x-2">
                        <p
                            v-for="(it, index) in hobby"
                            :key="index"
                            class="
                                px-1
                                h-5
                                bg-gray-300
                                opacity-30
                                rounded-xl
                                text-center
                                leading-5
                                text-xs
                                inline-block
                                text-gray-800
                            "
                        >
                            {{ it }}
                        </p>
                    </div>
                    <section class="mt-5 w-full pr-5">
                        <img class="w-5 h-5" src="@img/mine/otherCenter/pen.png" />
                        <p class="text-sm text-gray-500 font-semibold -mt-4 ml-6">{{ $trans('个性签名') }}</p>
                        <p class="text-sm text-gray-700 mt-2 leading-5 break-words">
                            {{ other.signature }}
                        </p>
                    </section>
                </div>
                <section class="fixed bottom-10 left-0 w-full">
                    <CommonButton
                        v-show="!show"
                        class="leading-9 focus:outline-none shadow-lg mx-auto"
                        type="button"
                        :title="other.isLiked == 1 ? $trans('已关注') : '+' + $trans('关注')"
                        :class="{ color: other.isLiked == 1 }"
                        @click="concern(other.gagaId)"
                    >
                    </CommonButton>
                </section>
            </div>
        </div>
    </div>
</template>
<script >
import { reactive, toRefs, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import CommonButton from '@components/common/CommonButton.vue';
import { getOtherUser, getUserGifts, getLikedGagaId } from '@api';
import { getAgeByBirthday, getCityImgById } from '@utils';
import Women from '@img/mine/otherCenter/women.png';
import Man from '@img/mine/otherCenter/man.png';
import Icon from '@img/mine/icon.png';
import { Toast } from 'vant';
import { dateFormat } from '@utils';
import { trans } from '@i18n';
import { goBackNative, updateAttention } from '@native';
export default {
    name: 'OtherCenter',
    components: {
        CommonButton,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        // 使用 action
        store.dispatch('base/hideNavBar');
        store.dispatch('base/hideNavBarBg');
        store.dispatch('base/changeNavBarTitile', '');
        const state = reactive({
            comeType: '',
            title: '关注',
            currentIndex: 0,
            cityUrl: '',
            loading: false,
            finished: false,
            isEmpty: false,
            toUserId: '',
            page: 0,
            size: 7,
            show: false,
            other: {
                username: '',
                nickName: '',
                gagaId: '',
                avatarUrl: '',
                genderId: 'M',
                countryId: '',
                weight: 0,
                height: 0,
                job: '',
                birthday: '',
                interest: '',
                signature: '',
                isLiked: 0,
                level: 3,
            },
            gifts: [],
            hobby: [],
        });
        const toPage = () => {
            const comeType = route.query.comeType;
            if (comeType == 'native') return goBackNative();
            router.go(-1);
        };
        const handleReport = () => {
            router.push('/complaint');
        };
        const onLoad = async () => {
            const gagaId = route.query.gagaId || 'd8ef8e297f2944d4b2353fec429a26f7';
            state.toUserId = gagaId;
            const { data } = await getUserGiftsList(state.toUserId, state.page, state.size);
            console.log(state.page);
            if (!data) {
                state.isEmpty = true;
                state.loading = false;
                state.finished = true;
                return;
            }
            const { last, content, empty, finished } = data;
            if (state.page === 0) {
                state.isEmpty = empty;
                if (!empty && finished) {
                    state.finished = true;
                }
                state.gifts = content;
            } else {
                state.gifts = state.gifts.concat(content);
                state.finished = last;
            }
            state.loading = false;
            state.page += 1;
            // for (var i = 0; i < state.gifts.length; i++) {
            //     const item = state.gifts[i];
            //     item.createTime = dateFormat(new Date(item.createTime), 'mm-dd HH:MM');
            // }
        };
        const getUserGiftsList = async toUserId => {
            return await getUserGifts(toUserId, state.page, state.size);
        };
        const concern = async gagaId => {
            await getLikedGagaId(gagaId);
            state.other.isLiked = 1;
            Toast(trans('已关注'));
            const level = state.other.isLiked == 1 ? 'SUBSCRIBED' : 'NONE';
            return updateAttention(gagaId, level);
        };
        const age = computed(() => getAgeByBirthday(state.other.birthday || Date.now()));
        const gender = computed(() => {
            if (state.other.genderId == 'M') {
                return Man;
            } else {
                return Women;
            }
        });
        const level = computed(() => (state.other.level == 30 ? Icon : ''));
        onMounted(async () => {
            const gagaId = route.query.gagaId || 'd8ef8e297f2944d4b2353fec429a26f7';
            const res = await getOtherUser(gagaId);
            state.toUserId = gagaId;
            const obj = Object.keys(state.other).reduce((acc, cur) => {
                acc[cur] = res[cur];
                return acc;
            }, {});
            state.other = { ...obj };
            state.other.isLiked = res.isLiked;
            // 城市图片
            state.cityUrl = await getCityImgById(state.other.countryId);
            //兴趣爱好
            if (state.other.interest) {
                state.hobby = state.other.interest.split(',').filter(Boolean);
            }
        });
        return {
            ...toRefs(state),
            onLoad,
            concern,
            getUserGiftsList,
            dateFormat,
            age,
            onMounted,
            gender,
            level,
            toPage,
            handleReport,
        };
    },
};
</script>
<style>
/* .change {
    background-color: none;
} */
.actived {
    color: rgb(105, 104, 104);
    font-size: 21px;
    font-weight: 550;
}
.shape {
    display: block;
}
.color {
    background: #eeebf2;
    color: #ceccce;
}
</style>