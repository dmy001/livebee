<template>
    <div>
        <section>
            <button
                v-if="job.name"
                class="bg-gray-100 pl-2 pr-2 pt-1 pb-1 rounded-md text-center active ml-3"
            >
                {{ job.name }}
            </button>
            <p v-if="!job.name">{{ $trans('请选择下面的职业') }}</p>
        </section>

        <section class="mt-2">
            <ul class="flex flex-wrap ml-2">
                <li
                    v-for="(item, index) in items"
                    :key="index"
                    class="bg-gray-100 ml-4 mt-3 pl-2 pr-2 pt-1 pb-1 rounded-md text-center"
                    :class="{ active: currentIndex == index }"
                    @click="handleIndex(index)"
                >
                    {{ item.name }}
                </li>
            </ul>
        </section>
        <section class="mt-10">
            <Button :title="$trans('保存')" @click="back()"></Button>
        </section>
    </div>
</template>

<script>
import Button from '@components/common/CommonButton.vue';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { trans } from '@i18n';
import { getUserInfo, setMineEditJob, setMineEditWorkList } from '@api';
import { useRouter } from 'vue-router';
import { reactive, toRefs, onMounted } from 'vue';

export default {
    components: {
        Button,
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        store.dispatch('base/changeNavBarTitile', trans('职业'));
        store.dispatch('base/showNavBarBg');
        const state = reactive({
            currentIndex: -1,
            job: {
                name: '',
                id: 0,
            },
            items: [],
        });
        const handleJob = async () => {
            Toast.loading({
                forbidClick: true,
                message: trans('保存中') + `...`,
            });
            await setMineEditJob(state.job.name, state.job.id); //上传
            Toast.success({
                duration: 500,
                forbidClick: true,
                message: trans('保存成功'),
            });
            await getUserInfo();
        };
        const back = async () => {
            await handleJob();
            router.go(-1);
        };
        const handleIndex = async i => {
            state.currentIndex = i;
            state.job.name = state.items[i].name;
        };
        const getMineEditWorkList = async () => {
            const res = await setMineEditWorkList(); //获取职业列表
            state.items = res.jobs; //职业列表赋值给items
        };
        const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo')); //获取缓存
        if (privateUserInfo.job) {
            state.job.name = privateUserInfo.job;
        }
        onMounted(async () => {
            await getMineEditWorkList();
        });
        return {
            ...toRefs(state),
            back,
            handleIndex,
            getMineEditWorkList,
        };
    },
    // data() {
    //     return {
    //         currentIndex: -1,
    //         job: {
    //             name: '',
    //             id: 0,
    //         },
    //         items: [],
    //     };
    // },
    // methods: {
    // ...mapActions('base', ['changeNavBarTitile', 'showNavBarBg']),

    // async back() {
    //     await this.handleJob();

    //     this.$router.go(-1);
    // },
    // async handleJob() {
    //     Toast.loading({
    //         forbidClick: true,
    //         message: trans('保存中') + `...`,
    //     });
    //     const res = await setMineEditJob(this.job.name, this.job.id); //上传
    //     Toast.success({
    //         duration: 500,
    //         forbidClick: true,
    //         message: trans('保存成功'),
    //     });
    //     const a = await getUserInfo();
    //     // debugger;
    //     // const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo')); //获取缓存
    //     // privateUserInfo.job = this.job.name; //赋值职业给缓存
    //     // localStorage.setItem('privateUserInfo', JSON.stringify(privateUserInfo)); //更新缓存
    //     // console.log(privateUserInfo);
    // },
    // async handleIndex(i) {
    //     this.currentIndex = i;
    //     this.job.name = this.items[i].name;
    // },
    // async getMineEditWorkList() {
    //     const res = await setMineEditWorkList(); //获取职业列表
    //     this.items = res.jobs; //职业列表赋值给items
    // },
    // },
    // async created() {
    //     this.changeNavBarTitile(this.$trans('职业'));
    //     this.getMineEditWorkList();
    //     this.showNavBarBg();
    //     const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo')); //获取缓存
    //     if (privateUserInfo.job) {
    //         this.job.name = privateUserInfo.job;
    //     }
    // },
    // mounted() {
    //     this.getMineEditWorkList();
    // },
};
</script>

<style>
.active {
    background-color: #8b5cff;
    color: white;
}
</style>