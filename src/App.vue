<script setup>
import { useUserStore } from './stores/user.js'
import { usePostStore } from './stores/postStore.js'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import NavComponent from './components/NavComponent.vue'

const router = useRouter()
const userStore = useUserStore()
const postStore = usePostStore()

onMounted(async () => {
  try {
    await userStore.fetchUser()
    if (!userStore.user) {
      // Asegúrate de acceder al usuario a través de la tienda
      router.push({ name: 'auth' }) // Usa nombres de rutas para mayor claridad
    } else {
      router.push({ name: 'home' }) // Asume que tienes una ruta llamada 'Home'
      await postStore.fetchPostList()
      // await userStore.fetchProfile()
    }
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <NavComponent />
  <router-view />
</template>
