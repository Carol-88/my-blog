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
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
</style>
