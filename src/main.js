import Vue from "vue";
import App from "./Landing.vue";
import sideNav from "@/components/SideNav.vue";
import topNav from "@/components/TopNav.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#content");

new Vue({
  router,
  render: h => h(sideNav)
}).$mount("#sidenav");

new Vue({
  router,
  render: h => h(topNav)
}).$mount("#topnav");
