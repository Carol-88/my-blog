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
  background-color: rgba(0, 11, 10, 0.449);
  color: white;
}

nav a {
  color: inherit;
  margin: 10px 20px;
  font-size: large;
  text-decoration: none;
  transition: color 0.3s ease;
  background: none;
}

nav a:hover {
  color: #084757;
}

button {
  background-color: #00366f;
}

button:hover {
  background-color: #011c39;
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
