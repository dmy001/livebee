import { createApp, version } from "vue";
import App from "./App.vue";
import Router from "./router";
import "./index.css";
import store from "./store";
import vant from "./vant";
import i18n, { trans } from "./i18n";
import "@native/registerHandler";
import "./global";

const app = createApp(App);
// 全局方法
app.config.globalProperties.$trans = trans;
// 插件
app.use(Router);
vant.map(it => app.use(it));
app.use(i18n);
app.use(store);
app.mount("#app");

