<template>
    <div class="font-medium text-xl">
        <nav
            v-show="navBarShow"
            class="
                container
                z-50
                top-0
                left-0
                right-0
                mx-auto
                h-24
                pt-11
                pb-2
                flex
                justify-center
                items-center
                w-full
                max-w-screen-md
            "
            :class="[navBarBgShow ? 'bg-white fixed' : 'absolute']"
        >
            <!-- 左 -->
            <div v-show="showLeft" class="absolute left-0 w-2/6 h-10 flex items-center pl-6" @click="goBack">
                <div
                    name="leftNav"
                    class="w-2.5 h-2.5 border-t-2 border-r-2 border-black transform -rotate-135"
                    :class="[navBarBgShow ? 'border-black' : ' border-white']"
                ></div>
            </div>
            <!-- 中 -->
            <div name="centerNav" :class="[navBarBgShow ? ' text-common-grey5' : 'text-white']">
                {{ navBarTitle }}
            </div>
            <!-- 右 -->
            <div
                v-show="saveBtnShow"
                name="rightNav"
                class="text-right absolute right-0 text-purple-500 pl-5 pr-5"
                @click="saveBtn"
            >
                {{ $trans('保存') }}
            </div>
        </nav>
        <!-- 安全头域 -->
        <div v-show="navBarShow && navBarBgShow" class="w-full pb-2" style="padding-top: 96px"></div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { goBackNative } from '../../native/login';


import { getUserInfo } from '@api';

export default {
    name: '',
    computed: {
        ...mapState('saveLanguage', ['langId']),
        ...mapState('base', ['navBarShow', 'navBarBgShow', 'showLeft', 'navBarTitle', 'saveBtnShow']),
    },
    methods: {
        goBack() {
            if (this.$route.query.comeType && this.$route.query.comeType === 'native') {
                goBackNative();
            } else {
                this.$router.go(-1);
            }
        },
        ...mapActions('saveLanguage', ['saveLanguage']),
        async saveBtn() {
            await this.saveLanguage();
            await getUserInfo();
            this.$router.go(-1);
        },
    },
    
};
</script>

