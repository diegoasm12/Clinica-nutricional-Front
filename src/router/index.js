import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import Dashboard from '../views/Dashboard.vue'
import RegisterView from '../views/RegisterView.vue'
import SeeUsersView from '../views/SeeUsersView.vue'

import ForgotPasswordView from '../views/ForgotPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView
    },
    {
      path: '/dashoard',
      name: 'dashoard',
      component: Dashboard
    },
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/Users',
      name: 'Users',
      component: SeeUsersView
    }

  ],
  
})

export default router
