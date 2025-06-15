import VueRouter from "vue-router";
import routes from "./routes";

// configure router
const router = new VueRouter({
  routes,
  linkExactActiveClass: "active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.path === "/login" && token) {
    return next("/admin/dashboard");
  }

  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    return next("/login");
  }

  next();
});

export default router;
