<template>
    <div>
        <MineBindNum v-if="numType === 'number'"></MineBindNum>
        <MineBindEmail v-else-if="emailType === 'email'"></MineBindEmail>
    </div>
</template>

<script>
import MineBindNum from '@components/mine/MineBindNum.vue';
import MineBindEmail from '@components/mine/MineBindEmail.vue';
export default {
    components: {
        MineBindNum,
        MineBindEmail,
    },
    created() {
        this.numType = this.$route.params.type;
        this.emailType = this.$route.params.type;
    },
};
</script>

