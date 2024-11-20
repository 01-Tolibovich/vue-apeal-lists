import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('authToken'); // Проверяем наличие токена

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      // Если пользователь не авторизован, перенаправляем на /login
      next('/login');
    } else {
      // Если авторизован, продолжаем маршрут
      next();
    }
  } else {
    // Если маршрут не требует авторизации, продолжаем
    next();
  }
});


export default router
