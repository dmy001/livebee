<template>
    <div>
        <section>
            <van-cell is-link class="w-full" @click="showPopup">
                {{ $trans('年龄') }}
                <input ref="ageInput" v-model="age" disabled="true" type="text" class="bg-white text-black" />
            </van-cell>
            <p class="w-screen flex items-center justify-between pr-5">
                <span class="ml-4">{{ $trans('公开我的年龄') }}</span>
                <span class="mt-1">
                    <van-switch
                        v-model="checked"
                        size="24px"
                        active-color="#8B5CFF"
                        inactive-color="#dcdee0"
                    />
                </span>
            </p>

            <van-popup v-model:show="popshow" position="bottom" :style="{ height: '35%' }">
                <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :title="$trans('选择出生年月日')"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :formatter="formatter"
                    @confirm="onConfirm"
                    @cancel="onCancel"
                />
            </van-popup>
        </section>
        <section class="mt-2 ml-11 mr-11 flex justify-center items-center">
            <Button :title="$trans('保存')" @click="back()"></Button>
        </section>
    </div>
</template>

<script>
// import { Switch } from "vant";
import { reactive, ref, toRefs, onBeforeMount } from 'vue';
import Button from '../../components/common/CommonButton.vue';
import { useRouter } from 'vue-router';
import { getAgeByBirthday } from '@utils';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { trans } from '@i18n';
import { getUserInfo, setMineEditAge } from '@api';

export default {
    components: {
        // Switch,
        Button,
    },

    setup() {
        const store = useStore();
        store.dispatch('base/changeNavBarTitile', trans('年龄'));
        const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo')); //获取缓存的所有值
        const state = reactive({
            age: '',
            // date: "",
            // show: false,
            currentDate: '',
            checked: privateUserInfo.isOpenAge,
        });
        // const ageInput = ref(null);
        // const checked = ref(true);
        const router = useRouter();
        const popshow = ref(false);
        const onConfirm = value => {
            //点击弹出年龄选择器进行选择，点击确定后关闭
            // state.show = false;
            state.age = getAgeByBirthday(value);
            state.currentDate = value;
            popshow.value = false;
        };
        const formatter = (type, val) => {
            if (type === 'year') {
                return val + '年';
            }
            if (type === 'month') {
                return val + '月';
            }
            if (type === 'day') {
                return val + '日';
            }
            return val;
        };
        const onCancel = () => {
            //点击年龄选择器取消，关闭选择器
            popshow.value = false;
        };
        const currentDate = ref(new Date(2000, 0, 1)); //设置默认时间段
        const showPopup = () => {
            //点击弹出年龄选择器
            popshow.value = true;
        };
        // debugger;
        const changeAge = async () => {
            const { checked } = state;
            // new Date().getDate
            //时间格式改成0000-00-00
            console.log(privateUserInfo.birthday);
            console.log(state.currentDate);

            if (state.currentDate === '') {
                // debugger;
                const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo'));
                const currentDate = privateUserInfo.birthday;
                Toast.loading({
                    forbidClick: true,
                    message: trans('保存中') + `...`,
                });
                await setMineEditAge(currentDate, Number(checked)); //上传
                Toast.success({
                    duration: 500,
                    forbidClick: true,
                    message: trans('保存成功'),
                });
                await getUserInfo();
            } else {
                // debugger;
                const input = `${state.currentDate.getFullYear()}-0${
                    state.currentDate.getMonth() + 1
                }-${state.currentDate.getDate()}`;
                // debugger;
                Toast.loading({
                    forbidClick: true,
                    message: trans('保存中') + `...`,
                });
                await setMineEditAge(input, Number(checked)); //上传
                Toast.success({
                    duration: 500,
                    forbidClick: true,
                    message: trans('保存成功'),
                });
                // const a = Number(checked);
                // console.log(a);
                await getUserInfo();

                // const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo'));
                // privateUserInfo.birthday = input;
                // privateUserInfo.isOpenAge = checked;
                // localStorage.setItem('privateUserInfo', JSON.stringify(privateUserInfo));
                // debugger;
            }
        };
        const back = async () => {
            // debugger;
            await changeAge();
            router.go(-1);
        };
        // onMounted(() => {
        //     ageInput.value.focus();
        // });
        onBeforeMount(() => {
            const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo'));
            // const { currentDate } = state;
            // const input = `${currentDate.getFullYear()}-0${
            //     currentDate.getMonth() + 1
            // }-${currentDate.getDate()}`;
            // input = privateUserInfo.birthday;
            state.age = getAgeByBirthday(privateUserInfo.birthday);
            // state.currentDate = value;
        });
        return {
            ...toRefs(state),
            // ageInput,
            formatter,
            back,
            // changeAge,
            onConfirm,
            onCancel,
            minDate: new Date(1900, 0, 1),
            maxDate: new Date(2003, 11, 31),
            currentDate,
            showPopup,
            popshow,
        };
    },
};
</script>

