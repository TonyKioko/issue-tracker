import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/HelloWorld.vue'
import Login from '../components/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'
import Dashboard from '../components/Pages/Dashboard.vue'
import Middlewares from '../middlewares'

import ForgotPassword from '../components/Auth/ForgotPassword.vue'
import ResetPassword from '../components/Auth/ResetPassword.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      middleware: [Middlewares.guest]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      middleware: [Middlewares.guest]

    }
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: ForgotPassword,
    // meta: {
    //   middleware: [Middlewares.guest]

    // }
  },
  {
    path: '/reset-password',
    name: 'resetPassword',
    component: ResetPassword,
    // meta: {
    //   middleware: [Middlewares.guest]

    // }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      middleware: [Middlewares.auth]

    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


function nextCheck(context, middleware, index) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) return context.next;

  return (...parameters) => {
      context.next(...parameters);
      const nextMidd = nextCheck(context, middleware, index + 1);

      nextMiddleware({...context, next: nextMidd});
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

      const ctx = {
          from,
          next,
          router,
          to
      };
      const nextMiddleware = nextCheck(ctx, middleware, 1);

      return middleware[0]({...ctx, next: nextMiddleware});
  }

  return next();
});

export default router