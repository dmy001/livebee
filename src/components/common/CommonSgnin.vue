<template>
    <section v-if="showLogin" @click="toLogin">
        <div v-show="curIsShow" class="
                justify-center
                items-center
                max-w-screen-md
                w-full
                h-12
                bg-gradient-to-r
                from-secondary
                to-primary
                flex
                fixed
                bottom-20
                container
            "
        >
            <div class="flex mx-auto">
                <div class="flex">
                    <p class="text-sm text-white tracking-wider">{{ $trans('立即登录') }}</p>

                    <span class="text-sm font-medium text-gray-300 tracking-wider">
                        ,{{ $trans('精彩直播不容错过') }}！</span>
                </div>
                <div>
                    <img
                        src="@img/close-bold.png"
                        class="w-6 h-6 absolute right-5 bottom-3"
                        @click.stop="Loginclose"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { toRefs, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
    props: {
        isShow: Boolean,
    },
    setup() {
        const router = useRouter();
        const state = reactive({
            curIsShow: true,
            showLogin: false,
        });
        const token = localStorage.getItem('token');
        if ((token && token === 'ef79a4a9cd0b4c3bb102c8f76282b38b') || !token) {
            state.showLogin = true;
        }
        const Loginclose = () => {
            state.curIsShow = false;
        };
        const toLogin = () => {
            router.push('/login/login');
        };
        return {
            ...toRefs(state),
            Loginclose,
            toLogin,
        };
    },
};
</script>
