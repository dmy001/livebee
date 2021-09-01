<template>
    <div class="relative">
        <div class="overflow-hidden rounded-lg">
            <ul v-if="bannerList.length === 1" class="overflow-hidden flex flex-nowrap">
                <li>
                    <img :src="bannerList[0].imageUrl" class="w-full" @click="cmap(bannerList[0])" />
                </li>
            </ul>
            <ul v-else-if="bannerList.length === 0" class="overflow-hidden flex flex-nowrap one">
                <li></li>
            </ul>

            <ul
                v-else
                class="overflow-hidden flex flex-nowrap"
                :style="[sliderActive, { width: sliderImg.length * 100 + '%' }]"
                @touchstart="stopSlider($event)"
                @touchmove="moveSlider($event)"
                @touchend="continSilder"
            >
                <li v-for="(item, index) in sliderImg" :key="index" class="w-full">
                    <img :src="item.imageUrl" class="w-full" @click="cmap(item)" />
                </li>
            </ul>
        </div>
        <ul class="absolute bottom-3 flex justify-center items-center w-full">
            <li
                v-for="(item, index) in bannerList"
                :key="index"
                class="bg-opacity-60 bg-black-1 rounded-full w-1.5 h-1.5 mx-1"
                :class="[index === nowSlider ? 'bg-opacity-100' : '']"
            ></li>
        </ul>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { trans } from '@i18n';
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue';
export default defineComponent({
    props:{
      bannerList: {
        type: Array,
        default: () => []
      },
    },
    setup(props) {
        console.log(props);
        const { bannerList } = toRefs(props);
        const store = useStore();
        const router = useRouter();
        const state = reactive({
            // bannerList: props.bannerList,
            interval: -1,
            startTouch: '',
            moveTouch: '',
            canslider: true,
            nowSlider: 0,
            sliderActive: {
                transform: `translate3d(-${100 / (bannerList.value.length + 2)}%,0,0)`,
                transition: 'transform 0.5s',
            },
        });
        const sliderImg = computed(() => {
            // if(bannerList)
            // const [...judeg] = bannerList.value
            const [...saveImg] = bannerList.value; //拷贝图片列表数据，在展示区域的图片实际上首尾拷贝了一样的图片，即尾端拷贝第一张，首端拷贝最后一张
            // if(judeg.length <= 1){
            //     console.log(saveImg)
            //     return saveImg;
            // } else{
            const [imgfirst] = bannerList.value;
            const [...other] = bannerList.value; //
            saveImg.unshift(other[other.length - 1]);
            saveImg.push(imgfirst);
            return saveImg;
            // }
        });

        const stopSlider = e => {
            clearInterval(state.interval);
            state.sliderActive.transition = 'transform 0s'; //关闭css3过渡效果
            state.startTouch = e.targetTouches[0].screenX;
        };
        const moveSlider = e => {
            if (state.nowSlider === -1 || state.nowSlider === bannerList.value.length) {
                //首端与尾端未连接好禁止滑动
                return;
            }
            state.moveTouch = e.targetTouches[0].screenX;
            const slideDir = state.moveTouch - state.startTouch;
            const targetWidth = parseInt(window.getComputedStyle(e.target).width);
            // if (slideDir < -50 || slideDir > 50) {
            //   //加了50容错值，能预防触摸时图片突然闪动
            //   if (slideDir < 0) {
            //     //再重新补回差值
            //     slideDir -= 50;
            //   } else {
            //     slideDir += 50;
            //   }
            const tranDir = -targetWidth * (state.nowSlider + 1) + slideDir; //触摸时图片随手指移动，距离须减去当前图片宽度乘以当前滚动索引
            state.sliderActive.transform = `translate3d(${tranDir}px,0,0)`;
            // }
        };
        //结束触摸 继续滑动
        const continSilder = () => {
            // 移动距离太小  可以理解为点击事件
            if (!state.moveTouch) return;
            const slideDir = state.moveTouch - state.startTouch;
            if (slideDir > 0) {
                state.nowSlider -= 2;
            }
            sliderStart(); //立即设置位置
            state.moveTouch = 0; //清空手势位置
            state.startTouch = 0;
            state.interval = setInterval(() => sliderStart(), 3000);
        };
        const sliderStart = () => {
            state.nowSlider++;
            state.nowSlider %= sliderImg.value.length;
            if (state.nowSlider === bannerList.value.length) {
                //向右滑动到最大值时，将位置初始化并清0 nowSlider
                setTimeout(() => {
                    //设置一个定时器，用于异步处理，一个进行尾端拷贝的图片的正常滑动，这个处理在差不多到达时重置，造成无限循环的错觉
                    state.sliderActive = {
                        transform: `translate3d(-${100 / sliderImg.value.length}%,0,0)`,
                    };
                    state.nowSlider = 0;
                }, 500);
            } else if (state.nowSlider === -1) {
                //向右滑动到最小值时，将位置置为最大值
                setTimeout(() => {
                    state.nowSlider = bannerList.value.length - 1;
                    state.sliderActive = {
                        transform: `translate3d(${-(
                            (100 * (state.nowSlider + 1)) /
                            sliderImg.value.length
                        )}%,0,0)`,
                    };
                }, 500);
            }
            state.sliderActive = {
                transition: 'transform 0.5s',
                transform: `translate3d(${-((100 * (state.nowSlider + 1)) / sliderImg.value.length)}%,0,0)`,
            };
        };

        const cmap = item => {
            const token = localStorage.getItem('token');
            if ((token && token === 'ef79a4a9cd0b4c3bb102c8f76282b38b') || !token) {
                return router.push('/login/login');
            }
            store.dispatch('externalLinks/changeExternalLinks', item.clickUrl);
            store.dispatch('externalLinks/changeExternalLinksTitle', trans(''));
            router.push('/externalLinks');
        };

        onMounted(() => {
            state.interval = setInterval(() => sliderStart(), 3000);
        });

        return {
            ...toRefs(state),
            sliderImg,
            stopSlider,
            moveSlider,
            continSilder,
            sliderStart,
            cmap,
        };
    },
});
</script>
