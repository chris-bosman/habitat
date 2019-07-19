import Vue from "vue";
import Router from "vue-router";
import Auth from "@okta/okta-vue";

import Home from "@/views/Home";

Vue.use(Router);

Vue.use(Auth, {
  issuer: `https://${process.env.VUE_APP_OKTA_DOMAIN}/oauth2/default`,
  client_id: `${process.env.VUE_APP_OKTA_CLIENT_ID}`,
  //eslint-disable-next-line
  redirect_uri: `${process.env.VUE_APP_CALLBACK_URL}/${process.env.VUE_APP_OKTA_REDIRECT_URI}`,
  scope: "openid profile email"
});

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/Home",
      name: "Home",
      component: Home
    },
    {
      path: "/SignUp",
      name: "SignUp",
      component: () => import("@/views/SignUp.vue")
    },
    {
      path: "/implicit/callback",
      component: Auth.handleCallback()
    },
    {
      path: "/Admin",
      name: "Admin",
      component: () => import("@/views/Admin.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/Analyze",
      name: "Analyze",
      component: () => import("@/views/Analyze.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/Start",
      name: "Start",
      component: () => import("@/views/Start.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/View",
      name: "View",
      component: () => import("@/views/View.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/Test",
      name: "Test",
      component: () => import("@/views/Test.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
