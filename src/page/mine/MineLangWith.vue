<!-- 
语言，关于HiLive页面
-->
<template>
    <div>
        <MineEditLang v-if="langType === 'lang'"></MineEditLang>
        <MineSetWith v-else-if="withType === 'with'"></MineSetWith>
    </div>
</template>

<script>
import MineEditLang from '@components/mine/MineEditLang.vue';
import MineSetWith from '@components/mine/MineSetWith.vue';
export default {
    components: {
        MineEditLang,
        MineSetWith,
    },
    created() {
        this.langType = this.$route.params.type;
        this.withType = this.$route.params.type;
    },
    methods: {},
};
</script>

