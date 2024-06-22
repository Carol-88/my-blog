<template>
  <div class="container">
    <h2>Cerrar Sesión</h2>
    <button @click="handleLogout">Cerrar Sesión</button>
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
    router.push('/login')
  } catch (error) {
    alert('Error al cerrar sesión:', error.message)
  }
}
</script>

<style scoped>
.container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  margin-top: 5rem;
}

h2 {
  text-align: center;
  color: darkred;
  margin-bottom: 20px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: darkred;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
