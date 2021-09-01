<!-- 
爱好，职业页面
-->
<template>
    <div>
        <MineEditHobby v-if="hobbyType === 'hobby'" />
        <MineEditWork v-else-if="workType === 'work'" />
    </div>
</template>

<script>
import MineEditHobby from '@components/mine/MineEditHobby.vue';
import MineEditWork from '@components/mine/MineEditWork.vue';

export default {
    components: {
        MineEditHobby,
        MineEditWork,
    },
    created() {
        this.hobbyType = this.$route.params.type;
        this.workType = this.$route.params.type;
    },
};
</script>

