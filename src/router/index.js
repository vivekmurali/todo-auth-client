import Vue from "vue";
import VueRouter from "vue-router";
import todo from "../components/todo";
import Login from "../views/Login.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "todo",
    component: todo,
    // beforeEnter: (to, from, next) => {
    //   let access_token = window.$cookies.get("token");
    //   if (access_token == null) {
    //     // user doesn't have access token, redirect to login
    //     next({ name: "Login" });
    //   } else {
    //     // user has access token, user can open the page
    //     next();
    //   }
    // },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
];

const router = new VueRouter({
  routes,
});

export default router;
