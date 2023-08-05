// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 引入 vue
import Vue from "vue";
// 引入 App 組件
import App from "./App";
// 引入 vue-router
import VueRouter from "vue-router";
// 引入 axios
import Axios from "axios";

// 1. 導入組件
import Goods from "./components/Goods/Goods.vue";
import Ratings from "./components/Ratings/Ratings.vue";
import Seller from "./components/Seller/Seller.vue";

Vue.config.productionTip = false;

// 安裝 vue-router 套件
Vue.use(VueRouter);

// 如過在其他組建中使用 axios 命令，需要改為 vue 的原型屬性
Vue.prototype.$axios = Axios;

// 2. 定義路由
const routes = [
  {
    path: "/",
    // 重定向
    redirect: "/goods"
  },
  {
    path: "/goods",
    component: Goods
  },
  {
    path: "/ratings",
    component: Ratings
  },
  {
    path: "/seller",
    component: Seller
  }
];

// 3. 創建 router 實例
const router = new VueRouter({
  routes,
  // 選中後的類名 (默認值 router-link-active)
  linkActiveClass: "active"
});
/* eslint-disable no-new */
new Vue({
  el: "#app", // 掛載點
  template: "<App/>", // 模板
  components: { App }, // 註冊組件
  router // 4. 創見與掛載實例
});
