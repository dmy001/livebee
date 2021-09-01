<template>
    <div>
        <van-index-bar>
            <van-search
                v-model="value"
                :placeholder="$trans('请输入搜索关键词')"
                @update:model-value="onSearch"
            />
            <van-cell
                v-for="(item, i) in result"
                :key="i"
                :title="item.countryName"
                class="act"
                tabindex="1"
                :value="showLocalCode ? '+' + item.locationCode : ''"
                value-class="value-style"
                @click="setCity(item)"
            >
            </van-cell>
            <section v-show="!result.length">
                <van-cell
                    v-for="(item, i) in commoncountrys"
                    :key="i"
                    :title="item.countryName"
                    class="act"
                    tabindex="2"
                    value-class="value-style"
                    :value="showLocalCode ? item.locationCode : ''"
                    @click="setCity(item)"
                />
                <div v-for="(item, i) in countrys" :key="i">
                    <van-index-anchor sticky="false" :index="item.letter">{{ item.letter }}</van-index-anchor>
                    <van-cell
                        v-for="(it, j) in item.data"
                        :key="j"
                        class="act"
                        tabindex="3"
                        :title="it.countryName"
                        :value="showLocalCode ? it.locationCode : ''"
                        value-class="value-style"
                        @click="setCity(it)"
                    >
                    </van-cell>
                </div>
            </section>
        </van-index-bar>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';

import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { trans } from '@i18n';
import { getUserInfo, dictCountryList, setMineEditCountry } from '@api';
import { Toast } from 'vant';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const query = route.query;
        store.dispatch('base/changeNavBarTitile', trans('选择国家或地区'));
        const state = reactive({
            str: '1',
            value: '',
            commoncountrys: [],
            countrys: [],
            searchCountry: [],
            result: [],
            showLocalCode: false,
            // active: false,
        });

        const setCity = async it => {
            if (query.showLocalCode) {
                store.dispatch('locationCode/changeLocationCode', it.locationCode); //  更改注册界面选择城市的后缀名
            } else {
                Toast.loading({
                    forbidClick: true,
                    message: trans('保存中') + `...`,
                });
                await setMineEditCountry(it.countryId);
                Toast.success({
                    duration: 500,
                    forbidClick: true,
                    message: trans('保存成功'),
                });
                await getUserInfo();

                // const privateUserInfo = JSON.parse(localStorage.getItem('privateUserInfo'));
                // privateUserInfo.countryId = it.countryId;
                // localStorage.setItem('privateUserInfo', JSON.stringify(privateUserInfo));
            }

            router.go(-1);
        };
        const pySegSort = arr => {
            if (!String.prototype.localeCompare) return null;
            let letters = '*ABCDEFGHJKLMNOPQRSTWXYZ'.split('');
            let zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('');
            let segs = [];
            let curr;
            letters.forEach(function (item, i) {
                curr = {
                    letter: item,
                    data: [],
                };
                arr.forEach(function (item2) {
                    if (
                        (!zh[i - 1] || zh[i - 1].localeCompare(item2.countryName) <= 0) &&
                        item2.countryName.localeCompare(zh[i]) === -1
                    ) {
                        curr.data.push(item2);
                    }
                });
                if (curr.data.length) {
                    segs.push(curr);
                    curr.data.sort(function (a, b) {
                        return a.countryName.localeCompare(b.countryName);
                    });
                }
            });

            console.log(segs);
            return segs;
        };
        const getdictCountryList = async () => {
            const { commoncountrys, countrys } = await dictCountryList();
            if (query.showLocalCode) {
                state.showLocalCode = true;
            }
            state.searchCountry = countrys;
            state.countrys = pySegSort(countrys);
            state.commoncountrys = commoncountrys;
        };
        const onSearch = val => {
            state.result = [];
            if (val === '') return;
            state.searchCountry.map(item => {
                if (item.countryName.indexOf(val) > -1) state.result.push(item);
            });
            if (state.result.length === 0) console.log('没找到');
        };
        onMounted(() => {
            getdictCountryList();
        });
        return {
            ...toRefs(state),
            onSearch,
            // getdictCountryList,
            // pySegSort,
            setCity,
        };
    },
};
</script>

<style>
.act:active {
    background-color: #ccc;
}
van-cell:focus {
    background-color: #ccc;
}
.value-style {
    margin-right: 25px;
}
</style>