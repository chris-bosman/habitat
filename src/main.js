import Vue from "vue";
import App from "./Landing";
import sideNav from "@/components/SideNav";
import topNav from "@/components/TopNav";
import background from "@/components/Background";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  render: h => h(background)
}).$mount("#bg");

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
