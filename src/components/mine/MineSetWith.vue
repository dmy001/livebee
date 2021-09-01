<template>
    <div style="background-color: #f9f9f9; height: calc(100vh - 104px)">
        <div>
            <div class="w-full h-72 pt-10">
                <section class="bg-white rounded-3xl black m-auto" style="height: 104px; width: 104px">
                    <div class="black m-auto" style="height: 104px; width: 104px">
                        <img src="@img/HiLive.png" />
                    </div>
                </section>
                <div class="justify-center h-6 mt-5 flex">
                    <p class="text-base" style="color: #333333">LiveBee</p>
                    <span class="ml-3 text-base" style="color: #333333"> V{{ appVersion }}</span>
                </div>
            </div>
        </div>
        <section class="h-28 w-full bg-white">
            <div
                class="w-full h-14 flex justify-between items-center bg-white active:bg-gray-300"
                @click="JumPagreement"
            >
                <p class="ml-3 text-base" style="color: #333333">《{{ $trans('用户使用协议') }}》</p>
                <img src="@img/mine/mine/mineArr@2x.png" class="w-8 h-8" />
            </div>
            <div class="w-11/12 h-0.5 m-auto" style="background-color: #f9f9f9"></div>
            <div
                class="w-full h-14 flex justify-between items-center bg-white active:bg-gray-300"
                @click="JumPolicy"
            >
                <p class="ml-3 text-base" style="color: #333333">《{{ $trans('隐私政策') }}》</p>
                <img src="@img/mine/mine/mineArr@2x.png" class="w-8 h-8" />
            </div>
        </section>
    </div>
</template>
<script>
import { useStore } from 'vuex';
import { getParameter } from '@native';
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { trans } from '@i18n';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        const { locale } = useI18n({ useScope: 'global' });
        store.dispatch('base/changeNavBarTitile', trans('关于LiveBee'));
        store.dispatch('base/showNavBar');
        store.dispatch('base/showNavBarBg');
        const state = reactive({
            appVersion: '',
        });
        const JumPagreement = () => {
            const link =
                locale.value === 'zh-cn'
                    ? 'https://s.gagahi.com/h5/hiLive/hiLiveUserAgreement-zh_CN.html'
                    : 'https://s.gagahi.com/h5/hiLive/hiLiveUserAgreement-en.html';
            store.dispatch('externalLinks/changeExternalLinks', `${link}?t=${new Date().getTime()}`);
            store.dispatch('externalLinks/changeExternalLinksTitle', trans('用户使用协议'));
            router.push('/externalLinks');
        };
        const JumPolicy = () => {
            const link =
                locale.value === 'zh-cn'
                    ? 'https://s.gagahi.com/h5/hiLive/hiLivePrivacyPolicyZh.html'
                    : 'https://s.gagahi.com/h5/hiLive/hiLivePrivacyPolicyEn.html';
            store.dispatch('externalLinks/changeExternalLinks', `${link}?t=${new Date().getTime()}`);
            store.dispatch('externalLinks/changeExternalLinksTitle', trans('隐私政策'));
            router.push('/externalLinks');
        };
        onMounted(async () => {
            state.appVersion = await getParameter('appVersion');
        });
        return {
            ...toRefs(state),
            JumPagreement,
            JumPolicy,
        };
    },
});
</script>

