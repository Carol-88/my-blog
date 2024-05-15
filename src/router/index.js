import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    }
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   component: () => import('../views/ProfileView.vue')
    // },
    // {
    //   path: '/createpost',
    //   name: 'createpost',
    //   component: () => import('../components/CreatePostForm.vue')
    // },
    // {
    //   path: '/postdetail/:id',
    //   name: 'postdetail',
    //   component: () => import('../components/PostDetailView.vue')
    // }
  ]
})

export default router
