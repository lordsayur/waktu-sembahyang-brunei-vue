import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import WSBBottomNavigation from "@/components/BottomNavigation.vue";

import { auth } from "../firebaseConfig.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    components: {
      default: Home,
      bottomNavigation: WSBBottomNavigation
    }
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/admin",
    name: "admin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("login");
  } else if (!requiresAuth && currentUser && to.name === "admin") next("admin");
  else next();
});

export default router;
