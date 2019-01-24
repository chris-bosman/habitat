import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home";
import Admin from "@/views/Admin";
import Analyze from "@/views/Analyze";
import Start from "@/views/Start";
import Map from "@/views/View";
import Upload from "@/components/Upload";

Vue.use(Router);

export default new Router({
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
      path: "/Admin",
      name: "Admin",
      component: Admin
    },
    {
      path: "/Analyze",
      name: "Analyze",
      component: Analyze
    },
    {
      path: "/Start",
      name: "Start",
      component: Start
    },
    {
      path: "/View",
      name: "View",
      component: Map
    },
    {
      path: "/upload",
      name: "Upload",
      component: Upload
    }
  ]
});
