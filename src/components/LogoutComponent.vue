<template>
  <div class="logout-container">
    <button @click="handleLogout" aria-label="Cerrar sesión">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await userStore.signOut()
    router.push({ path: '/auth' }) // Asegúrate de que esta sea la ruta correcta
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message)
    alert('Error al cerrar sesión. Por favor, inténtalo de nuevo.')
  }
}
</script>
