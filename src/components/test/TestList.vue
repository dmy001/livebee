<template>
    <div
        class="
            grid grid-cols-2
            gap-4
            w-11/12
            h-96
            p-3
            border-solid border border-gray-50
            -mt-24
            mx-auto
            rounded-2xl
            bg-white
        "
    >
        <!-- <div v-for="(item,index) in list" :key="index" v-on:click="chanceColor" class="bg-purple-500 rounded-2xl pt-4 pl-6">
                   <span class="ml-2 flex items-center text-2xl"><p>20</p>
                   <img class="w-4 h-4 ml-2" src="@img/mine/mineGold/gold.png" alt="" />
                   </span>
                   <p class="ml-2 mt-2 text-xl ">$20</p>
                </div> -->
        <div
            v-for="(item, index) in list"
            :key="index"
            v-on:click="chanceColor(index)"
            class="bg-gray-100 rounded-2xl pt-4 pl-6"
            :class="{ 'bg-purple-500': index === selectedIndex }"
        >
            <span
                class="ml-2 flex items-center text-2xl"
                :class="[index === selectedIndex ? 'text-white' : 'text-gray-700']"
                ><p>{{ item.glod }}</p>
                <img class="w-4 h-4 ml-2" src="@img/mine/mineGold/gold.png" alt="" />
            </span>
            <p class="ml-2 mt-2 text-xl" :class="[index === selectedIndex ? 'text-white' : 'text-gray-500']">
                {{ item.pay }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                { glod: '20', pay: '$20' },
                { glod: '50', pay: '$50' },
                { glod: '100', pay: '$100' },
                { glod: '200', pay: '$200' },
                { glod: '500', pay: '$500' },
                { glod: '1000', pay: '$1000' },
            ],
            selectedIndex: 0,
        };
    },
    methods: {
        chanceColor(index) {
            this.selectedIndex = index;
            this.$emit('transferList', this.list[this.selectedIndex].glod);
        },
    },
};
</script>
