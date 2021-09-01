<template>
    <div class="container">
        <p class="text-gray-600 ml-5 text-xs">{{ $trans('请选择投诉该账号的原因') }}:</p>
        <div class="text-gray-800 text-base">
            <van-radio-group v-model="checked">
                <div
                    v-for="(item, index) in list"
                    :key="index"
                    class="flex justify-between ml-4 mt-5 pb-6 border-b border-gray-100"
                    :class="{ 'border-none': list.length - 1 === index }"
                    @click="checked = index"
                >
                    <span>{{ item.title }}</span>
                    <van-radio class="mr-3" :name="index"></van-radio>
                </div>
            </van-radio-group>
        </div>
        <div class="h-40 bg-indigo-50 pt-16">
            <CommonButton :title="$trans('提交')" @click="submit" />
            <p class="text-base text-blue-900 text-center mt-2" @click="show = true">
                {{ $trans('举报须知') }}
            </p>
        </div>
        <van-dialog
            v-model:show="show"
            width="82%"
            :show-confirm-button="false"
            :close-on-click-overlay="true"
            class="pl-8 pt-6 pr-8 pb-6"
        >
            <p class="text-2xl font-medium text-blue-500 text-center">{{ $trans('举报须知') }}</p>
            <div class="border-t border-gray-100 mt-4 pt-2">
                <p class="leading-loose">
                    {{ $trans('你应保证你的投诉行为基于善意，举报内容真实，并代表你本人真实意思。') }}
                </p>
                <p class="text-gray-700 leading-relaxed">
                    {{
                        $trans(
                            'LiveBee收到举报消息后，会尽快按照相关法律法规及平台规定进行判断和处理。LiveBee作为服务平台，会采取合理的措施保护你的个人信息；除法律法规规定的情形外，未经用户许可LiveBee不会向第三方公开、透露你的个人信息。'
                        )
                    }}
                </p>
            </div>
        </van-dialog>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import CommonButton from '@components/common/CommonButton.vue';
import { Toast } from 'vant';
import { trans } from '@i18n';
import { reactive, toRefs } from '@vue/reactivity';
import { useRouter } from 'vue-router';
export default {
    components: {
        CommonButton,
    },
    setup() {
        const store = useStore();
        const router=useRouter();
        store.dispatch('base/changeNavBarTitile', trans('举报'));
        store.dispatch('base/showNavBar');
        store.dispatch('base/showNavBarBg');
        const state = reactive({
            list: [
                { title: trans('垃圾广告') },
                { title: trans('淫秽色情') },
                { title: trans('虚假中奖') },
                { title: trans('敏感信息') },
                { title: trans('人身攻击') },
                { title: trans('骚扰他人') },
                { title: trans('骗子') },
                { title: trans('广告') },
                { title: trans('色情低俗') },
                { title: trans('违法') },
                { title: trans('政治敏感') },
                { title: trans('谣言') },
                { title: trans('骚扰信息') },
            ],
            checked: 0,
            show: false,
        });
        const submit = () => {
            Toast(trans('提交成功'));
            setTimeout(() => {
                router.go(-1);
            }, 2000);
        };
        return {
            ...toRefs(state),
            submit,
        };
    },
};
</script>