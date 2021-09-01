<template>
    <div>
        <section>
            <p class="text-gray-400 ml-4">{{ $trans('请选择下面的爱好') }}</p>
            <ul class="flex flex-wrap">
                <li
                    v-for="(item, index) in items"
                    v-show="item.flag"
                    :key="index"
                    class="bg-gray-100 pl-2 pr-2 pt-1 pb-1 rounded-md text-center ml-3 mt-2"
                    :class="{ active: item.flag }"
                    style="white-space: nowrap"
                    @click="changeIndex(index)"
                >
                    {{ item.interestName }}
                </li>
            </ul>
        </section>
        <section class="mt-2">
            <ul class="flex flex-wrap ml-2">
                <li
                    v-for="(item, index) in items"
                    :key="index"
                    class="bg-gray-100 ml-4 mt-3 pl-2 pr-2 pt-1 pb-1 rounded-md text-center"
                    :class="{ active: item.flag }"
                    @click="changeIndex(index)"
                >
                    {{ item.interestName }}
                </li>
            </ul>
        </section>
        <section class="mt-10">
            <Button :disabled="submitDisabled" :title="$trans('保存')" @click="back()"></Button>
        </section>
    </div>
</template>

<script>
import Button from '@components/common/CommonButton.vue';
import { getUserInfo, setMineEditInterest, setMineEditInterestList } from '@api';
import { useStore } from 'vuex';
import { trans } from '@i18n';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { reactive, toRefs, onMounted } from 'vue';

export default {
    components: {
        Button,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        store.dispatch('base/changeNavBarTitile', trans('爱好'));
        store.dispatch('base/showNavBarBg');
        const state = reactive({
            currentIndex: 0,
            count: 0,
            message: [], //点击后展示的数据
            items: [], //爱好的列表
            arr: [], //上传的值
            ids: [], //上传的id
            submitDisabled: false,
        });
        const getMineEditInterestList = async () => {
            const res = await setMineEditInterestList(); // 调用接口获取爱好数组
            // debugger;
            // 对爱好数组进行处理，将选中过的标签flag设为true
            const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo'));
            if (privateUserInfo.interest) {
                state.message = privateUserInfo.interest.split(',');
                // debugger;
                res.interests.map(items => {
                    state.message.map(item => {
                        if (item.indexOf(items.interestName) !== -1) {
                            items.flag = true;
                        }
                    });
                });
            }
            state.items = res.interests; //赋值给items数组
        };
        const changeIndex = async i => {
            // 判断是否超出5个
            if (
                state.message.length < 5 &&
                (state.items[i].flag === false || state.items[i].flag === undefined)
            ) {
                state.items[i].flag = !state.items[i].flag;
                state.message.push(state.items[i].interestName);
                // return;
            } else if (state.items[i].flag === true) {
                state.items[i].flag = !state.items[i].flag;
                state.message.map((it, index) => {
                    console.log(it);
                    //  debugger
                    if (it.indexOf(state.items[i].interestName) !== -1) {
                        state.message.splice(index, 1);
                    }
                });
            } else {
                return Toast(trans('选择已超限'));
            }
        };
        const back = async () => {
            state.submitDisabled = true;
            Toast.loading({
                forbidClick: true,
                message: trans('保存中') + `...`,
            });
            await changeHobby();
            Toast.success({
                duration: 500,
                forbidClick: true,
                message: trans('保存成功'),
            });
            state.submitDisabled = false;
            router.go(-1);
        };
        const changeHobby = async () => {
            const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo'));
            state.items.map(item => {
                if (item.flag === true) {
                    //    取选中的标签   放arr和ids里
                    state.arr.push(item.interestName);
                    state.ids.push(item.interestId);
                }
            });
            const lists = state.arr.join(',');
            const idss = state.ids.join(','); // 拼接
            // console.log(lists);
            privateUserInfo.interest = lists; // 赋值
            await setMineEditInterest(lists, idss); // 上传
            await getUserInfo();
        };

        onMounted(async () => {
            await getMineEditInterestList();
        });
        return {
            ...toRefs(state),
            back,
            changeHobby,
            changeIndex,
            // getMineEditInterestList,
        };
    },
    // data() {
    //     return {
    //         currentIndex: 0,
    //         count: 0,
    //         message: [], //点击后展示的数据
    //         items: [], //爱好的列表
    //         arr: [], //上传的值
    //         ids: [], //上传的id
    //         submitDisabled: false,
    //     };
    // },
    // methods: {
    // ...mapActions('base', ['changeNavBarTitile', 'showNavBarBg']),
    // async back() {
    //     console.log('click');
    //     this.submitDisabled = true;
    //     Toast.loading({
    //         forbidClick: true,
    //         message: trans('保存中') + `...`,
    //     });
    //     await this.changeHobby();
    //     Toast.success({
    //         duration: 500,
    //         forbidClick: true,
    //         message: trans('保存成功'),
    //     });
    //     this.submitDisabled = false;
    //     this.$router.go(-1);
    // },
    // async changeHobby() {
    //     const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo'));
    //     // const arr = [];
    //     this.items.map(item => {
    //         if (item.flag == true) {
    //             //    取选中的标签   放arr和ids里
    //             this.arr.push(item.interestName);
    //             this.ids.push(item.interestId);
    //         }
    //     });
    //     const lists = this.arr.join(',');
    //     const idss = this.ids.join(','); // 拼接
    //     // console.log(lists);
    //     privateUserInfo.interest = lists; // 赋值
    //     const res = await setMineEditInterest(lists, idss); // 上传
    //     // localStorage.setItem('privateUserInfo', JSON.stringify(privateUserInfo)); // 写入缓存
    //     await getUserInfo();
    //     // console.log(privateUserInfo);
    //     // debugger;
    // },
    // async getMineEditInterestList() {
    //     // debugger;
    //     const res = await setMineEditInterestList(); // 调用接口获取爱好数组
    //     // debugger;
    //     // 对爱好数组进行处理，将选中过的标签flag设为true
    //     const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo'));
    //     if (privateUserInfo.interest) {
    //         this.message = privateUserInfo.interest.split(',');
    //         // debugger;
    //         res.interests.map((items, indexs) => {
    //             this.message.map((item, index) => {
    //                 if (item.indexOf(items.interestName) != -1) {
    //                     items.flag = true;
    //                 }
    //             });
    //         });
    //     }
    //     this.items = res.interests; //赋值给items数组
    // },
    // changeIndex(i) {
    //     // 判断是否超出5个
    //     if (this.message.length < 5 && (this.items[i].flag == false || this.items[i].flag == undefined)) {
    //         this.items[i].flag = !this.items[i].flag;
    //         this.message.push(this.items[i].interestName);
    //         // return;
    //     } else if (this.items[i].flag == true) {
    //         this.items[i].flag = !this.items[i].flag;
    //         this.message.map((it, index) => {
    //             console.log(it);
    //             //  debugger
    //             if (it.indexOf(this.items[i].interestName) != -1) {
    //                 this.message.splice(index, 1);
    //             }
    //         });
    //     } else {
    //         return Toast(trans('选择已超限'));
    //     }
    //     // console.log(this.message);
    //     // console.log(a);
    //     // debugger;
    // },
    // },
    // created() {
    //     this.changeNavBarTitile(this.$trans('爱好'));
    //     this.getMineEditInterestList();
    //     this.showNavBarBg();
    // },
    // mounted() {
    //     this.getMineEditInterestList();
    // },
};
</script>

<style>
.active {
    background-color: #8b5cff;
    color: white;
}
</style>