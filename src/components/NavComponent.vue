<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link v-if="!userStore.isLoggedIn" to="/auth">Login</router-link>
    <router-link v-if="userStore.isLoggedIn" to="/profile">Profile</router-link>
    <router-link v-if="userStore.isLoggedIn" to="/createpost">Create Post</router-link>
    <button v-if="userStore.isLoggedIn" @click="handleLogout">Logout</button>
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
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
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
