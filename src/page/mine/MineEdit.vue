<template>
    <div>
        <section class="relative">
            <ul class="mx-3">
                <li class="pt-6 pb-10" @click="handleImage($event)">
                    <input
                        ref="imgInput"
                        type="file"
                        class="no-underline hidden"
                        @change="selectedImg($event)"
                    />
                    <span class="absolute text-xs text-black">{{ $trans('头像') }}</span>
                    <span class="absolute right-9">
                        <img class="relative w-14 h-14 bottom-5 rounded-full" :src="avatarUrl" alt="" />
                    </span>
                    <p class="absolute right-3 w-5 h-5 -mt-1 bg-mineRight-right" />
                </li>
                <hr style="border: 0.03rem solid; color: #edf0f1" />
                <!-- <li class="flex justify-between items-center pt-6 pb-6" @click="jumpSignature()">
                    <span class="text-xs w-16">{{ $trans('个性签名') }}</span>
                    <span
                        class="ml-auto text-xs text-jinbi-666666"
                        style="
                            max-width: 230px;
                            display: -webkit-box;
                            word-break: break-all;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                        "
                        >{{ signature }}</span
                    >
                    <p class="w-5 h-5 -mt-1 bg-mineRight-right" />
                </li>
                <hr style="border: 0.03rem solid; color: #edf0f1" />
                <li class="flex justify-between items-center pt-6 pb-6" v-on:click="jumpNickName()">
                    <span class="text-xs">{{ $trans('昵称') }}</span>
                    <span class="ml-auto text-xs text-jinbi-666666"> {{ nickName }}</span>
                    <p class="w-5 h-5 -mt-1 bg-mineRight-right" />
                </li>
                <hr style="border: 0.03rem solid; color: #edf0f1" />
                <li class="flex justify-between items-center pt-6 pb-6">
                    <span class="text-xs">{{ $trans('性别') }}</span>
                    <span class="ml-auto text-jinbi-666666 text-xs">{{ gender }}</span>
                    <p class="w-5 h-5 -mt-1 bg-mineRight-right" />
                </li>
                <hr style="border: 0.03rem solid; color: #edf0f1" />
                <li class="flex justify-between items-center pt-6 pb-6" v-on:click="jumpCity()">
                    <span class="text-xs">{{ $trans('国籍') }}</span>
                    <span class="ml-auto text-jinbi-666666 text-xs">{{ country }}</span>
                    <p class="w-5 h-5 -mt-1 bg-mineRight-right" />
                </li>
                <hr style="border: 0.03rem solid; color: #edf0f1" />
                <li class="flex justify-between items-center pt-6 pb-6" @click="changeJob()">
                    <span class="text-xs">{{ $trans('职业') }}</span>
                    <span class="ml-auto text-jinbi-666666 text-xs">{{ job }}</span>
                    <p class="w-5 h-5 -mt-1 bg-mineRight-right" />
                </li>
                <hr style="border: 0.03rem solid; color: #edf0f1" />
                <li class="flex justify-between items-center pt-6 pb-6" v-on:click="jumpAge()">
                    <span class="text-xs">{{ $trans('年龄') }}</span>
                    <span class="ml-auto text-jinbi-666666 text-xs"> {{ birthday }}</span>
                    <p class="w-5 h-5 -mt-1 bg-mineRight-right" />
                </li>
                <hr style="border: 0.03rem solid; color: #edf0f1" /> -->
                <li
                    v-for="(item, index) in list"
                    :key="index"
                    class="flex flex-wrap justify-between items-center pt-6"
                    @click="getfunc(index, item.com)"
                >
                    <span class="text-xs">{{ $trans(item.name) }}</span>
                    <span
                        class="ml-auto text-jinbi-666666 text-xs"
                        style="
                            max-width: 200px;
                            display: -webkit-box;
                            word-break: break-all;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                        "
                    >
                        {{ item.value }}
                    </span>
                    <p class="w-5 h-5 -mt-1 bg-mineRight-right" />
                    <div class="w-full mt-6" style="border: 0.03rem solid; color: #edf0f1" />
                </li>
                <router-link to="/mine/MineNameWeightHeight/height">
                    <li class="flex justify-between items-center pt-6 pb-6">
                        <span class="text-xs">{{ $trans('身高') }}</span>
                        <span class="ml-auto text-jinbi-666666 text-xs">
                            {{ height }}
                            <span v-if="height">cm</span>
                        </span>
                        <p class="w-5 h-5 -mt-1 bg-mineRight-right" />
                    </li>
                </router-link>
                <hr style="border: 0.03rem solid; color: #edf0f1" />
                <router-link to="/mine/MineNameWeightHeight/weight">
                    <li class="flex justify-between items-center pt-6 pb-6">
                        <span class="text-xs">{{ $trans('体重') }}</span>
                        <span class="ml-auto text-jinbi-666666 text-xs">
                            {{ weight }}
                            <span v-if="weight">kg</span>
                        </span>
                        <p class="w-5 h-5 -mt-1 bg-mineRight-right" />
                    </li>
                </router-link>
                <hr style="border: 0.03rem solid; color: #edf0f1" />
                <router-link to="/mine/MineEditHobbyWork/hobby">
                    <li class="flex justify-between items-center pt-5 pb-6">
                        <span class="text-xs whitespace-nowrap">{{ $trans('爱好') }}</span>
                        <div class="ml-auto flex justify-end flex-wrap" style="">
                            <span
                                v-for="(item, index) in interest"
                                v-show="item"
                                :key="index"
                                class="px-1.5 text-xs ml-1 rounded mt-1"
                                style="
                                    border: 0.06rem solid #8b5cff;
                                    padding-top: 0.38rem;
                                    padding-bottom: 0.31rem;
                                "
                            >
                                {{ item }}
                            </span>
                        </div>
                        <p class="w-5 h-5 -mt-0.5 bg-mineRight-right" />
                    </li>
                </router-link>
                <hr style="border: 0.03rem solid; color: #edf0f1" />
            </ul>
        </section>
        <!-- 保存按钮 -->
        <!-- <section class="mt-28 ml-11 mr-11 flex justify-center items-center">
      <button
        class="
          bg-gradient-to-r
          from-btnBegin1
          to-btnEnd1
          focus:outline-none
          rounded-1.25
          w-72
          h-10
          text-white text-base
          font-semibold
          tracking-widest
        "
        @click="setInfo()"
      >
        保存
      </button>
    </section> -->
    </div>
</template>
<script>
import { useStore } from 'vuex';
import { getAgeByBirthday } from '@utils';
import { getUserInfo } from '@api/login/login.js';
import { upLoadToQiniu } from '@api';
import { getfileUpload, dictCountryList } from '../../api/mine/mineedit';
import { trans } from '@i18n';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { reactive, ref, onMounted, toRefs } from 'vue';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        store.dispatch('base/changeNavBarTitile', trans('编辑个人信息'));
        store.dispatch('base/showNavBarBg');
        store.dispatch('base/showNavBar');
        const state = reactive({
            nickName: '',
            // name: ["音乐", "运动", "电影"],
            interest: [],
            signature: '',
            weight: '',
            height: '',
            birthday: '',
            job: '',
            avatarUrl: '',
            country: '',
            countryId: '',
            gender: '',

            list: [
                {
                    name: '个性签名',
                    value: '',
                    com: 'MineNameWeightHeight/signature',
                },
                {
                    name: '昵称',
                    value: '',
                    com: 'MineNameWeightHeight/name',
                },
                {
                    name: '性别',
                    value: '',
                    com: 'mineEdit',
                },
                {
                    name: '国籍',
                    value: '',
                    com: 'MineEditCity',
                },
                {
                    name: '职业',
                    value: '',
                    com: 'MineEditHobbyWork/work',
                },
                {
                    name: '年龄',
                    value: '',
                    com: 'MineEditAge',
                },
            ],
        });
        const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo'));
        const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo'));
        state.avatarUrl =
            baseUserInfo.avatarUrl ||
            'https://img1.baidu.com/it/u=2996250653,3603163890&fm=26&fmt=auto&gp=0.jpg';
        state.countryId = privateUserInfo.countryId;
        state.list[0].value = privateUserInfo.signature;
        state.list[1].value = baseUserInfo.nickName;
        if (baseUserInfo.genderId === 'M') {
            state.list[2].value = trans('男');
        } else if (baseUserInfo.genderId === 'F') {
            state.list[2].value = trans('女');
        } else {
            state.list[2].value = '';
        }
        state.list[4].value = privateUserInfo.job;
        state.list[5].value = getAgeByBirthday(privateUserInfo.birthday);
        state.height = baseUserInfo.height;
        state.weight = baseUserInfo.weight;
        const hobby = privateUserInfo.interest;
        state.interest = (hobby || '').split(',');

        const getfunc = (index, com) => {
            router.push(com); //跳转
        };

        const selectedImg = async e => {
            const file = e.target.files[0];
            if (!file) return;
            Toast.loading({
                forbidClick: true,
                message: trans('上传中') + `...`,
            });
            const data = await getfileUpload(1, 'AV', 'group', 1); //上传
            // debugger;
            await upLoadToQiniu(data.tokens[0].token, data.tokens[0].key, file); //上传头像到七牛
            state.avatarUrl = `https://sources.gagahi.com/${data.name}`; //地址拼接
            Toast.success({
                duration: 1000,
                forbidClick: true,
                message: trans('上传成功'),
            });
            await getUserInfo();
        };
        const getCountry = async () => {
            const { countrys } = await dictCountryList(); //获取城市列表
            const curCity = countrys.find(it => it.countryId === state.countryId);
            // debugger;
            if (curCity) {
                // this.country = curCity.countryName;
                state.list[3].value = curCity.countryName;
            }
        };

        const imgInput = ref();
        const handleImage = () => {
            // console.log(imgInput.value);
            // debugger;
            imgInput.value.click(); //点击更换头像
        };

        onMounted(async () => {
            // imgInput;
            getCountry();
            // this.getMineGender();
            await getUserInfo();
        });
        return {
            ...toRefs(state),
            getfunc,
            selectedImg,
            getCountry,
            handleImage,
            imgInput,
        };
    },
    // data() {
    //     return {
    //         nickName: '',
    //         // name: ["音乐", "运动", "电影"],
    //         interest: [],
    //         signature: '',
    //         weight: '',
    //         height: '',
    //         birthday: '',
    //         job: '',
    //         avatarUrl: '',
    //         country: '',
    //         countryId: '',
    //         gender: '',

    //         list: [
    //             {
    //                 name: '个性签名',
    //                 value: '',
    //                 com: 'MineNameWeightHeight/signature',
    //             },
    //             {
    //                 name: '昵称',
    //                 value: '',
    //                 com: 'MineNameWeightHeight/name',
    //             },
    //             {
    //                 name: '性别',
    //                 value: '',
    //             },
    //             {
    //                 name: '国籍',
    //                 value: '',
    //                 com: 'MineEditCity',
    //             },
    //             {
    //                 name: '职业',
    //                 value: '',
    //                 com: 'MineEditHobbyWork/work',
    //             },
    //             {
    //                 name: '年龄',
    //                 value: '',
    //                 com: 'MineEditAge',
    //             },
    //         ],
    //     };
    // },

    // async created() {
    //     // this.showNavBar();
    //     // this.showNavBarBg();
    //     // this.changeNavBarTitile(this.$trans('编辑个人信息'));
    //     const baseUserInfo = JSON.parse(localStorage.getItem('baseUserInfo'));
    //     const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo'));
    //     this.avatarUrl =
    //         baseUserInfo.avatarUrl ||
    //         'https://img1.baidu.com/it/u=2996250653,3603163890&fm=26&fmt=auto&gp=0.jpg';
    //     // this.signature = privateUserInfo.signature;
    //     // this.nickName = baseUserInfo.nickName;
    //     // if (baseUserInfo.genderId === 'M') {
    //     //     this.gender = '男';
    //     // } else if (baseUserInfo.genderId === 'F') {
    //     //     this.gender = '女';
    //     // } else {
    //     //     this.gender = '';
    //     // }
    //     this.countryId = privateUserInfo.countryId;

    //     // this.job = privateUserInfo.job;
    //     // this.birthday = getAgeByBirthday(privateUserInfo.birthday);
    //     // console.log(privateUserInfo);
    //     // console.log(baseUserInfo);

    //     this.list[0].value = privateUserInfo.signature;
    //     this.list[1].value = baseUserInfo.nickName;
    //     if (baseUserInfo.genderId === 'M') {
    //         this.list[2].value = trans('男');
    //     } else if (baseUserInfo.genderId === 'F') {
    //         this.list[2].value = trans('女');
    //     } else {
    //         this.list[2].value = '';
    //     }
    //     this.list[4].value = privateUserInfo.job;
    //     this.list[5].value = getAgeByBirthday(privateUserInfo.birthday);
    //     this.height = baseUserInfo.height;
    //     this.weight = baseUserInfo.weight;
    //     const hobby = privateUserInfo.interest;
    //     this.interest = (hobby || '').split(',');
    //     // debugger;
    // },
    // methods: {
    // ...mapActions('base', ['showNavBarBg', 'changeNavBarTitile', 'showNavBar']),

    // getfunc(index, com) {
    //     this.$router.push(com); //跳转
    //     // console.log(index);
    // },
    // handleImage(event) {
    //     // debugger;
    //     // event.currentarget.firstElementChild.click();
    //     this.$refs.imgInput.click(); //点击更换头像
    // },
    // handleImage(event) {
    //     this.$refs.imgInput.click(); //点击更换头像
    // },
    // async selectedImg(e) {
    //     const file = e.target.files[0];
    //     if (!file) return;
    //     Toast.loading({
    //         forbidClick: true,
    //         message: trans('上传中') + `...`,
    //     });
    //     const data = await getfileUpload(1, 'AV', 'group', 1); //上传
    //     // debugger;
    //     const res = await upLoadToQiniu(data.tokens[0].token, data.tokens[0].key, file); //上传头像到七牛
    //     this.avatarUrl = `https://sources.gagahi.com/${data.name}`; //地址拼接
    //     Toast.success({
    //         duration: 1000,
    //         forbidClick: true,
    //         message: trans('上传成功'),
    //     });
    //     await getUserInfo();
    // },
    // async getCountry() {
    //     // debugger;
    //     const { countrys } = await dictCountryList(); //获取城市列表
    //     const curCity = countrys.find(it => it.countryId === this.countryId);
    //     // debugger;
    //     if (curCity) {
    //         // this.country = curCity.countryName;
    //         this.list[3].value = curCity.countryName;
    //     }
    // },

    // async getMineGender() {
    //     const res = await setMineEditGender(this.gender);
    //     // debugger;
    //     console.log(res);
    //     debugger;
    // },
    // },

    // async mounted() {
    //     this.getCountry();
    //     // this.getMineGender();
    //     await getUserInfo();
    // },
};
</script>

<style>
/* .sp {
    background: #fff;
    border: 1px transparent solid;
    border-radius: 4px;
    position: relative;
}
.sp:after {
    content: '';
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    background: linear-gradient(135deg, #d988ff, #8b5cff);
    border-radius: 4px;
    z-index: -1;
} */
</style>