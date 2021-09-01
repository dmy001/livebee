<!-- 
昵称，体重，身高页面
-->

<template>
    <div>
        <MineEditName v-if="nameType === 'name'" />
        <MineEditWeight v-else-if="WeightType === 'weight'" />
        <MineEditHeight v-else-if="HeightType === 'height'" />
        <MineEditSignature v-else-if="SignatureType === 'signature'" />
    </div>
</template>

<script>
import MineEditName from '@components/mine/MineEditName.vue';
import MineEditWeight from '@components/mine/MineEditWeight.vue';
import MineEditHeight from '@components/mine/MineEditHeight.vue';
import MineEditSignature from '@components/mine/MineEditSignature.vue';
export default {
    components: {
        MineEditName,
        MineEditWeight,
        MineEditHeight,
        MineEditSignature,
    },
    created() {
        this.nameType = this.$route.params.type;
        this.WeightType = this.$route.params.type;
        this.HeightType = this.$route.params.type;
        this.SignatureType = this.$route.params.type;
    },
    methods: {},
};
</script>
