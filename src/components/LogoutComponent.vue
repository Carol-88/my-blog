<template>
  <div class="logout-container">
    <button @click="handleLogout" aria-label="Cerrar sesión">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await userStore.signOut()
    alert('Has cerrado sesión.')
    if (router.currentRoute.value.name !== 'home') {
      router.push({ name: 'home' })
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message)
    alert('Error al cerrar sesión. Por favor, inténtalo de nuevo.')
  }
}

onMounted(() => {
  if (!userStore.user) {
    alert('No estás logueado.')
    if (router.currentRoute.value.name !== 'home') {
      router.push({ name: 'home' })
    }
  }
})
</script>

<style scoped>
.logout-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

button {
  padding: 12px 24px;
  background-color: #00366f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #011c39;
}
</style>
