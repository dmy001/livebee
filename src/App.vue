<template>
    <CommonNav class="font-common" />
    <router-view class="font-common"></router-view>
</template>

<script>
import CommonNav from '@components/common/CommonNav.vue';

export default {
    name: 'App',
    components: {
        CommonNav,
    },
};
</script>
