import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Login from "./views/Login.vue";
import { Route } from "vue-router";
import { getAccessToken } from "./cookie";

Vue.use(Router);

const rou = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "index",
      component: Index
    }
  ]
});

const isRouterIllegal = (router: Route) => {
  let isIllegal = false;
  // TODO get route list from menu and check
  return isIllegal;
};

rou.beforeEach((to, from, next) => {
  if (getAccessToken()) {
    if (to.path === "/login") {
      next("/");
    } else {
      if (isRouterIllegal(to)) {
        next("./login");
      } else {
        next();
      }
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next("./login");
    }
  }
});
export default rou;
