import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "no-nav" },
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/home",
    name: "Home",
    meta: { layout: "dashboard" },
    component: () => import("@/views/Home.vue")
  }
];

Vue.router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default Vue.router;
