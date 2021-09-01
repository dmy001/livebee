<template>
    <div>
        <div>这是详情页</div>
        <button class="py-1 px-2 font-semibold rounded-lg shadow-md text-white bg-red-400" @click="goBack">
            点击回首页
        </button>
        <button class="py-1 px-2 font-semibold rounded-lg shadow-md text-white bg-red-400" @click="loginOut">
            退出登录
        </button>
        <Vuex />
    </div>
</template>

<script>
import Vuex from "../components/Vuex.vue";
import { mapActions } from "vuex";
import {exitLogin} from '@api'
export default {
  name: "detail",
  components: {
    Vuex,
  },
  methods: {
    ...mapActions("base", ["hideNavBar"]),
    goBack() {
      this.$router.back();
    },
    async loginOut (){
      localStorage.clear();
      this.$router.push('/');
      return await exitLogin();
    }
  },
  created() {
    this.hideNavBar();
  },
};
</script>
