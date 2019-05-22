import Vue from "vue";
import iView from "iview";
import formCreat from "form-create";

import router from "./router";
import store from "./store";
import App from "./App";

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(formCreat);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
