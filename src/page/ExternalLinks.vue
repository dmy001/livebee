<template>
    <div>
        <iframe :src="link" class="iframe w-full"></iframe>
    </div>
</template>
<script>
import { useStore } from 'vuex';
import { defineComponent, computed } from 'vue';
export default defineComponent({
    setup() {
        const store = useStore();
        store.dispatch('base/changeNavBarTitile', store.state.externalLinks.title);
        store.dispatch('base/showNavBar');
        store.dispatch('base/showNavBarBg');
        return {
            // 在 computed 函数中访问 state
            link: computed(() => store.state.externalLinks.link),
        };
    },
});
</script>
<style scoped>
.iframe {
    height: calc(100vh - 104px);
}
</style>
