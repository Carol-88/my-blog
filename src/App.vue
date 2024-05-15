<script setup>
import { useUserStore } from './stores/user.js'
import { usePostStore } from './stores/postStore.js'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const postStore = usePostStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  try {
    await userStore.fetchUser()
    if (!user.value) {
      router.push({ path: '/auth' })
    } else {
      router.push({ path: '/' })
      await postStore.fetchPostList()
      await userStore.fetchProfile()
    }
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <router-view />
</template>
