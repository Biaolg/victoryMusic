import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import search from "../views/Search.vue";
import Hot from "../views/Hot.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Hot",
    name: "Hot",
    component: Hot

  }, {
    path: "/search",
    name: "search",
    component: search
  }
];

const router = new VueRouter({
  routes
});

export default router;
