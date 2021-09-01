<template>
  <div>
    <div class="self-center">Vuex</div>
    <button @click.prevent="increment">点击添加</button>
    <div>个数：{{ count }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Vuex",
  computed: {
    ...mapState(["count"]),
  },
  methods: {
    // ...mapMutations(["increment"]),
    ...mapActions([
      "increment", // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    ]),
  },
};
</script>
