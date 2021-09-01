<template>
    <div>
        <div>
            <!-- 底部 -->

            <div
                class="
                    container
                    fixed
                    z-50
                    b-0
                    bottom-0
                    mx-auto
                    h-20
                    flex
                    justify-center
                    items-center
                    w-full
                    max-w-screen-md
                    bg-white
                "
            >
                <!-- 底左 -->
                <section class="h-20 w-2/6 z-10" @click="goHome">
                    <div class="text-center">
                        <img
                            :src="current === 'home' ? selectHomeImgUrl : defaultHomeImgUrl"
                            class="mt-4 mx-auto w-8 h-8"
                        />
                        <p class="text-sm" :class="current === 'home' ? 'text-purple-400' : 'text-gray-300'">
                            {{ $trans('直播') }}
                        </p>
                    </div>
                </section>

                <!-- 底中 -->
                <section class="h-20 w-2/6 z-10" @click="goFollow">
                    <div class="text-center">
                        <img
                            :src="current === 'follow' ? selectFollowImgUrl : defaultFollowImgUrl"
                            class="mt-4 mx-auto w-8 h-8"
                        />
                        <p
                            class="text-sm"
                            :class="current === 'follow' ? 'text-purple-400' : 'text-gray-300'"
                        >
                            {{ $trans('关注') }}
                        </p>
                    </div>
                </section>

                <!-- 底右 -->
                <section class="h-20 w-2/6 z-10" @click="goMine">
                    <div class="text-center">
                        <img
                            :src="current === 'mine' ? selectMineImgUrl : defaultMineImgUrl"
                            class="mt-4 mx-auto w-8 h-8"
                        />

                        <p class="text-sm" :class="current === 'mine' ? 'text-purple-400' : 'text-gray-300'">
                            {{ $trans('我的') }}
                        </p>
                    </div>
                </section>
            </div>
            <div class="h-20 w-full"></div>
        </div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { toRefs, reactive } from 'vue';
import defaulHome from '@img/livecast.png';
import selectHome from '@img/livecast2.png';
import defaultFollow from '@img/fow.png';
import selectFollow from '@img/fow2.png';
import defaultMine from '@img/myopns.png';
import selectMine from '@img/myopns2.png';

export default  {
    props: {
        
        current: String, // home | mime | follow
    },
  
    setup(props) {
        const router = useRouter();
        const state = reactive({
            //   current: '', // home | mime | follow

            defaultHomeImgUrl: defaulHome,
            selectHomeImgUrl: selectHome,
            defaultFollowImgUrl: defaultFollow,
            selectFollowImgUrl: selectFollow,
            defaultMineImgUrl: defaultMine,
            selectMineImgUrl: selectMine,
        });
        const goHome = () => {
            props.current !== 'home' && router.push('/');
        };
        const goFollow = () => {
            props.current !== 'follow' && router.push('/follow');
        };

        const goMine = () => {
            props.current !== 'mine' && router.push('/mine');
        };

        return {
            ...toRefs(state),
            goHome,
            goFollow,
            goMine,
        };
    },
};
</script>
