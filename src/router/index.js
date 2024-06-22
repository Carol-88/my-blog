import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/AuthView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/LoginComponent.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/createpost',
    name: 'createpost',
    component: () => import('../components/CreatePostForm.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/postdetail/:id',
    name: 'postdetail',
    component: () => import('../views/PostDetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes
})

// Función auxiliar para manejar la autenticación
async function checkAuthentication(to, from, next) {
  const userStore = useUserStore()
  await userStore.fetchUser()

  if (to.matched.some((record) => record.meta.requiresAuth) && !userStore.isLoggedIn) {
    next({ name: 'auth' })
  } else {
    next()
  }
}

// Guard global para proteger rutas que requieren autenticación
router.beforeEach(checkAuthentication)
export default router
