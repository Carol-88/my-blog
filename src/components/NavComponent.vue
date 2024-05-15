<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/auth">Login / Register</router-link>
    <router-link to="/profile">Profile</router-link>
    <router-link to="/createpost">Create Post</router-link>
    <button @click="handleLogout">Logout</button>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = async () => {
  await userStore.signOut()
  router.push('/')
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-around;
  padding: 20px 40px;
  background-color: #333;
  color: white;
}

nav a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #ddd;
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
    align-items: center;
  }

  nav a {
    margin-bottom: 10px;
  }
}
</style>
