<template>
    <div class="">
        <h3 class="text-center font-semibold text-xl">{{ $trans('选择一种您最熟悉的语言') }}</h3>
        <div class="flex flex-wrap  w-80 mx-auto justify-around mt-10">
            <button
                v-for="(item, i) in list"
                :key="i"
                class="border  rounded-lg py-3 w-36 mt-6"
                :class="{active:index==i}"
                @click="changeIndex(i)"
            >
                {{ item }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            index:1,
            list: ['English', '简体中文', 'English', '简体中文'],
        };
    },
    methods: {
        ...mapActions('base', ['changeNavBarTitile', 'showNavBar', 'showNavBarBg']),
        changeIndex(i){
            // debugger
            this.index = i ; 
        }
        },
    created() {
        this.showNavBar();
        this.showNavBarBg();
    },
};
</script>

<style>
.active{
   background-color:rgb(147, 197, 253); 
   color: white;
}
</style>