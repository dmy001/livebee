<template>
  <div>
    <div>这是首页</div>
    <button
      class="py-1 px-2 font-semibold rounded-lg shadow-md text-white bg-red-400"
      @click="toDetail"
    >
      点击去详情
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "home",
  methods: {
    ...mapActions("base", ["changeNavBarTitile", "showNavBar"]),
    toDetail() {
      this.$router.push("/detail");
    },
  },
  created() {
    this.showNavBar();
    this.changeNavBarTitile("首页");
  },
};
</script>
