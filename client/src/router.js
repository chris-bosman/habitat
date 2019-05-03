import Vue from "vue";
import Router from "vue-router";
import Auth from "@okta/okta-vue";

import Home from "@/views/Home";
import Admin from "@/views/Admin";
import Analyze from "@/views/Analyze";
import Start from "@/views/Start";
import Map from "@/views/View";

Vue.use(Router);

Vue.use(Auth, {
  issuer: `https://${process.env.VUE_APP_OKTA_DOMAIN}/oauth2/default`,
  client_id: `${process.env.VUE_APP_OKTA_CLIENT_ID}`,
  //eslint-disable-next-line
  redirect_uri: `http://${process.env.VUE_APP_URL}:${process.env.VUE_APP_PORT}/${process.env.VUE_APP_OKTA_REDIRECT_URI}`,
  scope: "openid profile email"
});

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/implicit/callback",
      component: Auth.handleCallback()
    },
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/Admin",
      name: "Admin",
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/Analyze",
      name: "Analyze",
      component: Analyze,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/Start",
      name: "Start",
      component: Start,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/View",
      name: "View",
      component: Map,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
