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
      router.push({ name: 'auth' })
    } else {
      router.push({ name: 'home' })
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

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-family: monospace;
}

html {
  background-color: rgb(6 43 50);
}

button {
  padding: 12px 24px;
  background-color: #011c39; /* Mantén el color azul vibrante para el botón */
  color: white;
  border: none;
  border-radius: 8px; /* Bordes redondeados */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #00366f;
}
</style>
